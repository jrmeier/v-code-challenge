import { useEffect, useState, useContext } from 'react';

import { AppContext, AppContextProvider } from './AppContext';
import './App.css';

import { LoadingScreen } from './components/LoadingScreen';
import { ShoppingList } from './components/ShoppingList/ShoppingList';

function App() {
  const [loading, setLoading] = useState(false)
  
  const fakeLoad = () => {

    
    console.log('Loading...')
    setLoading(true)
      setInterval(() => {
      console.log('Loaded!')
      setLoading(false)
    }, 3000)

  }




  return (
    <div className="App">
      <header className="App-header">
        SHOPPING LIST
      </header>
      {loading && <LoadingScreen/> }
      <ShoppingList />
    </div>
  );
}

function AppWithProvider() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

export default AppWithProvider;
