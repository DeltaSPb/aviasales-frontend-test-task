import React from 'react';
import { useTranslation } from 'react-i18next';

const Checkbox = (props) => {
  const { t } = useTranslation();
  const { name, selected, onChange } = props;

  return (
    <label className='checkbox-container option'>
      <input
        type='checkbox'
        className='check-input'
        name={name}
        checked={selected}
        onChange={onChange}
      />
      <span className='check-box'></span>
      <span className='filters-text'>{t(name)}</span>
    </label>
  );
};

export default Checkbox;
