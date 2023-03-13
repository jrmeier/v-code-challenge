import { useState, createContext } from 'react';


const defaultAppContext = {
    items: [],
    setItems: Function
}

export const AppContext = createContext(defaultAppContext);


export function AppContextProvider(props) {
    const [items, setItems] = useState(defaultAppContext.items);

    const addItem = (newItem) => {
        setItems([...items, newItem])
    }

    const value = {
        items,
        setItems,
        addItem
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
