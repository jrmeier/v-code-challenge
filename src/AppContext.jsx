import { useState, createContext } from 'react';


const defaultAppContext = {
    items: [{
        name: 'Tomatoes',
        description: 'red apples',
    }],
    setItems: Function
}

export const AppContext = createContext(defaultAppContext);


export function AppContextProvider(props) {
    const [items, setItems] = useState(defaultAppContext.items);

    const value = {
        items,
        setItems
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
