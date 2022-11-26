import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Spacer,
    Stack,
    Tag,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';


import {CalendarIcon, ChatIcon, DeleteIcon, EditIcon, InfoIcon, PlusSquareIcon, SunIcon,} from '@chakra-ui/icons';

export default function Post() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalContent>
                    {/* <ModalHeader>Beach Image</ModalHeader> */}
                    <ModalCloseButton color={'gray.100'} size={'xl'}/>
                    <ModalBody>
                        <Stack direction="row" spacing={-8}>
                            <Box p={5} w="70%">
                                <Image
                                    borderRadius={'lg'}
                                    maxHeight="92vh"
                                    minHeight="92vh"
                                    src={''}
                                />
                            </Box>

                            <Box p={5} w="30%">
                                <Flex
                                    bg="white"
                                    borderRadius={'lg'}
                                    maxHeight="92vh"
                                    minHeight="90vh"
                                    overflowY="scroll"
                                    textColor="black"
                                >
                                    <VStack
                                        alignItems={'flex-start'}
                                        bg="white"
                                        marginBottom="5"
                                        marginLeft="25"
                                        marginTop="5"
                                        spacing={5}
                                    >
                                        <Avatar size={'lg'} src="https://bit.ly/broken-link"/>
                                        <Text
                                            fontSize={'2xl'}
                                        >
                                            <b>@jameskibi12a</b>
                                        </Text>
                                        <HStack padding={'-5'}>
                                            <CalendarIcon
                                            />
                                            <Text
                                                as={'b'}
                                                textAlign={'start'}
                                            >
                                                Date and Time Taken
                                            </Text>
                                        </HStack>
                                        <Text>
                                            11:34 AM; Tuesday, May 4th, 2019
                                        </Text>
                                        <HStack>
                                            <ChatIcon
                                            />
                                            <Text
                                                as={'b'}
                                            >
                                                Caption
                                            </Text>
                                        </HStack>
                                        <Text>
                                            This is a beach I visited a few years ago!
                                        </Text>
                                        <HStack>
                                            <InfoIcon
                                            />
                                            <Text
                                                as={'b'}
                                            >
                                                Picture Info
                                            </Text>
                                        </HStack>

                                        <Text>
                                            Size: 30.69 MB Posted: May 9th, 2019
                                        </Text>
                                        <HStack>
                                            <SunIcon
                                            />
                                            <Text
                                                as={'b'}
                                            >
                                                Tags
                                            </Text>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Beach
                                            </Tag>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Clouds
                                            </Tag>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Nature
                                            </Tag>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Dark
                                            </Tag>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Mountain
                                            </Tag>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Natural
                                            </Tag>
                                            <Tag
                                                colorScheme={'teal'}
                                                key={'sm'}
                                                size={'sm'}
                                                variant={'solid'}
                                            >
                                                Waves
                                            </Tag>
                                        </HStack>
                                        <ButtonGroup bottom={0} spacing={'2rem'} variant={'solid'}>
                                            <IconButton
                                                aria-label="Share"
                                                icon={<PlusSquareIcon/>}
                                                size="lg"
                                            />
                                            <IconButton
                                                aria-label="Edit"
                                                icon={<EditIcon/>}
                                                size="lg"
                                            />
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<DeleteIcon/>}
                                                size="lg"
                                            />
                                        </ButtonGroup>
                                        <Spacer/>
                                    </VStack>
                                </Flex>
                            </Box>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
