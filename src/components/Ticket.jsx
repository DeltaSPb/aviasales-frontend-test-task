import React from 'react';
import Segment from './Segment';
import { getLocalePrice, getUniqueId as getKey, parseSegment } from '../utils';

const Ticket = (props) => {
  const { price, carrier, segments } = props;
  const parsedSegments = segments.map(parseSegment);

  return (
    <div className='tickets-card' key={getKey()}>
      <div className='card-wrapper'>
        <div className='info'>
          <span className='price'>{getLocalePrice(price)}</span>
          <span className='carrier'>
            <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
          </span>
        </div>
        <Segment segments={parsedSegments} />
      </div>
    </div>
  );
};

export default Ticket;
