import {
    Avatar,
    Button,
    Flex,
    Grid,
    GridItem, 
    HStack,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    Spacer,
    Stat,
    StatLabel,
    Text,
    Tag,
    VStack,
    useColorMode,
    useDisclosure,
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
                    <ModalHeader>Beach Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid  
                            h='500px'
                            templateRows='repeat(2, 1fr)'
                            templateColumns='repeat(5, 1fr)'
                            gap={4}
                        >
                            <GridItem colSpan={2} bg='papayawhip'>
                                <Image src={Beach} />
                            </GridItem>
                            <Flex 
                                height={'100%'}
                                bg={colorMode === 'light' ? 'gray.700' : 'gray.100'} 
                                borderRadius={'lg'}
                                padding = {'2.5'}>
                                <VStack spacing={5}>
                                    <Avatar size={'lg'} src='https://bit.ly/broken-link' />
                                    <Stat>
                                        <StatLabel 
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'lg'}
                                        >
                                            @jameskibi12
                                        </StatLabel>
                                        <Spacer />
                                        <Spacer />
                                        <HStack>
                                            <CalendarIcon color={colorMode === 'light' ? 'white' : 'black'}/>
                                            <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                                Date and Time Taken
                                            </Text>
                                        </HStack>
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            11:34 AM; Tuesday, May 4th, 2019
                                        </StatLabel>
                                        <Spacer />
                                        <HStack>
                                            <ChatIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                                Caption
                                            </Text>
                                        </HStack>
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            This is the caption!
                                        </StatLabel>
                                        <HStack>
                                            <InfoIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                                Picture Info
                                            </Text>
                                        </HStack>
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            Size: 30.69 MB
                                        </StatLabel>
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            Posted: Sunday, May 9th, 2019
                                        </StatLabel>
                                        <HStack>
                                            <SunIcon color={colorMode === 'light' ? 'white' : 'black'} />
                                            <Text color={colorMode === 'light' ? 'white' : 'black'}>
                                                Tags
                                            </Text>
                                        </HStack>
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            Theme
                                        </StatLabel>
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
                                        <HStack />
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
                                        <StatLabel
                                            color={colorMode === 'light' ? 'white' : 'black'}
                                            fontSize={'sm'}
                                        >
                                            Categories
                                        </StatLabel>
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
                                    </Stat>
                                </VStack>
                            </Flex>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>    
        </>
    );
}