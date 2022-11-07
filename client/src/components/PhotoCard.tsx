
import {
    AspectRatio,
    Box,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex, Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react';
// eslint-disable-next-line
import { DrawerImageInfoProps, PhotoCardProps } from '../utils/ComponentPropTypes';

export const PhotoCard = (props: PhotoCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    props.size, props.format;
    return (
        <>
            <Flex _hover={{ cursor: 'pointer' }} direction={'column'} w="full" justifyContent="center" onClick={onOpen}>
                <AspectRatio w='15rem' ratio={16 / 9}>
                    <Image
                        src={props.imageURL}
                        alt={`Picture of ${props.name}`}
                        rounded="lg"
                        objectFit={'cover'}
                    />
                </AspectRatio>
                <Box>
                    <Text fontSize='xl' as='b' textAlign='left'>{props.name}</Text>
                    <Text fontSize='sm' textAlign='left'>{props.date}</Text>
                </Box>
            </Flex>
            <DrawerImageInfo onOpen={onOpen} isOpen={isOpen} onClose={onClose} imageInfo={props} />
        </>
    );
};



const DrawerImageInfo = (props: DrawerImageInfoProps) => {
    props.onOpen;
    return (
        <Drawer
            isOpen={props.isOpen}
            placement='right'
            onClose={props.onClose}
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent background='gray.100'>
                <DrawerCloseButton />
                <Flex paddingX={'1.5rem'} align='center' paddingTop='5rem' direction={'column'} w="full" alignContent='center' justifyContent='space-between'>
                    <AspectRatio w='100%' ratio={16 / 9}>
                        <Image
                            src={props.imageInfo.imageURL}
                            alt={`Picture of ${props.imageInfo.name}`}
                            rounded="lg"
                        />
                    </AspectRatio>
                    <Box>
                        <Text fontSize='2xl' as='b' textAlign='left'>{props.imageInfo.name}</Text>
                    </Box>
                    <TableContainer width='100%' marginTop='2rem' background={'white'}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Information</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Title</Td>
                                    <Td>{props.imageInfo.name}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Size</Td>
                                    <Td>{props.imageInfo.size}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Format</Td>
                                    <Td>{props.imageInfo.format}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Uploaded</Td>
                                    <Td>{props.imageInfo.date}</Td>
                                </Tr>
                            </Tbody>

                        </Table>
                    </TableContainer>
                </Flex>

            </DrawerContent>
        </Drawer>
    );
};