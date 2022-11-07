import {
    Avatar,
    Button,
    Flex,
    Grid, 
    HStack,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Spacer,
    Stat,
    StatLabel,
    Text,
    Tag,
    VStack,
    useColorMode,
    useDisclosure,
    GridItem,
} from '@chakra-ui/react';
import {
    CalendarIcon,
    ChatIcon,
    InfoIcon,
    SunIcon,
} from '@chakra-ui/icons';
import Beach from '../assets/images/Beach.jpg';
// import AvatarPic from '../assets/images/Avatar.jpg';

export default function Post() {
    const { colorMode } = useColorMode();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (

        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='full'>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>Beach Image</ModalHeader> */}
                    <ModalCloseButton color={'gray.100'} size={'lg'}/>
                    <ModalBody>
                        <Grid>
                            <HStack>
                                <GridItem>
                                    <Image src={Beach} />
                                </GridItem>
                                <Flex
                                    sx={{
                                        'align-items': 'start',
                                        'textAlign' : 'flex-start',}}
                                    height={'100%'}
                                    bg={colorMode === 'light' ? 'gray.700' : 'gray.100'} 
                                    borderRadius={'lg'}
                                    padding = {'2.5'}>
                                    <VStack spacing={5} alignItems={'flex-start'}> 
                                        <Avatar size={'lg'} src='https://bit.ly/broken-link' />
                                        <Stat>
                                            <StatLabel 
                                                color={colorMode === 'light' ? 'white' : 'black'}
                                                fontSize={'lg'}
                                            >
                                                @jameskibi12
                                            </StatLabel>
                                        </Stat>
                                        <HStack padding={'-5'}>
                                            <CalendarIcon color={colorMode === 'light' ? 'white' : 'black'}/>
                                            <Text color={colorMode === 'light' ? 'white' : 'black'} as={'b'} textAlign={'start'}>
                                                Date and Time Taken
                                            </Text> 
                                        </HStack>
                                        <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                            11:34 AM; Tuesday, May 4th, 2019
                                        </Text> 
                                        <HStack>
                                            <ChatIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'} as={'b'}>
                                                Caption
                                            </Text>
                                        </HStack>
                                        <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                            This is a beach I visited a few years ago!
                                        </Text> 
                                        <HStack>
                                            <InfoIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'} as={'b'}>
                                                Picture Info
                                            </Text>
                                        </HStack>
                                        <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                            Size: 30.69 MB
                                            Posted: May 9th, 2019
                                        </Text>
                                        <HStack>
                                            <SunIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'} as={'b'}>
                                                Tags
                                            </Text>
                                        </HStack>
                                        <Text color={colorMode === 'light' ? 'white' : 'black'} as={'u'}>
                                                Theme
                                        </Text>
                                        <HStack spacing={2}>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Beach
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Clouds
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Nature
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Dark
                                            </Tag>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Mountain
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Natural
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                            >
                                                Waves
                                            </Tag>
                                        </HStack>
                                        <Spacer />
                                        <Text color={colorMode === 'light' ? 'white' : 'black'} as={'u'}>
                                                Categories
                                        </Text>
                                        <HStack spacing={2}>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'orange'}
                                            >
                                                Scenery
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'orange'}
                                            >
                                                Outdoors
                                            </Tag>
                                            <Tag 
                                                size={'sm'}
                                                key={'sm'}
                                                variant={'solid'}
                                                colorScheme={'orange'}
                                            >
                                                Landscape
                                            </Tag>
                                        </HStack>
                                    </VStack>
                                </Flex>
                            </HStack>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>    
        </>
    );
}