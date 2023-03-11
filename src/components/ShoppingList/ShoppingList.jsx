import { useContext, useState } from "react"
import { AppContext } from "../../AppContext"
import { Modal } from "../Modal/Modal"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EmptyShoppingList } from './EmptyShoppingList'

import './ShoppingList.css'

export function ShoppingList() {

    const { items } = useContext(AppContext);
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    console.log('items', items)

    return (
        <>

        { items.length ?  (
        <div className="shopping-list">
            <div className="shopping-list-header">
                Your items <button className="add-item-button" onClick={() => setShowAddItemModal(!showAddItemModal)}>Add Item</button>
            </div>
            <ul className="shoppingList">
                {
                    items.map((item, i) => {
                        return (
                            <li className="shoppingListItem" key={i}>
                                <input type="checkbox" className="shoppingListItemCheckbox" />
                                <div className="shoppingListItemName">{item.name}</div>
                                <div className="shopping-list-item-description">{item.description}</div>
                            </li>
                        )
                    })
                }
            </ul>
            {/* {
                showAddItemModal && <Modal setShowModal={setShowAddItemModal} component={<AddItemForm setShowAddItemModal={setShowAddItemModal} />} />
            } */}
        </div>
        ) : <EmptyShoppingList setShowAddItemModal={setShowAddItemModal} />
    }
        </>
    )
}