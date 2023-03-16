export const updateLocalStorageWithItems = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const getItemsFromLocalStorage = () => {
  const items = JSON.parse(localStorage.getItem('items'));

  return items.map((x) => {
    const newItem = { ...x };
    if (!newItem.id) {
      const newId = Math.floor(Math.random() * 1000000);
      newItem.id = newId;
    }
    return newItem;
  });
};
