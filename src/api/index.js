import {
  get, post, put, apiDelete,
} from './httpHandlers';

export const fetchShoppingList = async (shoppingListId) => {
  const response = await get(`/${shoppingListId}`);
  return response;
};

// "name":"red cheesy beefasdfasdfasdfasdf",
// "description":"worlds best beef",
// "quantity": 1,
// "purchased":0
export const editShoppingItem = async (shoppingListId, item) => {
  const payload = {
    shoppingListItem: {
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      description: item.description,
      purchased: item.purchased ? 1 : 0,
    },
  };

  const response = await post(`/${shoppingListId}/${item.id}`, payload);
  return response;
  // return payload
};

export const addShoppingItem = async (shoppingListId, item) => {
  const payload = {
    shoppingListItem: {
      name: item.name,
      quantity: parseInt(item.quantity, 10),
      description: item.description,
    },
  };

  const response = await put(`/${shoppingListId}`, payload);
  return response;
};

export const deleteShoppingItem = async (shoppingListId, itemId) => apiDelete(`${shoppingListId}/${itemId}`);
