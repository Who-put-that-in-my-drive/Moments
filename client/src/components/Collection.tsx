import {
    AspectRatio,
    Box, Button,
    Flex,
    Image,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,

} from '@chakra-ui/react';

// eslint-disable-next-line no-unused-vars
import { CollectionProps } from '../utils/ComponentPropTypes';

export const Collection = ({images, collectionName}: CollectionProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={['xl', '2xl', '3xl', '5xl']}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{collectionName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Test
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex direction={'column'} justifyContent="center" marginLeft={'0.8'}>
                <AspectRatio minW='15rem'  ratio={16 / 9}>
                    <Image
                        _hover={{ cursor: 'pointer' }}
                        alt={`Collection thumbnail for ${collectionName}`}
                        boxShadow='dark-lg'
                        objectFit={'cover'}
                        onClick={onOpen}
                        rounded="lg"
                        src={images[0]}
                    />
                </AspectRatio>
                <Box marginTop='1.1rem'>
                    <Text fontSize='xl' textAlign='center'>{<b>{collectionName}</b>}</Text>
                    <Text fontSize='sm' textAlign='center'>{images.length} items</Text>
                </Box>
            </Flex>
        </>
    );
};