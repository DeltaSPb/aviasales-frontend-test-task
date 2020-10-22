import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    sortParam: 'cheapest',
    options: [
      { name: 'wihtoutTransfers', value: 0, selected: false },
      { name: 'oneTransfer', value: 1, selected: true },
      { name: 'twoTransfers', value: 2, selected: true },
      { name: 'threeTransfers', value: 3, selected: false },
    ],
  },
  reducers: {
    updateSortParam(state, { payload: param }) {
      state.sortParam = param;
    },
    updateFilter(state, { payload: { name, checked } }) {
      const newState = checked;
      const currentOption = state.options.find((option) => option.name === name);
      currentOption.selected = newState;
    },
    updateAllFilters(state, { payload: { checked } }) {
      const newState = checked;
      state.options.forEach((option) => {
        option.selected = newState;
      });
    },
  },
});

export const { updateSortParam, updateFilter, updateAllFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
