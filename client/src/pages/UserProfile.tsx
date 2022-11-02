import {
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
} from '@chakra-ui/react';

const UserProfile = () => {
    return (
        <Container maxW='lg' ml='1.5rem'>
            <FormControl>
                <HStack spacing='1.5rem'>
                    <div><FormLabel>First Name</FormLabel>
                        <Input type='text' />
                    </div>
                    <div>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' />
                    </div>
                </HStack>
                <FormLabel>Username</FormLabel>
                <Input type='text' />
                <FormLabel>Email Address</FormLabel>
                <Input type='text' />
            </FormControl>
        </Container >
    );
};

export default UserProfile;
