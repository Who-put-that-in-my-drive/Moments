import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Box,
    FormLabel,
    FormControl,
} from '@chakra-ui/react';

export const UploadModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}> 
                <ModalOverlay />
                
                <ModalContent>
                    <ModalHeader>Upload Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <form action="">
                            <Box>   
                                <FormControl>
                                </FormControl>
                            </Box>


                            <FormControl isRequired mb={3}>
                                <FormLabel>Title</FormLabel>
                                <Input></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Caption</FormLabel>
                                <Input></Input>
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Upload
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadModal;