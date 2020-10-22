/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */

import 'babel-polyfill';
import { cloneDeep, last } from 'lodash';
import tickets from './tickets.json';
import { filtredTicketsSelector, sortedTicketsSelector } from '../src/selectors';

const state = {
  ticketsInfo: {
    tickets,
  },
  filters: {
    sortParam: 'quickest',
    options: [
      { name: 'wihtoutTransfers', value: 0, selected: false },
      { name: 'oneTransfer', value: 1, selected: false },
      { name: 'twoTransfers', value: 2, selected: false },
      { name: 'threeTransfers', value: 3, selected: false },
    ],
  },
};

describe('filtred tickets selector', () => {
  it('should return ampty array', () => {
    const filtredTickets = filtredTicketsSelector(state);
    expect(filtredTickets).toHaveLength(0);
  });

  it('should return tickets without stops', () => {
    const stateClone = cloneDeep(state);
    const withoutStopsOption = stateClone.filters.options.find(({ value }) => value === 0);
    withoutStopsOption.selected = true;

    const filtredTickets = filtredTicketsSelector(stateClone);
    expect(filtredTickets).toHaveLength(3);
  });

  it('should return tickets with two or less stops', () => {
    const stateClone = cloneDeep(state);
    const twoStopsOption = stateClone.filters.options.find(({ value }) => value === 2);
    twoStopsOption.selected = true;

    const filtredTickets = filtredTicketsSelector(stateClone);
    expect(filtredTickets).toHaveLength(5);
  });

  it('should return all tickets', () => {
    const stateClone = cloneDeep(state);
    stateClone.filters.options.forEach((option) => option.selected = true);

    const filtredTickets = filtredTicketsSelector(stateClone);
    const allTickets = state.ticketsInfo.tickets;
    expect(filtredTickets).toEqual(allTickets);
    expect(filtredTickets).toHaveLength(7);
  });
});

describe('sorted tickets selector', () => {
  it('should return quickest tickets sorted by duration', () => {
    const stateClone = cloneDeep(state);
    stateClone.filters.options.forEach((option) => option.selected = true);
    const sortedTickets = sortedTicketsSelector(stateClone);

    const [firstTicket] = sortedTickets;
    expect(firstTicket.id).toBe(1);

    const lastTicket = last(sortedTickets);
    expect(lastTicket.id).toBe(3);
  });

  it('should return cheapest tickets sorted by price', () => {
    const stateClone = cloneDeep(state);
    stateClone.filters.options.forEach((option) => option.selected = true);
    stateClone.filters.sortParam = 'cheapest';
    const sortedTickets = sortedTicketsSelector(stateClone);

    const [firstTicket] = sortedTickets;
    expect(firstTicket.price).toBe(14000);
    expect(firstTicket.id).toBe(1);

    const lastTicket = last(sortedTickets);
    expect(lastTicket.price).toBe(99919);
    expect(lastTicket.id).toBe(6);
  });
});
