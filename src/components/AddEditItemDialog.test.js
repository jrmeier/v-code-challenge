import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AppContext } from '../AppContext';
import AddEditItemFormMu from './AddEditItemFormMu';

const mockAddItem = jest.fn();
const mockEditItem = jest.fn();

const mockContextValue = {
  items: [],
  addItem: mockAddItem,
  editItem: mockEditItem,
};

describe('AddEditItemFormMu', () => {
  it('renders correctly with Add mode', () => {
    const { getByText, getByPlaceholderText } = render(
      <AppContext.Provider value={mockContextValue}>
        <AddEditItemFormMu showAddItemModal editItemId={null} />
      </AppContext.Provider>,
    );

    expect(getByText('Add an item')).toBeInTheDocument();
    expect(getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByText('How many?')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Add Item')).toBeInTheDocument();
  });

  it('renders correctly with Edit mode', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <AddEditItemFormMu showAddItemModal editItemId={1} />
      </AppContext.Provider>,
    );

    expect(getByText('Edit an item')).toBeInTheDocument();
  });

  it('calls addItem function with correct values when adding a new item', () => {
    const { getByText, getByPlaceholderText } = render(
      <AppContext.Provider value={mockContextValue}>
        <AddEditItemFormMu showAddItemModal editItemId={null} />
      </AppContext.Provider>,
    );

    fireEvent.change(getByPlaceholderText('Item Name'), {
      target: { value: 'New Item' },
    });
    fireEvent.change(getByPlaceholderText('Description'), {
      target: { value: 'Item description' },
    });
    fireEvent.change(screen.getByText('How many?'), {
      target: { value: 2 },
    });
    fireEvent.click(getByText('Add Item'));

    expect(mockAddItem).toHaveBeenCalledWith({
      name: 'New Item',
      description: 'Item description',
      quantity: 2,
      purchased: false,
    });
  });

  it('calls editItem function with correct values when editing an item', () => {
    const { getByText, getByPlaceholderText } = render(
      <AppContext.Provider value={mockContextValue}>
        <AddEditItemFormMu showAddItemModal editItemId={1} />
      </AppContext.Provider>,
    );

    fireEvent.change(getByPlaceholderText('Item Name'), {
      target: { value: 'Updated Item' },
    });
    fireEvent.change(getByPlaceholderText('Description'), {
      target: { value: 'Updated description' },
    });
    fireEvent.change(screen.getByText('How many?'), {
      target: { value: 3 },
    });
    fireEvent.click(getByText('Save Item'));

    expect(mockEditItem).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated Item',
      description: 'Updated description',
      quantity: 3,
      purchased: false,
    });
  });
});
