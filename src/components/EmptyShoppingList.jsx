import { useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { AddEditItemFormMu } from './AddEditItemDialog';;

const StyledBox = styled(Box)({
    height: '240px',
    borderRadius: '4px',
    width: '40%',
    margin: '0 auto',
    minHeight: '10vh',
    border: '1px solid #c6c6c6',
    marginTop: '5%',
    padding: '10px',
    position: 'relative',
})

const StyledHeader = styled(Typography)({
    fontSize: "18px",
    lineHeight: "24px",
    color: "#87898c",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, calc(-50% - 3rem))',
})

export const StyledButton = styled(Button)({
    backgroundColor: '#1871e8',
    color: 'white',
    border: '1px solid #87898c',
    width: '30%',
    height: '2.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
})


export function EmptyShoppingList () {
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    return (
            <StyledBox>
                <StyledHeader variant='h5' >{'Your shopping list is empty :( '}</StyledHeader>
                    <StyledButton 
                        fullWidth={false}
                        onClick={() =>setShowAddItemModal(!showAddItemModal)}
                        > Add your first item
                    </StyledButton>
                <AddEditItemFormMu
                    showAddItemModal={showAddItemModal}
                    setShowAddItemModal={setShowAddItemModal}
                    editItemId={null}
                    setEditItemId={() =>null} //
                    />
                </StyledBox>
    )
}
