import { forwardRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    TextField,
    Select,
    FormControl,
    MenuItem,
    Grid,
    OutlinedInput,
    styled,
    Typography,
    InputLabel
} from '@mui/material';

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
    // display: 'flex',
    // flexDirection: 'column',
    padding: 0,
    // borderRadius: 0,
    // top: 0, // set top to 0
    // right: 0, // set right to 0
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
        paddingRight: '30px',
        paddingLeft: '30px',
        color: '#5C6269',
        fontFamily: 'Dosis',

    }
)

const StyledDialogContent = styled(DialogContent)(
    {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
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

const StyledQuantitySelect = styled(Select)(
    {
        width: '100%',
        boxShadow: 'none',
        borderBottom: 0,
        outline: 'none',

        verticalAlign: 'middle',
        padding: '10px',
        borderRadius: '1px',
        fontFamily: 'Nunito',
        fontSize: '1rem',
        color: '#5C6269',
        '&:focus': {
            outline: 'none',
        },
    }
)

export function AddEditItemFormMu({ 
    showAddItemModal,
    setShowAddItemModal,
    editIndex,
    setEditIndex,
    submitAction
}) {

    const [quantitySelectFocused, setQuantitySelectFocused] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    const [selectQuantityOptions, setSelectQuantityOptions] = useState([1,2,3])
    
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
                <StyledDialogEditText variant='h6'>Edit an item</StyledDialogEditText>
                <Typography variant='body_2' component='p'>Edit the item below</Typography>
            
            <FormControl
            variant="outlined"
            fullWidth
            margin='normal'
            >
            <TextField
                // margin="dense"
                // label="Item Name"
                style={{marginBottom: '20px'}}
                type="text"
                fullWidth
                variant="outlined"
                hiddenLabel={true}
                placeholder="Item Name"
                focused={false}
          />

          <TextField
            type="text"
            fullWidth
            style={{marginBottom: '20px'}}
            variant="outlined"
            hiddenLabel={true}
            placeholder="Description"
            multiline={true}
            minRows={6}
            focused={false}
          />

        <StyledQuantitySelect
            // value={;}
            // onChange={handleChange}
            fullWidth
            variant="outlined"
            displayEmpty={!quantitySelectFocused}
            value={itemQuantity}
            inputProps={{ 'aria-label': 'Without label' }}
            onFocus={() => setQuantitySelectFocused(true)}
            onBlur={() => setQuantitySelectFocused(false)}
            onChange={(e) => setItemQuantity(e.target.value)}
        >
            {!quantitySelectFocused && <MenuItem value="">How many?</MenuItem>}
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
        </StyledQuantitySelect>
          </FormControl>

          <Button>
                Add Item
          </Button>
          <Button>
                Cancel
          </Button>

          </StyledDialogContent>
    
        </StyledAddEditDialog>
    )
}