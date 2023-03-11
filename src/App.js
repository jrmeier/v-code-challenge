import { useEffect, useState } from 'react';

import './App.css';
import { EmptyShoppingList } from './components/EmptyShoppingList';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [items, setItems] = useState([])
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
      {loading ? <LoadingScreen/> : (
        <>

      { items?.length ? 'Look at you fancy pants' : <EmptyShoppingList items={items}  setItems={setItems} />}
      <button onClick={fakeLoad}>Load</button>
      </>)
      }
    </div>
  );
}

export default App;
