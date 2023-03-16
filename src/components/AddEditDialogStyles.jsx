// import React from 'react'; // eslint-disable-line no-unused-vars';
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

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // width: '100%',
  height: '63px',
  margin: 0,
  backgroundColor: '#FAFAFA',
  borderBottom: '1px solid',
  borderColor: theme.palette.border.main,
  padding: 0,
  paddingRight: '20px',
  paddingLeft: '30px',
  color: theme.palette.common.lightGreyBlue,
  fontFamily: theme.typography.secondary,
}));

export const StyledDialogContent = styled(DialogContent)(
  {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '30px',
    marginTop: '20px',
  },
);

export const StyledLastPageIcon = styled('div')(({ theme }) => ({
  fontSize: '2rem',
  padding: '10px',
  cursor: 'pointer',
  color: theme.palette.common.lightGreyBlue,
}
));

export const StyledDialogEditText = styled(Typography)(
  {
    marginTop: '20px',
  },
);
export const StyledSaveEditButton = styled(Button)(({ theme }) => (
  {
    backgroundColor: theme.palette.button.main,
    color: 'white',
    border: '1px solid #87898c',
    height: '2.5rem',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.button.main,
      color: 'white',
    },
  }
));

export const StyledCancelButton = styled(StyledSaveEditButton)(({ theme }) => (
  {
    backgroundColor: 'white',
    color: theme.palette.common.lightGreyBlue,
    border: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.common.lightGreyBlue,
    },
  }
));

export const StyledDialogActions = styled(DialogActions)(
  {
    display: 'flex',
    alignItems: 'right',
    height: '64px',
    margin: 0,
    marginTop: 'auto',
  },
);

export const StyledQuantitySelect = styled(Select)(({ theme }) => (
  {
    width: '100%',
    boxShadow: 'none',
    outline: 'none',
    fontSize: '1rem',
    color: theme.palette.common.lightGreyBlue,
    '&:focus': {
      outline: 'none',
      color: theme.palette.common.lightGreyBlue,
    },
  }
));

export const StyledQuantityMenuItem = styled(MenuItem)(({ theme }) => (
  {
    fontSize: '1rem',
    fontFamily: theme.typography.primary,
    color: theme.palette.common.lightGreyBlue,
  }
));

export const StyledTextInput = styled(TextField)(
  {
    marginBottom: '20px',
  },
);

export const DescriptionContainer = styled('div')({
  position: 'relative',
});

export const DescriptionCountDisplay = styled('div')(({
  position: 'absolute',
  bottom: '30px',
  right: '10px',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: '0px',
  display: 'flex',
}));
