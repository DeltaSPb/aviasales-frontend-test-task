import { combineReducers } from 'redux';
import ticketsReducer from './ticketsSlice';
import searchIdReducer from './searchIdSlice';
import setFilters from './filtersSlice';

export default combineReducers({
  ticketsInfo: ticketsReducer,
  searchIdInfo: searchIdReducer,
  filters: setFilters,
});
