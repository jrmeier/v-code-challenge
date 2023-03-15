import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { AppContext } from '../AppContext';
import ShoppingList from './ShoppingList';

describe('ShoppingList', () => {
  const mockItems = [
    {
      id: 1, name: 'Apples', description: 'Some red apples', quantity: 3, purchased: false,
    },
    {
      id: 2, name: 'Bananas', description: 'Some yellow bananas', quantity: 2, purchased: true,
    },
    {
      id: 3, name: 'Oranges', description: 'Some juicy oranges', quantity: 4, purchased: false,
    },
  ];

  it('should render an empty list when there are no items', () => {
    const setItems = jest.fn();
    render(
      <AppContext.Provider value={{ items: [], setItems }}>
        <ShoppingList />
      </AppContext.Provider>,
    );

    const emptyListText = screen.getByText(/you don't have any items/i);
    expect(emptyListText).toBeInTheDocument();
  });

  it('should render a list of items when there are items', () => {
    const setItems = jest.fn();
    render(
      <AppContext.Provider value={{ items: mockItems, setItems }}>
        <ShoppingList />
      </AppContext.Provider>,
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockItems.length);
  });

  it('should handle adding an item', () => {
    const setItems = jest.fn();
    render(
      <AppContext.Provider value={{ items: mockItems, setItems }}>
        <ShoppingList />
      </AppContext.Provider>,
    );

    const addButton = screen.getByRole('button', { name: /add item/i });
    fireEvent.click(addButton);

    const addItemText = screen.getByText(/add an item/i);
    expect(addItemText).toBeInTheDocument();
  });

  it('should handle editing an item', () => {
    const setItems = jest.fn();
    const editItemId = mockItems[0].id;
    render(
      <AppContext.Provider value={{ items: mockItems, setItems }}>
        <ShoppingList />
      </AppContext.Provider>,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const editItemText = screen.getByText(/edit an item/i);
    expect(editItemText).toBeInTheDocument();
  });

  it('should handle deleting an item', () => {
    const setItems = jest.fn();
    const deleteItemId = mockItems[0].id;
    render(
      <AppContext.Provider value={{ items: mockItems, setItems }}>
        <ShoppingList />
      </AppContext.Provider>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const deleteModalText = screen.getByText(/are you sure you want to delete/i);
    expect(deleteModalText).toBeInTheDocument();

    const confirmDeleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmDeleteButton);

    expect(setItems).toHaveBeenCalledWith(expect.arrayContaining(mockItems.filter((item) => item.id !== deleteItemId)));
  });
});
