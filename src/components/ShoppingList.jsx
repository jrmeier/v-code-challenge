import React, { useState, useContext } from 'react';
import {
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Checkbox,
} from '@mui/material';

import {
  StyledAddItemContainer,
  StyledListTitle,
  StyledAddItemButton,
  StyledListItem,
  StyledListItemPrimary,
  StyledListItemPrimaryStrike,
  ListContainer,
  StyledListItemSecondaryStrike,
}
  from './ShoppingListStyles';

import { AppContext } from '../AppContext';

import { EmptyShoppingList } from './EmptyShoppingList';

import DeleteItemDialog from './DeleteItemDialog';
import AddEditItemFormMu from './AddEditItemDialog';

export default function ShoppingList() {
  const { items, setItems, editItem } = useContext(AppContext);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddEditItem, setShowAddEditItem] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteItem = (itemId) => {
    setIsDeleteDialogOpen(true);
    setDeleteId(itemId);
  };

  const handleEditItem = (itemId) => {
    setEditItemId(itemId);
    setShowAddEditItem(true);
  };

  const handleAddItem = () => {
    setEditItemId(null);
    setShowAddEditItem(true);
  };

  const handleCheckItem = (itemId) => {
    const newItem = items.find((item) => item.id === itemId);
    newItem.purchased = !newItem.purchased;
    editItem(newItem);
  };

  return items.length > 0 ? (
    <ListContainer component="div">
      <StyledAddItemContainer>
        <StyledListTitle variant="h5">Your items </StyledListTitle>
        <StyledAddItemButton onClick={() => handleAddItem()}>Add Item</StyledAddItemButton>
      </StyledAddItemContainer>
      <List>
        {items.map((item) => (
          <StyledListItem key={item.id}>
            <ListItemIcon>
              <Checkbox
                onChange={() => handleCheckItem(item.id)}
                edge="start"
                checked={Boolean(item.purchased)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={(
                <StyledListItemPrimary>
                  {
                                    item.purchased ? <StyledListItemPrimaryStrike component="span">{item.name}</StyledListItemPrimaryStrike> : <span>{item.name}</span>
                                }
                </StyledListItemPrimary>
                          )}
              secondary={
                                item.purchased ? <StyledListItemSecondaryStrike component="span">{item.description}</StyledListItemSecondaryStrike> : <span>{item.description}</span>
                            }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(item.id)} style={{ paddingRight: '20px' }}>
                <div className="material-symbols-outlined">edit</div>
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                <div className="material-symbols-outlined">delete</div>
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </List>
      <DeleteItemDialog
        openDeleteModal={setIsDeleteDialogOpen}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
        setItems={setItems}
        deleteId={deleteId}
      />
      <AddEditItemFormMu
        showAddItemModal={showAddEditItem}
        setShowAddItemModal={setShowAddEditItem}
        editItemId={editItemId}
        setEditItemId={setEditItemId}
      />
    </ListContainer>
  ) : <EmptyShoppingList />;
}
