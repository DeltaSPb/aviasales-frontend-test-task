import React from 'react';
import { useTranslation } from 'react-i18next';
import { getUniqueId as getKey } from '../utils';

const Segment = (props) => {
  const { segments } = props;
  const { t } = useTranslation();

  return (
    <>
      {segments.map((segment) => (
      <div key={getKey()} className="ticket">
        <div className="ticket-column">
          <span className="text secondary">{segment.locationsCodes}</span>
          <span className="text primary">{segment.time}</span>
        </div>
        <div className="ticket-column">
          <span className="text secondary">{t('duration')}</span>
          <span className="text primary">{segment.flightDuration}</span>
        </div>
        <div className="ticket-column">
          <span className="text secondary">{t('stops_interval', { postProcess: 'interval', count: segment.stopsCount })}</span>
          <span className="text primary">{segment.stops}</span>
        </div>
      </div>
      ))}
    </>
  );
};

export default Segment;
