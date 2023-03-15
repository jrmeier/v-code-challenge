export const updateLocalStorageWithItems = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const getItemsFromLocalStorage = () => JSON.parse(localStorage.getItem('items'));
