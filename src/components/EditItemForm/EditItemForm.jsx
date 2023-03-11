
import './AddItemForm.css';

export function AddItemForm(){
    return (
        <div className='add-item'>
        <div className='add-item-form-header'>SHOPPING LIST</div>
        <div style={{ fontSize: '18px', lineHeight: '24px' }}> Add an Item</div>
        <div style={{ fontSize: '14px'}}>Add your new item below</div>
        <div className="add-item-form">
            <form>
                <input type="text" name="itemName" placeholder="Item Name" />
                <input type="text" name="itemDescription" placeholder="Description" />
                <select name="itemQuantity" placeholder='How many?' className='itemQuantitySelect'>
                    {[...Array(3)].map((_, i) => <option className='itemQuantitySelectOption'  key={i +1 } value={i +1}> 
                            {i +1}
                        
                        </option>)}
                </select>


                <button type="submit" onClick={(e) => e.preventDefault()}>Add Item</button>
            </form>
        </div>
        </div>
    )
}