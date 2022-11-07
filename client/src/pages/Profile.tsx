import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
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
} from '@chakra-ui/react';

export const Profile = () => {
    return (
        <Container maxW="40rem" ml="4rem">
            <Box borderColor="#FFFFFF" borderTopWidth="40px">
                <Wrap spacing="30px">
                    <WrapItem>
                        <Avatar size="xl" src="https://bit.ly/broken-link" />
                    </WrapItem>
                    <Stack>
                        <Heading as="h1" size="2xl">
                            Leandra Budau
                        </Heading>
                        <Heading as="h2" size="md">
                            @leandra_budau
                        </Heading>
                    </Stack>
                </Wrap>
                <FormControl>
                    <Box borderColor="#FFFFFF" borderLeftWidth="130px">
                        <VStack align="left" spacing="0.75rem">
                            <Box borderBottomWidth="2px" color="white">
                                <Text as="b" color="#000000" fontSize="xl">
                                    User Info
                                </Text>
                            </Box>
                            <HStack spacing="50px">
                                <div>
                                    <FormLabel>First Name</FormLabel>
                                    <Input placeholder="Leandra" type="text" />
                                </div>
                                <div>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input placeholder="Budau" type="text" />
                                </div>
                            </HStack>
                            <div>
                                <FormLabel>Username</FormLabel>
                                <Input placeholder="leandra_budau" type="text" />
                            </div>
                            <div>
                                <FormLabel>Email Address</FormLabel>
                                <Input placeholder="leandrabudau123@gmail.com" type="text" />
                            </div>
                            <Box borderBottomWidth="2px" color="white" pt='0.7rem'>
                                <Text as="b" color="#000000" fontSize="xl">
                                    Profile Picture
                                </Text>
                            </Box>
                            <HStack position='relative' spacing="40px">
                                <Avatar mt="1rem" size="xl" src="https://bit.ly/broken-link" />
                                <Link color='teal.500' href='#'>
                                    Change Profile Picture
                                </Link>
                                <Input
                                    accept="image/*"
                                    aria-hidden="true"
                                    left='5em'
                                    opacity='0'
                                    placeholder="test"
                                    position='absolute'
                                    type="file"
                                    width='50%'
                                />
                            </HStack>
                            <Center>
                                <HStack mt="3.5rem" spacing="2.5rem">
                                    <Button colorScheme="gray" size="sm">
                                        Cancel
                                    </Button>
                                    <Button colorScheme="teal" size="sm">
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
