import React, { useContext } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppContextProvider, AppContext } from './AppContext';
import './App.css';
import { LoadingScreen } from './components/LoadingScreen';
import { ShoppingList } from './components/ShoppingList';

// handle strict mode warnings
// import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

function App() {
  const { loading } = useContext(AppContext);

  return (
    <div className="App">
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6">
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      {loading && <LoadingScreen /> }
      <ShoppingList />
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4d81b7',
    },
  },
  typography: {
    fontFamily: 'Nunito',
  },
});

function AppWithProvider() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default AppWithProvider;
