import {
  describe, it, expect, vi,
} from 'vitest';
import {
  fetchShoppingList, editShoppingItem, addShoppingItem, deleteShoppingItem,
} from './index';
import {
  get, post, put, apiDelete,
} from './httpHandlers';

vi.mock('./httpHandlers');

describe('fetchShoppingList', () => {
  it('calls get with the correct url', async () => {
    const shoppingListId = 1;

    await fetchShoppingList(shoppingListId);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(`/${shoppingListId}`);
  });

  it('returns the data from the response', async () => {
    const shoppingListId = 1;
    const data = { data: { id: 1, ownerId: 1 } };
    get.mockResolvedValue({ data });

    const response = await fetchShoppingList(shoppingListId);

    expect(response).toEqual({ data });
  });
});

describe('editShoppingItem', () => {
  it('calls post with the correct url', async () => {
    const shoppingListId = 1;

    const payload = {
      shoppingListItem: {
        id: 1,
        name: 'test',
        quantity: 1,
        description: 'test',
        purchased: 0,
      },
    };

    const expectedPayload = { ...payload };
    delete expectedPayload.shoppingListItem.id;

    post.mockResolvedValue({ data: { ...payload } });

    await editShoppingItem(shoppingListId, payload.shoppingListItem);

    expect(post).toHaveBeenCalledTimes(1);

    expect(post).toHaveBeenCalledWith(`/${shoppingListId}/${payload.shoppingListItem.id}`, payload);
  });

  it('returns the data from the response', async () => {
    const shoppingListId = 1;
    const item = {
      id: 1, name: 'test', quantity: 1, description: 'test',
    };
    const data = { data: { id: 1, ownerId: 1 } };
    post.mockResolvedValue({ data });

    const response = await editShoppingItem(shoppingListId, item);

    expect(response).toEqual({ data });
  });
});

describe('addShoppingItem', () => {
  it('calls put with the correct url', async () => {
    const shoppingListId = 1;

    const payload = {
      shoppingListItem: {
        name: 'test',
        quantity: 1,
        description: 'test',
      },
    };

    put.mockResolvedValue({ data: { ...payload } });

    await addShoppingItem(shoppingListId, payload.shoppingListItem);

    expect(put).toHaveBeenCalledTimes(1);

    expect(put).toHaveBeenCalledWith(`/${shoppingListId}`, payload);
  });

  it('returns the data from the response', async () => {
    const shoppingListId = 1;
    const item = {
      name: 'test', quantity: 1, description: 'test',
    };
    const data = { data: { id: 1, ownerId: 1 } };
    put.mockResolvedValue({ data });

    const response = await addShoppingItem(shoppingListId, item);

    expect(response).toEqual({ data });
  });
});

describe('deleteShoppingItem', () => {
  it('calls apiDelete with the correct url', async () => {
    const shoppingListId = 1;
    const itemId = 1;

    await deleteShoppingItem(shoppingListId, itemId);

    expect(apiDelete).toHaveBeenCalledTimes(1);
    expect(apiDelete).toHaveBeenCalledWith(`${shoppingListId}/${itemId}`);
  });
});
