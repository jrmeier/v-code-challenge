import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import { Modal } from "../Modal/Modal"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EmptyShoppingList } from './EmptyShoppingList'
import { DeleteItemForm } from '../DeleteItemForm/DeleteItemForm'

import './ShoppingList.css'

export function ShoppingList() {

    const { items, setItems, addItem } = useContext(AppContext);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [newItem, setNewItem] = useState(null)

    const handleEditItem = (itemIndex) => {
        setEditIndex(itemIndex)
        setShowAddItemModal(!showAddItemModal)
    }
    
    const handleAddItem = () => {
        console.log('add item')
        addItem(newItem)
        setShowAddItemModal(!showAddItemModal)
    }
   

    const handleCheckboxClick = (itemIndex) => {
        const newItem = items[itemIndex];
        newItem.checked = !newItem.checked;
        items.pop(itemIndex);
        const newItems = [...items, newItem];

        setItems(newItems);
        //
    }

    const handleDeleteItem = (itemIndex) => {
        setDeleteIndex(itemIndex)
        setShowDeleteModal(true)
    }
    const handleDeleteItemSubmit = () => {
        console.log('delete item: ', deleteIndex)
        const newItems = [...items];
        newItems.pop(deleteIndex);
        setItems(newItems);
        setDeleteIndex(null)
        showDeleteModal(false)
    }

    // const showDeleteModal = (itemIndex) => {
    //     console.log('show delete modal: ', itemIndex)
    // }

    const handleEditItemSubmit = () => {
        console.log('edit item')
        const newItems = [...items];
        newItems[editIndex] = newItem;
        setEditIndex(null);
        setItems(newItems);
        setShowAddItemModal(!showAddItemModal)
    }


    return (
        <>

        { items.length ?  (
        <div className="shoppingList">
            <div className="shopping-list-header">
                <div className=''>Your items</div>
                <div className=""><button className="add-item-button" onClick={() => setShowAddItemModal(!showAddItemModal)}>Add Item</button></div>
            </div>
            <ul className="shoppingList">
                {
                    items.map((item, i) => {
                        return (
                            <li className="shoppingListItem" key={i}>
                                <div className="shoppingListItemContent">
                                    <input type="checkbox" className="shoppingListItemCheckbox" onChange={() =>handleCheckboxClick(i)} />
                                    <div className="shoppingListNameAndDescription">
                                        <div className={`shoppingListItemName ${item?.checked ? 'checked' : ''}`} >{item?.name}</div>
                                        <div className={`shoppingListItemDescription ${item?.checked ? 'checked' : ''}`}>{item?.description}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="material-symbols-outlined shoppingListItemButton" onClick={()=>handleEditItem(i)}>edit</div>
                                    <div className="material-symbols-outlined shoppingListItemButton" onClick={() =>handleDeleteItem(i)}>delete</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            {
                showAddItemModal && <Modal 
                actionButtonLabel={editIndex === null ? 'Add Item' : 'Save Item'}
                actionButtonAction={editIndex === null ? handleAddItem : handleEditItemSubmit}
                setShowModal={setShowAddItemModal}
                component={
                    <AddItemForm
                        setShowAddItemModal={setShowAddItemModal} 
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                        setNewItem={setNewItem}
                        // actionButton={}
                    />} 
                    submitAction={editIndex === null ? handleAddItem : handleEditItemSubmit}
                />
            }

            {
                showDeleteModal && <Modal
                actionButtonLabel='Delete Item'
                actionButtonAction={handleDeleteItem}
                setShowModal={setShowDeleteModal}
                component={
                    <DeleteItemForm />
                }
                />
            }

        </div>
        ) : <EmptyShoppingList setShowAddItemModal={setShowAddItemModal} />
    }
        </>
    )
}