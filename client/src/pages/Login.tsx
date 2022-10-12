import {
    Button,
    Checkbox,
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
import { useEffect, useState } from 'react';

const initialFormData = Object.freeze({
    email: '',
    password: ''
});

export default function Login() {
    const { colorMode } = useColorMode();

    const [isInvalidEmail, setIsInvalidEmail] = useState(true);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedPassword, setIsTouchedPassword] = useState(false);

    const [formData, setFormData] = useState(initialFormData);

    const passwordLength: number = 5;

    useEffect(() => {
        // console.log(isInvalidEmail, isInvalidPassword);
    });


    const emailValidate = (email: string): boolean => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const passwordValidate = (password: string): boolean => {
        if (password.length > passwordLength) {
            return true;
        } else {
            return false;
        }
    };

    const handleFormChange = (e: any) => {

        if (e.target.id === 'email') {
            setIsInvalidEmail(!emailValidate(e.target.value));
        }
        if (e.target.id === 'password') {
            setIsInvalidPassword(!passwordValidate(e.target.value));
        }

        setFormData({
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
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading marginY={'2rem'} textAlign={'center'} fontSize={'4xl'}>Sign in to Moments</Heading>
                            <FormControl margin={'1rem'} id='email' isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input isInvalid={isInvalidEmail && isTouchedEmail} onClick={() => setIsTouchedEmail(true)} onChange={handleFormChange} shadow={'md'} type='email' />
                            </FormControl>
                            <FormControl id='password' isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input isInvalid={isInvalidPassword && isTouchedPassword} onClick={() => setIsTouchedPassword(true)} onChange={handleFormChange} shadow={'md'} type='password' />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.500'}>Forgot password?</Link>
                                </Stack>
                                <Center>
                                    <Button isDisabled={isInvalidEmail && isInvalidPassword} shadow={'xl'} width={'80%'} type='submit' onClick={handleSubmit} colorScheme={'blue'} variant={'solid'}>
                                        Sign in {isInvalidEmail && isInvalidPassword}
                                    </Button>
                                </Center>
                                <Text
                                    paddingBottom={'1rem'}
                                    textAlign={'center'}
                                    fontSize='md'>Don’t have an account? <Link color={'blue.500'} as={ReactLink} to='/register'>Sign Up</Link></Text>
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>
            </Box >
        </Center>
    );
};
