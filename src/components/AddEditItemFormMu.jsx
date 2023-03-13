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
    makeStyles
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
    textFieldRoot: {
        width: '100%',
        border: '1px solid #c6c6c6',
        boxShadow: 'none',
        borderBottom: 0,
        outline: 'none',
        // paddingBottom: '10px',
        textAlign: 'center',
        verticalAlign: 'middle',
        // paddingTop: '10px',
        margin: '2px',
        // paddingBottom: '10px',
        // height: '52px',
        input: {
            backgroundColor: 'red',
            textAlign: 'center',
            verticalAlign: 'middle',
            padding: '10px',
            outline: 'none',

            '&:focus': {
                borderBottom: 0,
            },
        }
    }

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
                Add an item
                < br />
                Add your new item below
            <TextField
            margin="dense"
            // label="Item Name"
            type="email"
            fullWidth
            variant="standard"
            hiddenLabel={true}
            classes={{ root: classes.textFieldRoot }}
            placeholder="Item Name"
            underline={false}
            focused={false}
          />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
                <Button onClick={() => setShowAddItemModal(false)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}