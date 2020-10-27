import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateFilter, updateAllFilters } from '../slices/filtersSlice';
import { optionsSelector } from '../selectors';
import { getUniqueId as getKeyqueId } from '../utils';
import Checkbox from './Checkbox';

const FilterBox = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [options, selectedOptions] = useSelector(optionsSelector);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    return name === 'all'
      ? dispatch(updateAllFilters({ checked }))
      : dispatch(updateFilter({ name, checked }));
  };

  const allStopsCheckboxProps = {
    name: 'all',
    selected: selectedOptions.length === options.length,
  };

  return (
    <div className='filter-box'>
      <div className='filter-header'>{t('filterHeader')}</div>
      <div className='checkbox-list'>
        <Checkbox {...allStopsCheckboxProps} onChange={handleCheck} />
        {options.map((option) => (
          <Checkbox key={getKeyqueId()} {...option} onChange={handleCheck} />
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
