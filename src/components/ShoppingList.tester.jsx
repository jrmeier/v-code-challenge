import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext } from '../AppContext';
import ShoppingList from './ShoppingList';

it('ShoppingList', () => {
  const items = [
    {
      id: 1,
      name: 'Test Item 1',
      description: 'Test Description 1',
      purchased: false,
    },
    {
      id: 2,
      name: 'Test Item 2',
      description: 'Test Description 2',
      purchased: false,
    },
  ];

  const setItems = () => {};
  const editItem = () => {};

  render(
    <AppContext.Provider value={{ items: [], setItems, editItem }}>
      <ShoppingList />
    </AppContext.Provider>,
  );
  expect(screen.getByText('Your items')).toBeInTheDocument();
  expect(screen.getByText('Add Item')).toBeInTheDocument();
});
