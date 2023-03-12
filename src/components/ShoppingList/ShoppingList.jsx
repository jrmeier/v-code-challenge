import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import { Modal } from "../Modal/Modal"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EmptyShoppingList } from './EmptyShoppingList'

import './ShoppingList.css'

export function ShoppingList() {

    const { items } = useContext(AppContext);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleEditItem = (itemIndex) => {
        console.log('edit item: ',itemIndex)
        setEditIndex(itemIndex)
        setShowAddItemModal(!showAddItemModal)
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
                                    <input type="checkbox" className="shoppingListItemCheckbox" />
                                    <div className="shoppingListNameAndDescription">
                                        <div className="shoppingListItemName">{item.name}</div>
                                        <div className="shoppingListItemDescription">{item.description}</div>
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
                showAddItemModal && <Modal setShowModal={setShowAddItemModal} component={
                <AddItemForm
                    setShowAddItemModal={setShowAddItemModal} 
                    editIndex={editIndex}
                />} />
            }
        </div>
        ) : <EmptyShoppingList setShowAddItemModal={setShowAddItemModal} />
    }
        </>
    )
}