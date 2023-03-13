import { useEffect, useState, useContext } from 'react';

import { AppContext, AppContextProvider } from './AppContext';
import './App.css';

import { LoadingScreen } from './components/LoadingScreen';
import { ShoppingList } from './components/ShoppingList/ShoppingList';
import { ShoppingListMu } from './components/ShoppingListMu';

// import { ThemeProvider } from '@material-ui/core/styles';

// handle strict mode warnings
// import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';


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
      <ShoppingListMu />
    </div>
  );
}

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#1871e8'
//     }
//   }
// })

function AppWithProvider() {
  return (
    <AppContextProvider>
        <App />
    </AppContextProvider>
  )
}

export default AppWithProvider;
