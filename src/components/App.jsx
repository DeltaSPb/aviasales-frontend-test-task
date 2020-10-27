import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearcIdActions } from '../slices/searchIdSlice';
import { useTicketsActions } from '../slices/ticketsSlice';
import { isDataLoadedSelector } from '../selectors';
import PageHeader from './PageHeader';
import ContentContainer from './ContentContainer';

const App = () => {
  const { loadSearchId } = useSearcIdActions();
  const { loadTickets } = useTicketsActions();
  const isDataLoaded = useSelector(isDataLoadedSelector);

  useEffect(() => {
    (async () => {
      const searchId = await loadSearchId();
      loadTickets(searchId);
    })();
  }, [null]);

  return (
    <>
      <PageHeader />
      {!isDataLoaded && <ContentContainer />}
    </>
  );
};

export default App;
