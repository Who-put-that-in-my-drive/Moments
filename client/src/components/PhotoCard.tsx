interface PhotoCardProps {
    imageURL: string
    name: string
    date: string
    size: string
    format: string
}
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

export const PhotoCard = (props: PhotoCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    props.size, props.format;
    return (
        <>
            <Flex _hover={{ cursor: 'pointer' }} direction={'column'} justifyContent="center" onClick={onOpen} w="full">
                <AspectRatio ratio={16 / 9} w='15rem'>
                    <Image
                        alt={`Picture of ${props.name}`}
                        objectFit={'cover'}
                        rounded="lg"
                        src={props.imageURL}
                    />
                </AspectRatio>
                <Box>
                    <Text as='b' fontSize='xl' textAlign='left'>{props.name}</Text>
                    <Text fontSize='sm' textAlign='left'>{props.date}</Text>
                </Box>
            </Flex>
            <DrawerImageInfo imageInfo={props} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        </>
    );
};

interface DrawerImageInfoProps {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    imageInfo: PhotoCardProps
}

const DrawerImageInfo = (props: DrawerImageInfoProps) => {
    props.onOpen;
    return (
        <Drawer
            isOpen={props.isOpen}
            onClose={props.onClose}
            placement='right'
            size='md'
        >
            <DrawerOverlay />
            <DrawerContent background='gray.100'>
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
                    <TableContainer background={'white'} marginTop='2rem' width='100%'>
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