import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { useSelector } from 'react-redux';
import { isDataLoadedSelector } from '../selectors';

const Spinner = () => {
  const isDataLoaded = useSelector(isDataLoadedSelector);

  return (
    <div className="loading-spinner">
      <PuffLoader
        size={80}
        color={'#2196f3'}
        loading={isDataLoaded}
      />
    </div>
  );
};

export default Spinner;
