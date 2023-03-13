import { useState, useContext } from 'react';
// import { Modal } from '../Modal/Modal';
// import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
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
        showAddItemModal && <Dialog open={showAddItemModal} onClose={() => setShowAddItemModal(false)}>
            <DialogTitle>Add an Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add your new item below
                </DialogContentText>
                {/* <AddItemForm setShowAddItemModal={setShowAddItemModal} submitAction={addItem} /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    }
    </>
    )
}
