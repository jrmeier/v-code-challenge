import { useState, useContext, useRef, createRef } from 'react';
import { AppContext } from '../AppContext';
// import Button from '@mui/material/Button';

import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Checkbox, Modal,Box,Typography, styled  } from '@mui/material';
import { EmptyShoppingListMu } from './EmptyShoppingList';

import { DeleteItemDialog, DeleteItemModalMu } from './DeleteItemModal';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0',
//         width: '60%',
//         margin: '0 auto',
//         backgroundColor: 'white',
//         color: '#87898c',
//     },
//     listItem: {
//         marginTop: '10px',
//         marginBottom: '10px',
//         color: '7d7a7a',
//         textAlign: 'left',
//         border: '1px solid #7d7a7a',
//         padding: '10px',
//     }
// }));

const ListContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    width: '60%',
    margin: '0 auto',
    backgroundColor: 'white',
    color: '#87898c',
})


export function ShoppingListMu () {
    const { items, setItems, addItem } = useContext(AppContext);
    // const classes = useStyles();
    const classes = {}
    const deleteDialogRef = useRef();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    // const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const openDeleteModal = () => {
        // deleteDialogRef.current.open();
    }
    
    const handleDeleteItem = (index) => {
        // console.log("deleting item: ", index)
        const newItems = items.filter((item, i) => i !== index);
        setItems(newItems);
        // deleteDialogRef.current.close();
    }

    const handleDeleteModalClose = () => console.log('deleteing')

    return items.length > 0 ? (
        <ListContainer component={'div'}>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} className={classes.listItem}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={item.checked}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={item.name} secondary={item.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleDeleteItem(index)}>
                                <div className="edit-icon">edit</div>
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => setIsDeleteDialogOpen(true)}>
                                <div className='delete-icon'>delete</div>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
                <DeleteItemDialog
                    openDeleteModal={openDeleteModal}
                    handleDeleteModalClose={handleDeleteModalClose}
                    isDialogOpen={isDeleteDialogOpen}
                    deleteDialogRef={deleteDialogRef}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                />
            </ListContainer>
        ) : <EmptyShoppingListMu />
}