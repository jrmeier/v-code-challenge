import { useEffect, useState } from 'react';

import './App.css';
import { EmptyShoppingList } from './components/EmptyShoppingList';

function App() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    console.log('App mounted');

    return () => {
      console.log('App unmounted');
    }
  });


  return (
    <div className="App">
      <header className="App-header">
        SHOPPING LIST
      </header>

      { items?.length ? 'Look at you fancy pants' : <EmptyShoppingList items={items}  setItems={setItems} />}

          {/* {
            items.length > 0 && <div className='shopping-list'>
              <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </div>
          } */}
    </div>
  );
}

export default App;
