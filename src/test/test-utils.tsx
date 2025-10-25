import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import contentSlice from '../store/slices/contentSlice';

export const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      content: contentSlice,
    },
    preloadedState: initialState,
  });
};

export const renderWithProvider = (
  ui: React.ReactElement,
  { initialState = {}, store = createTestStore(initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  console.log(store.getState())
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};