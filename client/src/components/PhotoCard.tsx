import {
    AspectRatio,
    Badge,
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
    useColorMode,
    useDisclosure
} from '@chakra-ui/react';
// eslint-disable-next-line
import { DrawerImageInfoProps, PhotoCardProps } from '../utils/ComponentPropTypes';

export const PhotoCard = (props: PhotoCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    props.size, props.format;
    return (
        <>
            <Flex _hover={{ cursor: 'pointer' }} direction={'column'} justifyContent="center" minW='15rem' onClick={onOpen} w="full">
                <AspectRatio ratio={16 / 9} w='15rem'>
                    <Image
                        alt={`Picture of ${props.name}`}
                        objectFit={'cover'}
                        rounded="lg"
                        src={props.imageURL}
                    />
                </AspectRatio>
                <Box>
                    <Text as='b' fontSize='xl' noOfLines={1} textAlign='left'>{props.name}</Text>
                    <Text fontSize='sm' textAlign='left'>{props.date}</Text>
                </Box>
            </Flex>
            <DrawerImageInfo imageInfo={props} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    );
};



const DrawerImageInfo = (props: DrawerImageInfoProps) => {
    const { colorMode } = useColorMode();
    props.onOpen;
    return (
        <Drawer
            isOpen={props.isOpen}
            onClose={props.onClose}
            placement='right'
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <Flex align='center' alignContent='center' direction={'column'} justifyContent='space-between' paddingTop='5rem' paddingX={'1.5rem'} w="full">
                    <AspectRatio ratio={16 / 9} w='100%'>
                        <Image
                            alt={`Picture of ${props.imageInfo.name}`}
                            rounded="lg"
                            src={props.imageInfo.imageURL}
                        />
                    </AspectRatio>
                    <Box>
                        <Text as='b' fontSize='2xl' textAlign='left'>{props.imageInfo.name}</Text>
                    </Box>
                    <TableContainer marginTop='2rem' rounded={'lg'} width='100%'>
                        <Table background={colorMode === 'dark' ? 'gray.600' : 'gray.50'} variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Information</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Title</Td>
                                    <Td noOfLines={1}>{props.imageInfo.name}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Size</Td>
                                    <Td maxW={'100%'}>{props.imageInfo.size}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Format</Td>
                                    <Td><Badge>{props.imageInfo.format}</Badge></Td>
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