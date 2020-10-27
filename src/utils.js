import max from 'lodash/max';
import take from 'lodash/take';
import uniqueId from 'lodash/uniqueId';
import { DateTime, Duration } from 'luxon';
import i18next from 'i18next';

const round = (x) => Math.round(x * 0.2) * 5;

export const sortingParams = ['cheapest', 'quickest'];

export const getUniqueId = () => Number(uniqueId());
export const getMaxValue = (values) => max(values);
export const makeSlice = (items, n = 5) => take(items, n);

export const getLocalePrice = (price, locale = 'ru', currency = 'rub') => {
  const localeFormat = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumSignificantDigits: 3 });
  return localeFormat.format(price);
};

export const formatDate = (date, duration) => {
  const h = i18next.t('separators.hour');
  const m = i18next.t('separators.minute');

  const dateTime = DateTime.fromISO(date);
  const departureTime = dateTime.set({ minute: round(dateTime.minute) });
  const landingTime = departureTime.plus({ minutes: round(duration) });

  return {
    time: `${departureTime.toFormat('HH:mm')} - ${landingTime.toFormat('HH:mm')}`,
    flightDuration: Duration
      .fromObject({ minutes: round(duration) })
      .shiftTo('hours', 'minutes')
      .toFormat(`hh${h} mm${m}`),
  };
};

export const fromSegments = (ticket, key) => {
  const [outboundTicket, backTicket] = ticket.segments;
  return [outboundTicket[key], backTicket[key]];
};

export const parseSegment = (segment) => {
  const {
    origin,
    destination,
    date,
    stops,
    duration,
  } = segment;

  return {
    locationsCodes: [origin, destination].join(' - '),
    stops: stops.join(', '),
    stopsCount: stops.length,
    flightDuration: formatDate(date, duration).flightDuration,
    time: formatDate(date, duration).time,
  };
};
