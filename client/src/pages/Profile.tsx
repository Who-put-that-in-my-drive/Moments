import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem
} from '@chakra-ui/react';

export const Profile = () => {
    return (
        <Container maxW='40rem' ml='4rem'>
            <Box borderTopWidth='40px' borderColor="#FFFFFF">
                <Wrap spacing='30px'>
                    <WrapItem>
                        <Avatar size='xl' src="https://bit.ly/broken-link" />
                    </WrapItem>
                    <Stack>
                        <Heading as='h1' size='2xl'>Leandra Budau</Heading>
                        <Heading as='h2' size='md'>@leandra_budau</Heading>
                    </Stack>
                </Wrap>
                <FormControl>
                    <Box borderLeftWidth='130px' borderColor="#FFFFFF">
                        <VStack align='left' spacing='0.75rem'>
                            <Box color='white' borderBottomWidth='2px'>
                                <Text fontSize='xl' color='#000000' as='b'>User Info</Text>
                            </Box>
                            <HStack spacing='50px'>
                                <div>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder='Leandra' type='text' />
                                </div>
                                <div>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder='Budau' type='text' />
                                </div>
                            </HStack>
                            <div>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder='leandra_budau' type='text' />
                            </div>
                            <div>
                                <FormLabel>Email Address</FormLabel>
                                <Input placeholder='leandrabudau123@gmail.com' type='text' />
                            </div>
                            <Box color='white' borderBottomWidth='2px' mt='2rem'>
                                <Text fontSize='xl' color='#000000' as='b'>Profile Picture</Text>
                            </Box>
                            <HStack spacing='40px'>
                                <Avatar size='xl' src="https://bit.ly/broken-link" mt='1rem' />
                                <Link color='teal.500' href='#'>
                                    Change Profile Picture
                                </Link>
                            </HStack>
                            <Center>
                                <HStack mt='5rem' spacing='2.5rem'>
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
            </Box>
        </Container>
    );
};
