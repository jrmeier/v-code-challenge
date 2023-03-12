import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import { Modal } from "../Modal/Modal"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EmptyShoppingList } from './EmptyShoppingList'

import './ShoppingList.css'

export function ShoppingList() {

    const { items, setItems } = useContext(AppContext);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // const handleEditItem = (itemIndex) => {
    //     console.log('edit item: ',itemIndex)
    //     setEditIndex(itemIndex)
    //     setShowAddItemModal(!showAddItemModal)
    // }

    const handleAddItem = (e) => {
        // e.preventDefault();
        console.log("handleAddItem: ", e)
        // const newItem = {
        //     name: itemName,
        //     description: itemDescription,
        //     quantity: itemQuantity
        // }

        // setItems([...items, newItem])
        setShowAddItemModal(false)
    }

    const handleEditItem = (e) => {
        console.log("editItem: ", e)
        // const newItem = {
        //     name: itemName,
        //     description: itemDescription,
        //     quantity: itemQuantity
        // }

        // const newItems = [...items];
        // newItems[editIndex] = newItem;

        // setItems(newItems);
        setShowAddItemModal(false);
    }


    const handleCheckboxClick = (itemIndex) => {
        console.log('checkbox clicked: ', itemIndex)
        const newItem = items[itemIndex];
        newItem.checked = !newItem.checked;
        items.pop(itemIndex);
        const newItems = [...items, newItem];

        setItems(newItems);
        //
    }

    return (
        <>

        { items.length ?  (
        <div className="shoppingList">
            <div className="shopping-list-header">
                Your items <button className="add-item-button" onClick={() => setShowAddItemModal(!showAddItemModal)}>Add Item</button>
            </div>
            <ul className="shoppingList">
                {
                    items.map((item, i) => {
                        return (
                            <li className="shoppingListItem" key={i}>
                                <div className="shoppingListItemContent">
                                    <input type="checkbox" className="shoppingListItemCheckbox" onChange={() =>handleCheckboxClick(i)} />
                                    <div className="shoppingListNameAndDescription">
                                        <div className={`shoppingListItemName ${item?.checked ? 'checked' : ''}`} >{item.name}</div>
                                        <div className={`shoppingListItemDescription ${item?.checked ? 'checked' : ''}`}>{item.description}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="material-symbols-outlined shoppingListItemButton" onClick={()=>handleEditItem(i)}>edit</div>
                                    <div className="material-symbols-outlined shoppingListItemButton">delete</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            {
                showAddItemModal && <Modal 
                actionButtonLabel={editIndex === null ? 'Add Item' : 'Save Item'}
                actionButtonAction={editIndex === null ? handleAddItem : handleEditItem}
                setShowModal={setShowAddItemModal} component={
                    <AddItemForm
                        setShowAddItemModal={setShowAddItemModal} 
                        editIndex={editIndex}
                        setEditIndex={setEditIndex}
                        submitAction={handleAddItem}
                        // actionButton={}
                    />} 
                />
            }
        </div>
        ) : <EmptyShoppingList setShowAddItemModal={setShowAddItemModal} />
    }
        </>
    )
}