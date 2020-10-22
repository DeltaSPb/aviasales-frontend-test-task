import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import routes from '../routes';

const initialState = {
  searchId: null,
  isLoading: false,
  errorMessage: null,
};

const searchIdSlice = createSlice({
  name: 'searchId',
  initialState,
  reducers: {
    getSearchIdStart(state) {
      state.isLoading = true;
    },
    getSearchIdSuccess(state, { payload: { searchId } }) {
      state.isLoading = false;
      state.searchId = searchId;
    },
    getSearchIdFailure(state, { payload: { message } }) {
      state.errorMessage = message;
      state.isLoading = false;
    },
  },
});

export const { getSearchIdStart, getSearchIdSuccess, getSearchIdFailure } = searchIdSlice.actions;

export const useSearcIdActions = () => {
  const dispatch = useDispatch();

  const loadSearchId = async () => {
    dispatch(getSearchIdStart());
    try {
      const searchId = await routes.getSearchId();
      dispatch(getSearchIdSuccess({ searchId }));
      return searchId;
    } catch (e) {
      dispatch(getSearchIdFailure({ message: e.message }));
      const key = e.message ? 'server' : 'network';
      toast.error(i18next.t(`errors.${key}`), {
        position: 'top-left',
        autoClose: 5000,
      });
      console.log(e.message);
      throw e;
    }
  };
  return { loadSearchId };
};

export default searchIdSlice.reducer;
