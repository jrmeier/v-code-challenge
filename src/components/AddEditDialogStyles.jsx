import React from 'react'; // eslint-disable-line no-unused-vars
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  styled,
  Typography,
  Button,
} from '@mui/material';

export const StyledAddEditDialog = styled(Dialog)({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
});

export const StyledDialogTitle = styled(DialogTitle)(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    height: '63px',
    margin: 0,
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #c6c6c6',
    padding: 0,
    paddingRight: '20px',
    paddingLeft: '30px',
    color: '#5C6269',
    fontFamily: 'Dosis',

  },
);

export const StyledDialogContent = styled(DialogContent)(
  {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '30px',
    fontFamily: 'Nunito',
    marginTop: '20px',
  },
);

export const StyledLastPageIcon = styled('div')(
  {
    fontSize: '2rem',
    padding: '10px',
    cursor: 'pointer',
    color: '#5C6269',
  },
);

export const StyledDialogEditText = styled(Typography)(
  {
    fontFamily: 'Nunito',
    marginTop: '20px',
  },
);
export const StyledSaveEditButton = styled(Button)(
  {
    backgroundColor: '#1871e8',
    color: 'white',
    border: '1px solid #87898c',
    height: '2.5rem',
    fontFamily: 'Nunito',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1871e8',
      color: 'white',
    },
  },
);

export const StyledCancelButton = styled(StyledSaveEditButton)(
  {
    backgroundColor: 'white',
    color: '#5C6269',
    border: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: '#5C6269',
    },
  },
);

export const StyledDialogActions = styled(DialogActions)(
  {
    display: 'flex',
    alignItems: 'right',
    height: '64px',
    margin: 0,
    marginTop: 'auto',
  },
);

export const StyledQuantitySelect = styled(Select)(
  {
    width: '100%',
    boxShadow: 'none',
    outline: 'none',
    // padding: '5px',
    // borderRadius: '1px',
    fontFamily: 'Nunito',
    fontSize: '1rem',
    color: '#5C6269',
    '&:focus': {
      outline: 'none',
      color: '#5C6269',
    },
  },
);

export const StyledQuantityMenuItem = styled(MenuItem)(
  {
    fontFamily: 'Nunito',
    fontSize: '1rem',
    color: '#5C6269',
  },
);

export const StyledTextInput = styled(TextField)(
  {
    marginBottom: '20px',
  },
);

export const DescriptionContainer = styled('div')({
  position: 'relative',
});

export const DescriptionCountDisplay = styled('div')({
  position: 'absolute',
  bottom: '30px',
  right: '10px',
  fontFamily: 'Nunito',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: '0px',
});
