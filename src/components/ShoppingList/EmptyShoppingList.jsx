import { useState, useContext } from 'react';
import { Modal } from '../Modal/Modal';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { AppContext } from '../../AppContext';

export function EmptyShoppingList () {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const { addItem } = useContext(AppContext);


    return (<>
    <div className='shopping-list-empty'> 
        Your shopping list is empty. { ':(' }
        <button onClick={() =>setShowAddItemModal(!showAddItemModal)} className="action-button">
            Add your first item
        </button>
    </div>
     {
        showAddItemModal && <Modal 
        setShowModal={setShowAddItemModal}
        component={<AddItemForm setShowAddItemModal={setShowAddItemModal}/>}
        actionButtonAction={addItem}
        actionButtonLabel='Add Item'
    />
     }
    </>
    )
}
