import React from 'react';
import logo from '../public/Logo.svg';
import Spinner from './Spinner';

const PageHeader = () => (
  <div className='page-header'>
    <img className='logo' src={logo} alt='logo' />
    <Spinner />
  </div>
);

export default PageHeader;
