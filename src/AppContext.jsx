import React, {
  useState, createContext, useEffect, useMemo,
} from 'react';
import {
  addShoppingItem, fetchShoppingList, editShoppingItem, deleteShoppingItem,
} from './api';

import { updateLocalStorageWithItems, getItemsFromLocalStorage } from './api/localStorageHelpers';

const defaultAppContext = {
  items: [],
  setItems: Function,
};

export const AppContext = createContext(defaultAppContext);

export function AppContextProvider({ children }) {
  const [items, setItems] = useState(defaultAppContext.items);
  const [loading, setLoading] = useState(false);
  const [isAppOffline, setIsAppOffline] = useState(false);

  const shoppingListId = 1; // TODO: allows users to select which shopping list to view

  const addItem = async (newItem) => {
    // add the item to the shopping list
    let newItems = [];
    if (isAppOffline) {
      const newItemWithLocalId = { ...newItem, id: Math.floor(Math.random() * 1000000) };
      newItems = [...items, newItemWithLocalId];
      updateLocalStorageWithItems(newItems);
    } else {
      const newItemWithId = await addShoppingItem(shoppingListId, newItem);
      if (newItemWithId.error) {
        console.error(newItemWithId.error); // eslint-disable-line no-console
        return;
      }
      newItems = [...items, newItemWithId];
    }
    setItems(newItems);
  };

  const editItem = (newItem) => {
    const itemIndex = items.findIndex((item) => item.id === newItem.id);
    const newItems = [...items];
    newItems[itemIndex] = newItem;

    if (isAppOffline) {
      updateLocalStorageWithItems(newItems);
      setItems(newItems);
    } else {
      const res = editShoppingItem(shoppingListId, newItem);

      if (!res.error) {
        setItems(newItems);
      } else {
        console.error(res.error); // eslint-disable-line no-console
      }
    }
  };

  const loadItems = async () => {
    setLoading(true);
    const shoppingList = await fetchShoppingList(shoppingListId);

    if (!shoppingList.error) {
      setItems(shoppingList.shoppingListItems);
      // assume app is operating without the Go backend
      setLoading(false);
    } else {
      // fallback to local storage
      setIsAppOffline(true);
      console.warn('App is offline. Using local storage for data.'); // eslint-disable-line no-console
      const itemsFromLocalStorage = getItemsFromLocalStorage();
      setItems(itemsFromLocalStorage);
      setLoading(false);
    }
  };

  const deleteItem = async (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);

    if (isAppOffline) {
      // fallback to local storage
      updateLocalStorageWithItems(newItems);
    } else {
      await deleteShoppingItem(shoppingListId, itemId);
    }
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
