
import { useContext, useState } from 'react';
import './AddItemForm.css';
import { AppContext } from '../../AppContext';

export function AddItemForm({ setShowAddItemModal }){
    const appContext = useContext(AppContext);
    const { items, setItems } = appContext;

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    const addItem = (e) => {
        e.preventDefault();
        const newItem = {
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity
        }

        setItems([...items, newItem])
        setShowAddItemModal(false)
    }

    return (
        <div className='add-item'>
        <div className='add-item-form-header'>SHOPPING LIST</div>
        <div style={{ fontSize: '18px', lineHeight: '24px' }}> Add an Item</div>
        <div style={{ fontSize: '14px'}}>Add your new item below</div>
        <div className="add-item-form">
            <form onSubmit={addItem}>
                <input type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)}placeholder="Item Name" />
                <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Description" />
                <select name="itemQuantity" placeholder='How many?' className='itemQuantitySelect'>
                    {[...Array(3)].map((_, i) => <option className='itemQuantitySelectOption'  key={i +1 } value={i +1}> 
                            {i +1}
                        
                        </option>)}
                </select>


                <button type="submit" onClick={addItem}>Add Item</button>
            </form>
        </div>
        </div>
    )
}