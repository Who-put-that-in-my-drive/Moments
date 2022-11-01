import {
    Button,
    Container,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/react';
import Beach from '../assets/images/Beach.jpg';


export default function Post() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (

        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='full'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            <Image src={Beach}/>
                            This is the container.
                        </Container>
                    </ModalBody>
                </ModalContent>
            </Modal>    
        </>
    );
}