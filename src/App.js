import { useState } from 'react';

import { AppContextProvider } from './AppContext';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { LoadingScreen } from './components/LoadingScreen';
import { ShoppingListMu } from './components/ShoppingListMu';

import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h6">
          Shopping List
        </Typography>
        </Toolbar>
    </AppBar>
    {loading && <LoadingScreen/> }
    <ShoppingListMu />
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4d81b7'
    }
  },
  typography: {
    fontFamily: "Nunito",
  }
})

function AppWithProvider() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  )
}

export default AppWithProvider;
