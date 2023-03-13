import { forwardRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    TextField,
    makeStyles,
    Select,
    FormControl,
    MenuItem,
    OutlinedInput
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    dialogPaper: {
        height: '100%',
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 0,
        borderRadius: 0,
    },
    dialogTitleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '64px',
        margin: 0,
        backgroundColor: '#FAFAFA',
        border: '1px solid #c6c6c6',
        // paddingRight: '50px',
    },
    dialogTitle: {
        // padding: '10px',
        fontFamily: 'Dosis',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#87898c',
    },
    lastPageIcon: {
        fontSize: '2rem',
        color: '#87898c',
        padding: '10px',
        cursor: 'pointer',
    },
    formControl: {
        width: '100%'
    },
    textFieldRoot: {
        width: '100%',
        boxShadow: 'none',
        borderBottom: 0,
        outline: 'none',
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: '2px',
        padding: '10px',
        borderRadius: '1px',
    },
selectRoot: {
    width: '100%',
    boxShadow: 'none',
    borderBottom: 0,
    outline: 'none',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: '10px',
    padding: '10px',
    borderRadius: '1px',
},

}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} style={{ transformOrigin: 'right', marginLeft: '33.33%',width: '100%', padding: 0, }}/>;
});

export function AddEditItemFormMu({ 
    showAddItemModal,
    setShowAddItemModal,
    editIndex,
    setEditIndex,
    submitAction
}) {
    const classes = useStyles();

    // const [selected]
    
    return (
        <Dialog 
        fullScreen={true}
        open={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        TransitionComponent={Transition}
        classes={{ paper: classes.dialogPaper }}
        >   
        <div className={classes.dialogTitleContainer}>
            <DialogTitle classes={{ root: classes.dialogTitle}}>SHOPPING LIST</DialogTitle>
            <div
                onClick={() => setShowAddItemModal(false)}
                className={classes.lastPageIcon}>
                <div className='material-icons' >last_page</div>
            </div>
        </div>
            <DialogContent classes={{ }}>
                <div
                    style={{ fontSize: '18px', lineHeight: '24px' }}> Add an Item</div>
                <div style={{ fontSize: '14px'}}>Add your new item below</div>
            <FormControl variant="outlined" className={classes.formControl}>
            <TextField
                // margin="dense"
                // label="Item Name"
                type="text"
                fullWidth
                variant="outlined"
                hiddenLabel={true}
                classes={{ root: classes.textFieldRoot }}
                placeholder="Item Name"

                focused={false}
          />
          <TextField
            type="text"
            fullWidth
            variant="outlined"
            hiddenLabel={true}

            classes={{ root: classes.textFieldRoot }}
            placeholder="Description"
            multiline={true}
            minRows={6}
            focused={false}
          />

          <Select
            // multiple
            fullWidth
            displayEmpty={true}
            variant="outlined"
            classes={{ root: classes.selectRoot }}
          >
            <MenuItem disabled value="">How many?</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
                <Button onClick={() => setShowAddItemModal(false)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}