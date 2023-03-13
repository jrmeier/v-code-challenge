import { useState, useContext } from 'react';
// import { Modal } from '../Modal/Modal';
// import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Box, Button, makeStyles } from '@material-ui/core'
import { AppContext } from '../AppContext';
import { AddEditItemFormMu } from './AddEditItemFormMu';;

// height: 240px;
// width: 410px;
// left: 0px;
// top: 0px;
// border-radius: 4px;

const useStyles = makeStyles((theme) => ({
    box: {
        height: '240px',
        // width: '410px',
        display: 'flex-root',
        flexDirection: 'column',
        // justifyItems: 'center',
        borderRadius: '4px',
        fontFamily: "Nunito, sans-serif",
        width: '40%',
        margin: 'auto',
        minHeight: '10vh',
        border: '1px solid #c6c6c6',
        marginTop: '5%',
    },
    content: {
        textAlign: 'center',
        margin: 'auto',
        marginTop: '10%',
        color: '#87898c',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    
    button: {
        // marginTop: '10px',
        backgroundColor: '#1871e8',
        color: 'white',
        border: '1px solid #87898c',

    }
}))

export function EmptyShoppingListMu () {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const { addItem } = useContext(AppContext);

    const classes = useStyles();

    return (
        <div>
            <Box className={classes.box}>
                <div className={classes.content}>{'Your shopping list is empty :( '}</div>
                    <Button className={classes.button} onClick={() =>setShowAddItemModal(!showAddItemModal)} > Add your first item </Button>
            </Box>
            <AddEditItemFormMu
                showAddItemModal={showAddItemModal}
                setShowAddItemModal={setShowAddItemModal}
                submitAction={addItem}

             />
    </div>
    )
}
