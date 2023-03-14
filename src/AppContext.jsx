import { useState, createContext } from 'react';


export const updateLocalStorageWithItems = (items) => {
    localStorage.setItem('items', JSON.stringify(items))
    }

export const getItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('items'))
    }

const defaultAppContext = {
    items: [{
        name: 'Milk',
        description: '2% milk',
        quantity: 1,
        purchased: false
    }],
    setItems: Function
}

export const AppContext = createContext(defaultAppContext);


export function AppContextProvider(props) {
    const [items, setItems] = useState(defaultAppContext.items);

    const addItem = (newItem) => {
        console.log("adding a new item from the context: ", newItem)
        const newItems = [...items, newItem];
        setItems(newItems)
        updateLocalStorageWithItems(newItems)
    }

    const editItem = (newItem, index) => {
        console.log("editing item: ", newItem, index)
        const newItems = [...items];
        newItems[index] = newItem;
        setItems(newItems);
        updateLocalStorageWithItems(newItems)
    }

    const value = {
        items,
        setItems,
        addItem,
        editItem
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
