import React, { useContext, forwardRef } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppContext } from '../AppContext';

const StyledDialog = styled(forwardRef((props, ref) => (
  <Dialog ref={ref} {...props} /> // eslint-disable-line react/jsx-props-no-spreading
)))({
  display: 'flex',
  backgroundColor: 'white',
  padding: '30px',
  width: '410px',
  height: '240px',
  margin: '0 auto',
  marginTop: '20vh',
  background: '#FFFFFF',
  borderRadius: '4px',
});

const StyledDialogTitle = styled(DialogTitle)({
  fontSize: '18px',
  lineHeight: '24px',
  color: '#2A323C',
  paddingBotton: '10px',
});

const StyledDialogContent = styled(DialogContent)({
  fontFamily: 'Nunito',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
  color: '#5C6269',
  marginTop: '10px',
});

const DialogFooter = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const CancelButton = styled(Button)({
  marginRight: '10px',
  textTransform: 'none',
});
const DeleteButton = styled(Button)({
  backgroundColor: '#1871E8',
  color: 'white',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#1871E8',
    color: 'white',
    textTransform: 'none',
  },
});

export default function DeleteItemDialog({ isDialogOpen, setIsDialogOpen, deleteId }) {
  const { deleteItem } = useContext(AppContext);
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    // delete item
    setIsDialogOpen(false);
    deleteItem(deleteId);
  };
  return (
    <div>
      <StyledDialog open={isDialogOpen} onClose={handleClose}>
        <StyledDialogTitle>Delete Item?</StyledDialogTitle>
        <StyledDialogContent>
          Are you sure you want to delete this item? This cannot be undone.
        </StyledDialogContent>
        <DialogFooter>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </DialogFooter>
      </StyledDialog>
    </div>
  );
}
