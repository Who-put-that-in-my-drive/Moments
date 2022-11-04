import {
    Avatar,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Stack,
    Input,
    Heading,
} from '@chakra-ui/react';

export const Profile = () => {
    return (
        <>
            <Container maxW='40rem' ml='1.5rem'>
                <Avatar src="https://bit.ly/broken-link" />
                <Stack>
                    <Heading as='h1' size='2xl'>Leandra Budau</Heading>
                    <Heading as='h2' size='md'>@leandra_budau</Heading>
                </Stack>
                <FormControl>
                    <HStack>
                        <div><FormLabel>First Name</FormLabel>
                            <Input value='Leandra' type='text' />
                        </div>
                        <div>
                            <FormLabel>Last Name</FormLabel>
                            <Input value='Budau' type='text' />
                        </div>
                    </HStack>
                    <FormLabel>Username</FormLabel>
                    <Input value='leandra_budau' type='text' />
                    <FormLabel>Email Address</FormLabel>
                    <Input value='leandrabudau123@gmail.com' type='text' />
                </FormControl>
            </Container >
        </>

    );
};
