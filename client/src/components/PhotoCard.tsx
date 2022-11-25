import {
    AspectRatio,
    Badge,
    Box,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex, Image,
    Skeleton,
    Table,
    TableContainer,
    Tag,
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
            <Skeleton fadeDuration={2} isLoaded={props.isLoaded}>
                <Flex _hover={{ cursor: 'pointer' }} direction={'column'} justifyContent="center" minW='15rem' onClick={onOpen} w="full">
                    <AspectRatio ratio={16 / 9} w='15rem'>
                        <Image
                            alt={`Picture of ${props.title}`}
                            objectFit={'cover'}
                            rounded="lg"
                            src={props.imageURL}
                        />
                    </AspectRatio>
                    <Box>
                        <Text as='b' fontSize='xl' noOfLines={1} textAlign='left'>{props.title}</Text>
                        <Text fontSize='sm' textAlign='left'>{props.date}</Text>
                    </Box>
                </Flex>
                <DrawerImageInfo imageInfo={props} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Skeleton>
        </>
    );
};



const DrawerImageInfo = (props: DrawerImageInfoProps) => {
    const { colorMode } = useColorMode();
    const convertStringToTag = (tagString: string) => {
        let tags: string[] = [];
        if (tagString.length > 0) {
            tags = tagString.toString().split(',');
        }
        return tags;
    };
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
                            alt={`Picture of ${props.imageInfo.title}`}
                            rounded="lg"
                            src={props.imageInfo.imageURL}
                        />
                    </AspectRatio>
                    <Box paddingY={5}>
                        <Text as='b' fontSize='2xl' textAlign='left'>{props.imageInfo.title}</Text>
                    </Box>
                    <TableContainer marginTop='1rem' rounded={'lg'} whiteSpace={'unset'} width='100%'>
                        <Table background={colorMode === 'dark' ? 'gray.600' : 'gray.50'} variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Information</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td >Title</Td>
                                    <Td>{props.imageInfo.title}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Caption</Td>
                                    <Td>{props.imageInfo.caption}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Size</Td>
                                    <Td>{props.imageInfo.size}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Tags</Td>
                                    <Td>{props.imageInfo.tags.length > 0 ?
                                        convertStringToTag(props.imageInfo.tags)?.map((tag, i) => {
                                            return <Tag colorScheme='blue' key={i} mr={1}>{tag}</Tag>;
                                        }) : <Tag>No tags added</Tag>}</Td>
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
        </Drawer >
    );
};