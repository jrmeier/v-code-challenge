
import { useContext, useEffect, useState } from 'react';
import './AddItemForm.css';
import { AppContext } from '../../AppContext';

export function AddItemForm({ setShowAddItemModal, editIndex, setEditIndex, submitAction }){
    const appContext = useContext(AppContext);
    const { items, setItems } = appContext;
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    useEffect(() => {
        // clear the form when the modal is closed
        if (editIndex !== null) {
            const item = items[editIndex];
            setItemName(item.name);
            setItemDescription(item.description);
            setItemQuantity(item.quantity);
        }
        
        return () => {
            setEditIndex(null);
        }
    }, [editIndex, items,setEditIndex])
    


    return (
        <div className='add-item'>
        <div className='add-item-form-header'>SHOPPING LIST</div>
        <div style={{ fontSize: '18px', lineHeight: '24px' }}> Add an Item</div>
        <div style={{ fontSize: '14px'}}>Add your new item below</div>
        <div className="add-item-form">
            <form onSubmit={submitAction}>
                <input type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)}placeholder="Item Name" />
                <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Description" />
                <select name="itemQuantity" placeholder='How many?' className='itemQuantitySelect'>
                    {[...Array(3)].map((_, i) => <option className='itemQuantitySelectOption'  key={i +1 } value={i +1}> 
                            {i +1}
                        
                        </option>)}
                </select>
                <input type="checkbox" className="shoppingListItemCheckbox" /> Purchased
                <br />
                {/* <button type="submit" onClick={addItem}>Add Item</button> */}
            </form>
        </div>
        </div>
    )
}