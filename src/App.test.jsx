import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { ThemeProvider } from '@mui/material/styles';

import { AppContext, AppContextProvider } from './AppContext';
import AppWithProvider, { AppNoProvider, theme } from './App';

vi.mock(AppContext, () => ({
  items: [],
  setItems: () => [],
  loadItems: () => [],
  loading: false,

  addItem: () => [],
  editItem: () => [],
  deleteItem: () => [],
}));

vi.mock('./api/localStorageHelpers', () => ({
  updateLocalStorageWithItems: () => [],
  getItemsFromLocalStorage: () => [],
}));

describe('AppNoProvider', () => {
  it('renders the AppBar with the correct text', () => {
    render(
      <ThemeProvider theme={theme}>
        <AppNoProvider />
      </ThemeProvider>,
    );
    const appbarText = screen.getByText('SHOPPING LIST');
    expect(appbarText).toBeTruthy();
  });

  it('renders the LoadingScreen when loading is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <AppNoProvider />
      </ThemeProvider>,
    );
    const loadingScreen = screen.findByTestId('loadingSpinner');
    expect(loadingScreen).toBeTruthy();
  });

  it('renders the ShoppingList when loading is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <AppNoProvider />
      </ThemeProvider>,
    );
    const shoppingList = screen.findByTestId('shoppingList');
    expect(shoppingList).toBeTruthy();
  });
});

describe('AppWithProvider', () => {
  it('renders the AppBar with the correct text', () => {
    const rendered = render(
      <ThemeProvider theme={theme}>
        <AppWithProvider />
      </ThemeProvider>,
    );

    expect(rendered).toMatchSnapshot();
  });
});
