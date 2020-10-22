import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sortParamSelector } from '../selectors';
import { updateSortParam } from '../slices/filtersSlice';
import { sortingParams } from '../utils';

const MainHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentParam = useSelector(sortParamSelector);

  const handleClick = (param) => () => {
    dispatch(updateSortParam(param));
  };

  return (
    <div className="main-header">
      <ul className="tab-group" onClick={handleClick}>
      {sortingParams.map((param) => (
        <li
        key={param}
        className={`tab ${param === currentParam ? 'active' : ''}`}
        onClick={handleClick(param)}>
          <span className="tab-text">{t(param)}</span>
         </li>
      ))}
      </ul>
    </div>
  );
};

export default MainHeader;
