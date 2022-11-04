import {
    Avatar,
    Box,  
    Button,
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
    WrapItem} from '@chakra-ui/react';

export const Profile = () => {
    return (
        <>
            <Container maxW='40rem' ml='1.5rem'>
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
                        <Box borderLeftWidth='130px'  borderColor="#FFFFFF">
                            <VStack align='left' spacing='7px'>
                                <div>
                                    <Box color='white' borderBottomWidth='2px'>
                                        <Text fontSize='xl' color='#000000' as='b'>User Info</Text>
                                    </Box>
                                </div>
                                <div>
                                    <HStack spacing='50px'>
                                        <div>
                                            <FormLabel>First Name</FormLabel>
                                            <Input value='Leandra' type='text' />
                                        </div>
                                        <div>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input value='Budau' type='text' />
                                        </div>
                                    </HStack>
                                </div>
                                <div>
                                    <FormLabel>Username</FormLabel>
                                    <Input value='leandra_budau' type='text' />
                                </div>
                                <div>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input value='leandrabudau123@gmail.com' type='text' />
                                </div>
                                <div>
                                    <Box color='white' borderBottomWidth='2px'>
                                        <Text fontSize='xl' color='#000000' as='b'>Profile Picture</Text>
                                    </Box>
                                </div>
                                <div>
                                    <HStack spacing='40px'>
                                        <div>
                                            <Avatar size='lg' src="https://bit.ly/broken-link" />
                                        </div>
                                        <div>
                                            <Link color='teal.500' href='#'>
                                                Change Profile Picture
                                            </Link>
                                        </div>
                                    </HStack>
                                </div>
                                <div>
                                    <HStack>
                                        <div>
                                            <Button colorScheme='teal' size='sm'>
                                                Save
                                            </Button>
                                        </div>
                                        <div>
                                            <Button colorScheme='gray' size='sm'>
                                                Cancel
                                            </Button>
                                        </div>
                                    </HStack>
                                </div>
                            </VStack>
                        </Box>
                    </FormControl>
                </Box>
            </Container>
        </>

    );
};
