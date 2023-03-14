import { forwardRef, useEffect, useState, useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide,
    TextField,
    Select,
    FormControl,
    MenuItem,
    styled,
    Typography,
    Checkbox,
    FormControlLabel
} from '@mui/material';

import { AppContext } from '../AppContext';

const Transition = forwardRef(function Transition(props, ref) {
    // the css is here because it wont be reused
    return <Slide direction="left" ref={ref} {...props} style={{ 
        transformOrigin: 'right',
        marginLeft: '66.67%', // set margin-left to 66.67% (1/3 of the screen width)
        // width: '100%',
        padding: 0 }}/>;
});

const StyledAddEditDialog = styled(Dialog)({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
}
)

const StyledDialogTitle = styled(DialogTitle)(
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '100%',
        height: '64px',
        margin: 0,
        backgroundColor: '#FAFAFA',
        border: '1px solid #c6c6c6',
        padding: 0,
        paddingRight: '20px',
        paddingLeft: '30px',
        color: '#5C6269',
        fontFamily: 'Dosis',

    }
)

const StyledDialogContent = styled(DialogContent)(
    {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '30px',
        fontFamily: 'Nunito',
        marginTop: '20px',
    }
)

const StyledLastPageIcon = styled('div')(
    {
        fontSize: '2rem',
        padding: '10px',
        cursor: 'pointer',
        color: '#5C6269',
    }
)

const StyledDialogEditText = styled(Typography)(
    {
        fontFamily: 'Nunito',
        marginTop: '20px',
    }
)

const StyledSaveEditButton = styled(Button)(
    {
        backgroundColor: '#1871e8',
        color: 'white',
        border: '1px solid #87898c',
        // width: '30%',
        height: '2.5rem',
        // transform: 'translate(-50%, -50%)',
    })

const StyledCancelButton = styled(StyledSaveEditButton)(
    {
        backgroundColor: 'white',
        color: '#5C6269',
        border: 'none'
    })

const StyledDialogActions = styled(DialogActions)(
    {
        display: 'flex',
        alignItems: 'right',
        height: '64px',
        margin: 0,
        marginTop: 'auto',
    })

const StyledQuantitySelect = styled(Select)(
    {
        width: '100%',
        boxShadow: 'none',
        outline: 'none',
        padding: '10px',
        borderRadius: '1px',
        fontFamily: 'Nunito',
        fontSize: '1rem',
        color: '#5C6269',
        '&:focus': {
            outline: 'none',
            color: '#5C6269',
        },
    }
)

const StyledTextInput = styled(TextField)(
    {
        marginBottom: '20px'
    }
)

export function AddEditItemFormMu({ 
    showAddItemModal,
    setShowAddItemModal,
    editIndex,
    setEditIndex,
}) {
    const { items, addItem, editItem } = useContext(AppContext);

    const [quantitySelectFocused, setQuantitySelectFocused] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemPurchased, setItemPurchased] = useState(false);

    const handleSaveClick = () => {
        
        const newItem = {
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity,
            purchased: itemPurchased,
        }
        if (editIndex === null || editIndex === undefined) {
            addItem(newItem)
        } else {
            console.log("editIndex: ", editIndex)
            editItem(newItem, editIndex);
        }

        console.log('save clicked: ', newItem);
        setShowAddItemModal(false);
    }


    useEffect(() => {
        console.log('add edit form editIndex: ', editIndex)
        if (editIndex !== null) {
            const itemToEdit = items[editIndex];
            setItemName(itemToEdit.name);
            setItemDescription(itemToEdit.description);
            setItemQuantity(itemToEdit.quantity);
            setItemPurchased(itemToEdit.purchased);
        }

        return () => {
            // clear the form when the modal is closed
            console.log('cleaning up')
            setItemName('');
            setItemDescription('');
            setItemQuantity('');
            setItemPurchased(false);
            // setEditIndex(null);
        }
    }, [editIndex, items, setEditIndex])

    const addOrEditText = editIndex === null ? 'Add' : 'Edit';
    
    return (
        <StyledAddEditDialog 
        fullScreen={true}
        open={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        TransitionComponent={Transition}
        >   
            <StyledDialogTitle>SHOPPING LIST
            <StyledLastPageIcon onClick={() => setShowAddItemModal(false)}>
                <div className='material-icons' >last_page</div>
            </StyledLastPageIcon>
            </StyledDialogTitle>
            <StyledDialogContent>
                <StyledDialogEditText variant='h6'>{addOrEditText} an item</StyledDialogEditText>
                <Typography variant='body_2' component='p'>{addOrEditText} the item below</Typography>
            
            <FormControl
            variant="outlined"
            fullWidth
            margin='normal'
            >
            <StyledTextInput
                type="text"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                variant="outlined"
                hiddenLabel={true}
                placeholder="Item Name"
                focused={false}
          />

          <StyledTextInput
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            fullWidth
            variant="outlined"
            hiddenLabel={true}
            placeholder="Description"
            multiline={true}
            minRows={6}
            focused={false}
          />

        <StyledQuantitySelect
            fullWidth
            variant="outlined"
            displayEmpty={!quantitySelectFocused}
            value={itemQuantity}
            onFocus={() => setQuantitySelectFocused(true)}
            onBlur={() => setQuantitySelectFocused(false)}
            onChange={(e) => setItemQuantity(e.target.value)}
        >
            {!quantitySelectFocused && <MenuItem value="">How many?</MenuItem>}
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
        </StyledQuantitySelect>
        {editIndex !== null ?
            <FormControlLabel
            label="Purchased"
            control={
                <Checkbox
                checked={itemPurchased}
                onChange={(e) => setItemPurchased(e.target.checked)}
                />
            }/> : ''
        }
          </FormControl>
        <StyledDialogActions>
          <StyledCancelButton fullWidth={false} onClick={() => setShowAddItemModal(false)}>
                Cancel
          </StyledCancelButton>
          <StyledSaveEditButton fullWidth={false} onClick={handleSaveClick}>
                {editIndex === null ? 'Add item' : 'Save item'}
          </StyledSaveEditButton>
        </StyledDialogActions>
          
          </StyledDialogContent>
        </StyledAddEditDialog>
    )
}