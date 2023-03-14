export const updateLocalStorageWithItems = (items) => {
    localStorage.setItem('items', JSON.stringify(items))
    }

export const getItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('items'))
    }