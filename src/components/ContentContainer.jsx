import React from 'react';
import { useSelector } from 'react-redux';
import FilterBox from './FilterBox';
import MainHeader from './MainHeader';
import { ticketsSliceSelector } from '../selectors';
import Ticket from './Ticket';

const ContentContainer = () => {
  const tickets = useSelector(ticketsSliceSelector);

  return (
        <div className="content-container">
            <div className="filter-section">
                <FilterBox />
            </div>
            <div className="main-section">
                <MainHeader />
                {tickets.map(Ticket)}
            </div>
        </div>
  );
};

export default ContentContainer;
