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
} from '@chakra-ui/react';

// eslint-disable-next-line no-unused-vars
import { CollectionProps } from '../utils/ComponentPropTypes';

export const Collection = ({isOpen, onClose, onOpen, images, collectionName, numberOfItems}: CollectionProps) => {
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
            <Flex onClick={onOpen} w='full'>
                <AspectRatio boxShadow='dark-lg' minW='15rem'  ratio={16 / 9}>
                    <Image
                        alt={`Picture of ${collectionName}`}
                        objectFit={'cover'}
                        rounded="lg"
                        src={images[0]}

                    />
                </AspectRatio>
                <Box>
                    <Text as='b' fontSize='xl' textAlign='left'>{collectionName}</Text>
                    <Text fontSize='sm' textAlign='left'>{numberOfItems}</Text>
                </Box>
            </Flex>
        </>
    );
};