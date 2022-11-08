import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Link,
    HStack,
    Input,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
    Flex,
} from '@chakra-ui/react';
import useStore from '../store/store';

export const Profile = () => {
    const store = useStore();
    const user = store.user;
    return (
        <>
            <Flex direction={'column'} padding={['1rem', '3rem', '4rem', '5rem']} paddingX={['1rem', '2rem', '3rem', '7rem']} scrollBehavior={'auto'}>
                <Wrap paddingBottom={'1rem'} spacing='2rem'>
                    <WrapItem>
                        <Avatar size='xl' src='https://bit.ly/broken-link' />
                    </WrapItem>
                    <Stack>
                        <Heading as='h1' size='2xl'>
                            {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1,)}
                        </Heading>
                        <Heading as='h2' colorScheme={'gray'} size='md'>
                            {'@' + user.displayName}
                        </Heading>
                    </Stack>
                </Wrap>
                <FormControl>
                    <Box>
                        <VStack align='left' spacing={'1rem'} >
                            <Box borderBottomWidth='2px'>
                                <Text as='b' fontSize='xl'>
                                    User Info
                                </Text>
                            </Box>
                            <Flex justifyContent={'space-around'}>
                                <Box paddingRight='1rem' style={{ width: '100%' }}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder={user.firstName || 'First name'} type='text' />
                                </Box>
                                <Box paddingLeft='1rem' style={{ width: '100%' }}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder={user.lastName || 'Last name'} type='text' />
                                </Box>
                            </Flex>
                            <div>
                                <FormLabel>Username</FormLabel>
                                <Input disabled type='text' value={user.displayName} />
                            </div>
                            <div>
                                <FormLabel>Email Address</FormLabel>
                                <Input disabled type='text' value={user.email} />
                            </div>
                            <Box borderBottomWidth='2px' pt='0.7rem'>
                                <Text as='b' fontSize='xl'>
                                    Profile Picture
                                </Text>
                            </Box>
                            <HStack position='relative' spacing='2rem'>
                                <Avatar size='xl' src='https://bit.ly/broken-link' />
                                <Link color='teal.500' href='#'>
                                    Change Profile Picture
                                </Link>
                                <Input
                                    accept='image/*'
                                    aria-hidden='true'
                                    opacity='0'
                                    placeholder='test'
                                    position='absolute'
                                    type='file'
                                />
                            </HStack>
                            <Center>
                                <HStack mt='1rem' spacing='2rem'>
                                    <Button colorScheme='gray' size='sm'>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='teal' size='sm'>
                                        Save
                                    </Button>
                                </HStack>
                            </Center>
                        </VStack>
                    </Box>
                </FormControl>
            </Flex>
        </>
    );
};
