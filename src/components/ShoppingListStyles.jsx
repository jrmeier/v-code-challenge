import {
  Box,
  Button,
  ListItem,
  styled,
  Typography,
} from '@mui/material';

export const ListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  width: '60%',
  margin: '0 auto',
  marginTop: '20px',
  backgroundColor: 'white',
  color: theme.palette.common.lightGrey,
  fontFamily: 'Dosis',
}));

export const StyledListTitle = styled(Typography)({
  fontSize: '18px',
  lineHeight: '24px',
  color: '#000000',
  textAlign: 'left',
});

export const StyledListItemPrimary = styled(Typography)({
  fontSize: '16px',
  color: '#000000',
  fontWeight: '600',
  lineHeight: '20px',
  textAlign: 'left',
});

export const StyledListItemPrimaryStrike = styled(StyledListItemPrimary)({
  textDecoration: 'line-through',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  padding: '0',
});

export const StyledListItemSecondaryStrike = styled(Typography)({
  textDecoration: 'line-through',
  fontSize: '16px',
  padding: 0,
  margin: 0,
  lineHeight: '20px',
});

export const StyledAddItemButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#1871e8',
  color: 'white',
  border: '1px solid',
  borderColor: theme.palette.common.lightGrey,
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center',

  '&:hover': {
    backgroundColor: '#1871e8',
    color: 'white',
  },
}));

export const StyledAddItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingTop: '10px',
});

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: '0.5px solid #D5DFE9',
  borderRadius: '4px',
  '&:hover': {
    background: '#D5DFE9',
  },
  '&:focus': {
    background: '#D5DFE9',
    border: 'inherit',
  },

  marginBottom: '10px',
});
