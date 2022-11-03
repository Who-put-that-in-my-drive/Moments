import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Center, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
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
                <AlertDialogCloseButton />
                <Center borderTopRadius={'md'} w='100%' h='12rem' bg='#6FCF97' color='white'>
                    <Icon as={CheckCircleIcon} w={24} h={24} />
                </Center>
                <AlertDialogBody>
                    <VStack spacing={4}>
                        <Center>
                            <Text as='b' fontSize='4xl'> {props.type === 'success' ? 'Great!' : 'Sorry!'} </Text>
                        </Center>
                        <Center>
                            <Text fontSize='lg'>
                                {props.type === 'success' ?
                                    'Your account has been created successfully.' :
                                    'Sorry something went wrong.'
                                } </Text>
                        </Center>
                    </VStack>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => { navigate('/login'); }} rightIcon={<ArrowForwardIcon />} colorScheme='gray' variant='outline'>
                        Sign In
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
