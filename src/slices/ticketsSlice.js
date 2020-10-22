import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import routes from '../routes';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    getTicketsStart(state) {
      state.isLoading = true;
    },
    getTicketsSuccess(state, { payload: { tickets } }) {
      state.tickets.push(...tickets);
      state.isLoading = false;
    },
    getTicketsFailure(state, { payload }) {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  getTicketsStart, getTicketsSuccess, getTicketsFailure, addTickets,
} = ticketsSlice.actions;

export const useTicketsActions = () => {
  const dispatch = useDispatch();

  const loadTickets = (searchId) => {
    dispatch(getTicketsStart());

    const loadChunks = async (chunks = []) => {
      try {
        const { tickets, stop } = await routes.getTickets(searchId);
        if (stop) {
          dispatch(getTicketsSuccess({ tickets: [...chunks, ...tickets] }));
          return;
        }
        loadChunks([...chunks, ...tickets]);
      } catch (e) {
        if (e.response.status === 500) {
          loadChunks(chunks);
        } else {
          dispatch(getTicketsFailure(e.response.message));
          throw e.response.message;
        }
      }
    };
    loadChunks();
  };
  return { loadTickets };
};

export default ticketsSlice.reducer;
