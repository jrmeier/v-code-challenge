import { useState, useRef, forwardRef } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import { styled } from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({
//     dialogBox: {
//         // display: 'flex',
//         backgroundColor: 'white',
//         padding: '30px',
//         width: '410px',
//         height: '240px',
//         margin: '0 auto',
//         marginTop: '20vh',
//         background: '#FFFFFF',
//         boxShadow: '0px 4px 34px rgba(0, 0, 0, 0.5)',
//         borderRadius: '4px'

//     },
//     dialogTitle: {
//         fontSize: '18px',
//         lineHeight: '24px',
//         color: '#2A323C',
//         paddingBotton: '10px'
//     },
//     boxBody: {
//         fontFamily: 'Nunito',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: '14px',
//         lineHeight: '20px',
//         display: 'block',
//         height: '100px',
//         color: '#5C6269',
//         marginTop: '10px',
//         // backgroundColor: 'red'
//     },
//     footer: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         marginTop: '20px',
//     },
//     cancelButton: {
//         marginRight: '10px',
//         textTransform: 'none',
//     },
//     deleteButton: {
//         backgroundColor: '#1871E8',
//         color: 'white',
//         textTransform: 'none',

//         '&:hover': {
//             backgroundColor: '#1871E8',
//             color: 'white',
//             textTransform: 'none',
//         }
//     }

// }))

export const DeleteItemDialog = ({ isDialogOpen, setIsDialogOpen, deleteDialogRef }) =>{

    const classes = {}
    const handleClose = () => {
        setIsDialogOpen(false);
        deleteDialogRef.current.close()
    };

    return (
        <Dialog open={isDialogOpen} onClose={handleClose} ref={deleteDialogRef}  >
          <DialogTitle className={classes.dialogTitle}>Delete Item?</DialogTitle>
          <DialogContent ref={deleteDialogRef}>
            <DialogContentText>
            Are you sure you want to delete this item? This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.cancelButton}>Cancel</Button>
            <Button onClick={handleClose} className={classes.deleteButton}>Delete</Button>
          </DialogActions>
        </Dialog>
    )
}