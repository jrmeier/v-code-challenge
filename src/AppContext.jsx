import React, {
  useState, createContext, useEffect, useMemo,
} from 'react';
import {
  addShoppingItem, fetchShoppingList, editShoppingItem, deleteShoppingItem,
} from './api';

export const updateLocalStorageWithItems = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const getItemsFromLocalStorage = () => JSON.parse(localStorage.getItem('items'));

const defaultAppContext = {
  items: [],
  setItems: Function,
};

export const AppContext = createContext(defaultAppContext);

export function AppContextProvider({ children }) {
  const [items, setItems] = useState(defaultAppContext.items);
  const [loading, setLoading] = useState(false);

  const shoppingListId = 1;

  const addItem = async (newItem) => {
    // add the item to the shopping list
    const newItemWithId = await addShoppingItem(shoppingListId, newItem);
    const newItems = [...items, newItemWithId];
    setItems(newItems);

    // updateLocalStorageWithItems(newItems)
  };

  const editItem = (newItem) => {
    editShoppingItem(shoppingListId, newItem);
    // updateLocalStorageWithItems(newItems)
    const itemIndex = items.findIndex((item) => item.id === newItem.id);
    const newItems = [...items];
    newItems[itemIndex] = newItem;
    setItems(newItems);
  };

  const loadItems = async () => {
    setLoading(true);
    const shoppingList = await fetchShoppingList(shoppingListId);
    setItems(shoppingList.shoppingListItems);
    setLoading(false);
  };

  const deleteItem = (itemId) => {
    deleteShoppingItem(shoppingListId, itemId);
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      loadItems();
    };

    fetchData();
  }, []);

  const value = { // eslint react/jsx-no-constructed-context-values
    items,
    setItems,
    addItem,
    editItem,
    loadItems,
    loading,
    deleteItem,
  };

  const foo = useMemo(() => (value), [items, loading]);

  return (
    <AppContext.Provider value={foo}>
      {children}
    </AppContext.Provider>
  );
}
