import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Link,
    Image,
    Box,
    Center,
    Text,
    useColorMode
} from '@chakra-ui/react';
import logo from '../assets/images/logo_transparent.png';
import { Link as ReactLink } from 'react-router-dom';
import { useState } from 'react';

const initialFormData = Object.freeze({
    email: '',
    password: '',
    username: ''
});

export default function Register() {
    const { colorMode } = useColorMode();

    const [formData, updateFormData] = useState(initialFormData);

    const handleFormChange = (e: any) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.id]: e.target.value.trim()
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        // ... submit to API or something
    };


    return (
        <Center height={'100vh'}>
            <Box maxW={'90vw'} borderRadius='lg' boxShadow='2xl'  >
                <Stack justify={'center'} direction={{ base: 'column', md: 'row' }} >
                    <Flex flex={1}>
                        <Image
                            bg={colorMode === 'light' ? 'gray.700' : 'gray.100'}
                            borderLeftRadius='lg'
                            alt={'Login Image'}
                            objectFit={'cover'}
                            src={logo}
                        />
                    </Flex>
                    <Flex p={8} paddingY={'3rem'} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading textAlign={'center'} fontSize={'4xl'}>Sign Up</Heading>
                            <Text
                                textAlign={'center'}
                                fontSize='md'>Existing user? <Link color={'blue.500'} as={ReactLink} to='/login'>Log in!</Link></Text>
                            <FormControl margin={'1rem'} id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input onChange={handleFormChange} shadow={'md'} type="username" />
                            </FormControl>
                            <FormControl margin={'1rem'} id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input onChange={handleFormChange} shadow={'md'} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input onChange={handleFormChange} shadow={'md'} type="password" />
                            </FormControl>
                            <FormControl id="password-reenter" isRequired>
                                <FormLabel>Re-enter Password</FormLabel>
                                <Input shadow={'md'} type="password" />
                            </FormControl>
                            <Stack textAlign={'center'} paddingY={'2rem'} spacing={10}>
                                <Center>
                                    <Button onClick={handleSubmit} shadow={'xl'} width={'80%'} type='submit' colorScheme={'blue'} variant={'solid'}>
                                        Create account
                                    </Button>
                                </Center>
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>
            </Box >
        </Center>
    );
};
