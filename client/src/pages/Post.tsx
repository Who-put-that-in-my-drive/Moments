import {
    
    Button,
   
  
    Image,
    Modal,
    // ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  
    useColorMode,
    VStack,
    Avatar,
    StatLabel,
    Stat,
    useDisclosure,
    Stack,
    Box,
    Text,
    Flex,
    HStack,
    Tag,
    Spacer
} from '@chakra-ui/react';
import {
    CalendarIcon,
    ChatIcon,
    InfoIcon,
    SunIcon,
} from '@chakra-ui/icons';
import Beach from '../assets/images/Beach.jpg';

export default function Post() {
    const { colorMode } = useColorMode();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='full'>
                <ModalContent>
                    {/* <ModalHeader>Beach Image</ModalHeader> */}
                    <ModalCloseButton color={'gray.100'} size={'xl'}/>
                    <ModalBody>    
                        <Stack spacing={-8} direction='row' >
                            <Box p={5} w='70%' >
                                <Image src={Beach} borderRadius={'lg'} maxHeight="90vh" minHeight="90vh"/>
                            </Box>
                            
                            <Box p={5} w='30%'  >
                                <Flex bg='white' borderRadius={'lg'} textColor="black" overflowY='scroll' maxHeight="90vh" minHeight="90vh" >
                                    <VStack spacing={5} alignItems={'flex-start'} marginLeft="25" marginTop="5" bg='white'> 
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

                                        <Spacer />
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