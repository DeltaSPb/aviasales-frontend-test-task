import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import reducer from './slices';
import App from './components/App';
import './i18next';
import 'react-toastify/dist/ReactToastify.css';

export default async () => {
  const store = configureStore({
    reducer,
  });

  toast.configure();

  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
  );
};
