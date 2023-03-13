import { useState, useContext } from 'react';
// import { Modal } from '../Modal/Modal';
// import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Box, Button, styled, Typography } from '@mui/material';
import { AppContext } from '../AppContext';
import { AddEditItemFormMu } from './AddEditItemFormMu';;

// height: 240px;
// width: 410px;
// left: 0px;
// top: 0px;
// border-radius: 4px;

// const useStyles = makeStyles((theme) => ({
//     box: {
//         height: '240px',
//         // width: '410px',
//         display: 'flex-root',
//         flexDirection: 'column',
//         // justifyItems: 'center',
//         borderRadius: '4px',
//         fontFamily :"Nunito, sans-serif",
//         width: '40%',
//         margin: 'auto',
//         minHeight: '10vh',
//         border: '1px solid #c6c6c6',
//         marginTop: '5%',
//     },
//     content: {
//         textAlign: 'center',
//         margin: 'auto',
//         marginTop: '10%',
//         color: '#87898c',
//         fontSize: '1.2rem',
//         fontWeight: 'bold',
//     },
    
//     button: {
//         // marginTop: '10px',
//         backgroundColor: '#1871e8',
//         color: 'white',
//         border: '1px solid #87898c',

//     }
// }))

const StyledBox = styled(Box)({
    height: '240px',
    display: 'flex-root',
    flexDirection: 'column',
    borderRadius: '4px',
    width: '40%',
    margin: '0 auto',
    minHeight: '10vh',
    border: '1px solid #c6c6c6',
    marginTop: '5%',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
})

const StyledHeader = styled(Typography)({
    fontSize: "18px",
    lineHeight: "24px",
    color: "#87898c",
})

const StyledButton = styled(Button)({
    backgroundColor: '#1871e8',
    color: 'white',
    border: '1px solid #87898c',
    width: '30%',
    margin: 'auto',
})


export function EmptyShoppingListMu () {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const { addItem } = useContext(AppContext);

    return (
            <StyledBox>
                <StyledHeader variant='h5' >{'Your shopping list is empty :( '}</StyledHeader>
                    <StyledButton 
                    fullWidth={false}
                    onClick={() =>setShowAddItemModal(!showAddItemModal)} > Add your first item </StyledButton>
            <AddEditItemFormMu
                showAddItemModal={showAddItemModal}
                setShowAddItemModal={setShowAddItemModal}
                submitAction={addItem}
                />
                </StyledBox>
    )
}
