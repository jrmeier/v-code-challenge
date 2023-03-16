import {
  get, post, put, apiDelete,
} from './httpHandlers';

export const fetchShoppingList = async (shoppingListId) => {
  console.log('fetchShoppingList', shoppingListId);
  const response = await get(`/${shoppingListId}`);
  return response;
};

export const editShoppingItem = async (shoppingListId, item) => {
  const payload = {
    shoppingListItem: {
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      description: item.description,
      purchased: item.purchased ? 1 : 0,
    },
  };

  return post(`/${shoppingListId}/${item.id}`, payload);
};

export const addShoppingItem = async (shoppingListId, item) => {
  const payload = {
    shoppingListItem: {
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      description: item.description,
    },
  };

  return put(`/${shoppingListId}`, payload);
};

export const deleteShoppingItem = async (shoppingListId, itemId) => apiDelete(`${shoppingListId}/${itemId}`);
