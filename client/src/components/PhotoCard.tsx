import { BsThreeDotsVertical } from 'react-icons/bs';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AspectRatio,
    Badge,
    Box,
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Editable,
    EditableInput,
    EditablePreview,
    Flex, IconButton, Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
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
// import { saveAs } from 'file-saver';
// eslint-disable-next-line
import { DeleteImageDialogProps, DrawerImageInfoProps, PhotoCardProps } from '../utils/ComponentPropTypes';
import React from 'react';
import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
export const PhotoCard = (props: PhotoCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Skeleton fadeDuration={2} isLoaded={props.isLoaded}>
                <Flex direction={'column'} justifyContent='center' minW='15rem' w='full'>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            _hover={{ cursor: 'pointer' }}
                            alt={`Picture of ${props.title}`}
                            objectFit={'cover'}
                            onClick={onOpen}
                            rounded='lg'
                            src={props.imageURL}
                            transition='.2s'
                        />
                    </AspectRatio>
                    <Flex align={'center'} justifyContent='space-between'>
                        <Box paddingLeft='1' paddingTop='2'>
                            <Text as='b' fontSize='xl' noOfLines={1} textAlign='left'>{props.title}</Text>
                            <Text fontSize='sm' textAlign='left'>{props.date}</Text>
                        </Box>
                        <Menu>
                            <MenuButton
                                aria-label='Options'
                                as={IconButton}
                                icon={<BsThreeDotsVertical />}
                            />
                            <MenuList>
                                <MenuItem icon={<DownloadIcon />} >
                                    {/* href={props.imageURL} target='_blank' download={props.title} */}
                                    <Link >
                                        Download
                                    </Link>
                                </MenuItem>
                                <DeleteImageDialog deleteImageCallback={props.deleteImageCallback} imageId={props.id} />
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                <DrawerImageInfo imageInfo={props} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Skeleton>
        </>
    );
};



const DeleteImageDialog = (props: DeleteImageDialogProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    return (
        <>
            <MenuItem color='red' icon={<DeleteIcon />} onClick={onOpen}>
                Delete
            </MenuItem>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Image
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='red' ml={3} onClick={() => { props.deleteImageCallback(props.imageId); onClose(); }} type='submit'>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
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
            <DrawerContent overflowY='auto' >
                <DrawerCloseButton />
                <Flex align='center' alignContent='center' direction={'column'} justifyContent='space-between' marginBottom={['1rem', '1rem', '1rem', '1rem']} paddingTop='5rem' paddingX={'1.5rem'} w='full'>
                    <AspectRatio ratio={16 / 9} w='100%'>
                        <Image
                            alt={props.imageInfo.title}
                            src={props.imageInfo.imageURL}
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    </AspectRatio>
                    <Box paddingY={5}>
                        <Text as='b' fontSize='2xl' textAlign='left'>{props.imageInfo.title}</Text>
                    </Box>
                    <TableContainer marginTop='1rem' rounded={'lg'} whiteSpace={'unset'} width='100%'>
                        <Table background={colorMode === 'dark' ? 'gray.600' : 'gray.50'} variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th fontSize={'sm'}>Information</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td >Title</Td>
                                    <Td>
                                        <Editable defaultValue={props.imageInfo.title}>
                                            <EditablePreview />
                                            <EditableInput />
                                        </Editable>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Caption</Td>
                                    <Td>
                                        <Editable defaultValue={props.imageInfo.caption}>
                                            <EditablePreview />
                                            <EditableInput />
                                        </Editable>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Location</Td>
                                    <Td>
                                        <Editable defaultValue={props.imageInfo.location.length <= 0 ?
                                            'No location provided' : props.imageInfo.location}>
                                            <EditablePreview />
                                            <EditableInput />
                                        </Editable>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Tags</Td>
                                    <Td>
                                        {props.imageInfo.tags.length > 0 ?
                                            convertStringToTag(props.imageInfo.tags)?.map((tag, i) => {
                                                return <Tag colorScheme='blue' key={i} mr={1} my={1}>{tag}</Tag>;
                                            }) : <Tag>No tags added</Tag>}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Size</Td>
                                    <Td>{props.imageInfo.size}</Td>
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