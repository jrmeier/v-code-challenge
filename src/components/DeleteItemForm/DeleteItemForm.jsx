
import { useContext, useEffect, useState } from 'react';
import './DeleteItemForm.css';
import { AppContext } from '../../AppContext';

export function DeleteItemForm({ setShowAddItemModal, editIndex, setEditIndex, submitAction }){
    const appContext = useContext(AppContext);
    const { items, setItems } = appContext;


    useEffect(() => {
        // clear the form when the modal is closed
        if (editIndex !== null) {
            const item = items[editIndex];

        }
        
        return () => {
            if(editIndex !== null && setEditIndex) setEditIndex(null);
        }
    }, [editIndex, items,setEditIndex])
    


    return (
        <div className='add-item'>
            <div className='add-item-form-header'>Delete</div>
        </div>
    )
}