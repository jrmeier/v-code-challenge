import { useState } from 'react';
import { Modal } from './Modal/Modal';
import { AddItemForm } from './AddItemForm/AddItemForm';

export function EmptyShoppingList ({items, setItems}) {
    const [showAddItemModal, setShowAddItemModal] = useState(true);
    return (<>
    <div className='shopping-list-empty'> 
        Your shopping list is empty. { ':(' }
        <button onClick={() =>setShowAddItemModal(!showAddItemModal)} className="add-first-item-button">
            Add your first item
        </button>
    </div>
     {
        showAddItemModal && <Modal setShowModal={setShowAddItemModal} component={<AddItemForm />} />
     }
    </>
    )
}
