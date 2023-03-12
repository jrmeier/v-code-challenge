
import { useContext, useEffect, useState } from 'react';
import './AddItemForm.css';
import { AppContext } from '../../AppContext';

export function AddItemForm({ setShowAddItemModal, editIndex, setEditIndex, submitAction, setNewItem }){
    const appContext = useContext(AppContext);
    const { items, setItems, addItem } = appContext;
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);


    const handleItemChange = (e) => {
        if (e.target.name === 'itemName') setItemName(e.target.value)
        if (e.target.name === 'itemDescription') setItemDescription(e.target.value)
        if (e.target.name === 'itemQuantity') setItemQuantity(e.target.value)

        const newItem = {
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity
        }
        setNewItem(newItem)
    }


    useEffect(() => {
        // clear the form when the modal is closed
        return () => {
            if (editIndex !== null) {
                const item = items[editIndex];
                setItemName(item?.name);
                setItemDescription(item?.description);
                setItemQuantity(item?.quantity);
            }
            // if we 
            // if(editIndex == null && setEditIndex) setEditIndex(null);
        }
    }, [editIndex, items,setEditIndex])
    

    console.log({ editIndex })
    return ( 
        <div className='add-item'>
        <div className='add-item-form-header'>SHOPPING LIST</div>
        <div style={{ fontSize: '18px', lineHeight: '24px' }}> Add an Item</div>
        <div style={{ fontSize: '14px'}}>Add your new item below</div>
        <div className="add-item-form">
            <form onSubmit={submitAction}>
                <input type="text" name="itemName" value={itemName} onChange={handleItemChange} placeholder="Item Name" />
                <input type="text" name="itemDescription" value={itemDescription} onChange={handleItemChange} placeholder="Description" />
                <select name="itemQuantity" placeholder='How many?' className='itemQuantitySelect' onChange={handleItemChange}>
                    {[...Array(3)].map((_, i) => <option className='itemQuantitySelectOption'  key={i +1 } value={i +1}> 
                            {i +1}
                        
                        </option>)}
                </select>
                { editIndex !== null ? (
                    <><input type="checkbox" className="shoppingListItemCheckbox" /> {'Purchased'}</>
                ) : null }
                <br />
            </form>

        </div>
        </div>
    )
}