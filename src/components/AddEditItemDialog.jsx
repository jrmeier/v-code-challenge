import React, {
  forwardRef, useEffect, useState, useContext,
} from 'react'; // eslint-disable-line no-unused-vars
import {
  Slide,
  FormControl,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import {
  StyledSaveEditButton,
  StyledTextInput,
  StyledQuantitySelect,
  StyledQuantityMenuItem,
  StyledDialogActions,
  StyledCancelButton,
  StyledAddEditDialog,
  StyledDialogTitle,
  StyledLastPageIcon,
  StyledDialogContent,
  StyledDialogEditText,
  DescriptionContainer,
  DescriptionCountDisplay,

} from './AddEditDialogStyles';
import { AppContext } from '../AppContext';

const Transition = forwardRef((props, ref) => (
  <Slide
    direction="left"
    ref={ref}
    {...props} // eslint-disable-line react/jsx-props-no-spreading
    style={{
      transformOrigin: 'right',
      marginLeft: '66.67%',
      padding: 0,
    }}
  />
));

export function AddEditItemFormMu({
  showAddItemModal,
  setShowAddItemModal,
  editItemId,
  setEditItemId,
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
    };
    if (editItemId === null || editItemId === undefined) {
      addItem(newItem);
    } else {
      newItem.id = editItemId;
      editItem(newItem);
    }

    setShowAddItemModal(false);
  };

  useEffect(() => {
    console.log('editItemId', editItemId);
    if (editItemId !== null) {
      const itemToEdit = items[editItemId];
      setItemName(itemToEdit.name);
      setItemDescription(itemToEdit.description);
      setItemQuantity(itemToEdit.quantity);
      setItemPurchased(itemToEdit.purchased);
    }

    return () => {
      setItemName('');
      setItemDescription('');
      setItemQuantity('');
      setItemPurchased(false);
      // setEditItemId(null);
    };
  }, [editItemId, items, setEditItemId]);

  const addOrEditText = editItemId === null ? 'Add' : 'Edit';

  return (
    <StyledAddEditDialog
      fullScreen
      open={showAddItemModal}
      onClose={() => setShowAddItemModal(false)}
      TransitionComponent={Transition}
    >
      <StyledDialogTitle>
        SHOPPING LIST
        <StyledLastPageIcon onClick={() => setShowAddItemModal(false)}>
          <div className="material-icons">last_page</div>
        </StyledLastPageIcon>
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogEditText variant="h6">
          {addOrEditText}
          {' '}
          an item
        </StyledDialogEditText>
        <Typography variant="body_2" component="p">
          {addOrEditText}
          {' '}
          the item below
        </Typography>

        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <StyledTextInput
            type="text"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            variant="outlined"
            hiddenLabel
            placeholder="Item Name"
            focused={false}
          />
          <DescriptionContainer>
            <StyledTextInput
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              fullWidth
              variant="outlined"
              hiddenLabel
              placeholder="Description"
              multiline
              minRows={6}
              focused={false}
            />
            <DescriptionCountDisplay>
              {' '}
              {itemDescription.length}
              /100
              {' '}
            </DescriptionCountDisplay>
          </DescriptionContainer>
          <StyledQuantitySelect
            fullWidth
            variant="outlined"
            displayEmpty={!quantitySelectFocused}
            value={itemQuantity}
            onFocus={() => setQuantitySelectFocused(true)}
            onBlur={() => setQuantitySelectFocused(false)}
            onChange={(e) => setItemQuantity(e.target.value)}
          >
            {!quantitySelectFocused && <StyledQuantityMenuItem value="">How many?</StyledQuantityMenuItem>}
            <StyledQuantityMenuItem value={1}>1</StyledQuantityMenuItem>
            <StyledQuantityMenuItem value={2}>2</StyledQuantityMenuItem>
            <StyledQuantityMenuItem value={3}>3</StyledQuantityMenuItem>
          </StyledQuantitySelect>
          {editItemId !== null
            ? (
              <FormControlLabel
                label="Purchased"
                control={(
                  <Checkbox
                    checked={Boolean(itemPurchased)}
                    onChange={(e) => setItemPurchased(e.target.checked)}
                  />
              )}
              />
            ) : ''}
        </FormControl>
        <StyledDialogActions>
          <StyledCancelButton fullWidth={false} onClick={() => setShowAddItemModal(false)}>
            Cancel
          </StyledCancelButton>
          <StyledSaveEditButton fullWidth={false} onClick={handleSaveClick}>
            {editItemId === null ? 'Add Item' : 'Save Item'}
          </StyledSaveEditButton>
        </StyledDialogActions>

      </StyledDialogContent>
    </StyledAddEditDialog>
  );
}
