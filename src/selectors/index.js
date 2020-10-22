import { createSelector } from '@reduxjs/toolkit';
import { getMaxValue, fromSegments, makeSlice } from '../utils';

const getTickets = (state) => state.ticketsInfo.tickets;
const getSortParam = (state) => state.filters.sortParam;
const getFilterOptions = (state) => state.filters.options;
const isSearchIdLoaded = (state) => state.searchIdInfo.isLoading;
const isTicketsLoaded = (state) => state.ticketsInfo.isLoading;

export const sortParamSelector = createSelector(getSortParam, (sortParam) => sortParam);

export const isDataLoadedSelector = createSelector(
  [isSearchIdLoaded, isTicketsLoaded],
  (searchIdLoaded, ticketsLoaded) => (searchIdLoaded || ticketsLoaded),
);

export const optionsSelector = createSelector(
  (getFilterOptions),
  (options) => {
    const selectedOptions = options.filter(({ selected }) => selected === true);
    return [options, selectedOptions];
  },
);

export const filtredTicketsSelector = createSelector(
  [getTickets, optionsSelector],
  (tickets, [, selectedOptions]) => {
    const optionsValues = selectedOptions.map(({ value }) => value);
    const maxValue = getMaxValue(optionsValues);

    const filtredTickets = tickets.filter((ticket) => {
      const stops = fromSegments(ticket, 'stops');
      const [outboundStops, backStops] = stops;
      const maxStopsValue = getMaxValue([outboundStops.length, backStops.length]);
      return maxStopsValue <= maxValue;
    });
    return filtredTickets;
  },
);

export const sortedTicketsSelector = createSelector(
  [getSortParam, filtredTicketsSelector],
  (param, tickets) => {
    const byParam = {
      cheapest: (ticket) => ticket.price,
      quickest: (ticket) => {
        const durations = fromSegments(ticket, 'duration');
        const [outboundFlightDuration, backFlightDuration] = durations;
        const totalDuration = outboundFlightDuration + backFlightDuration;
        return totalDuration;
      },
    };
    const sortedTickets = tickets.sort((a, b) => (byParam[param](a) > byParam[param](b) ? 1 : -1));
    return sortedTickets;
  },
);

export const ticketsSliceSelector = createSelector(
  [sortedTicketsSelector, getSortParam],
  (tickets) => makeSlice(tickets),
);
