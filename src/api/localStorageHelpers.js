export const updateLocalStorageWithItems = (items) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const getItemsFromLocalStorage = () => {
  const foundItems = localStorage.getItem('items');
  let returnItems;
  if (!foundItems) {
    returnItems = [];
  } else {
    returnItems = JSON.parse(localStorage.getItem('items'));
  }

  return returnItems.map((x) => {
    const newItem = { ...x };
    if (!newItem.id) {
      const newId = Math.floor(Math.random() * 1000000);
      newItem.id = newId;
    }
    return newItem;
  });
};
