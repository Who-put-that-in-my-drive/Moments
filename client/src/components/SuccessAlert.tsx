import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export const SuccessAlert = (props: any) => {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    onOpen();
    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Success!</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {props.message}
                </AlertDialogBody>
                <AlertDialogFooter>

                    <Button onClick={() => { props.type === 'success' ? navigate('/login') : onClose; }} colorScheme={props.type === 'success' ? 'green' : 'red'} ml={3}>
                        {props.type === 'success' ? 'Sign in!' : 'Close'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
