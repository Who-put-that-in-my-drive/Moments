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
    useColorMode,
    FormErrorMessage,
    ScaleFade
} from '@chakra-ui/react';
import logo from '../assets/images/logo_transparent.png';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useStore from '../store/store';
import { useState } from 'react';

type FormValues = {
    email: string
    password: string
};

export default function Login() {

    const store = useStore();
    const loggedIn = store.loggedIn;
    const { colorMode } = useColorMode();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = (data: FormValues) => {
        login(data.email, data.password)
            .then((res: any) => {
                if (res.data === 'Signed In') {
                    reset();
                    store.setLoggedIn(true);
                    setIsLoading(false);
                    //Redirect to Dashboard page from here
                }
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response.data === 'Incorrect Password') {
                    setError('password', {
                        message: 'Wrong password!',
                    });

                } else {
                    setError('email', {
                        message: 'Please check your credentials!',
                    });
                    setError('password', {
                        message: 'Please check your credentials!',
                    });
                }
            });
    };


    const login = (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        const userData = { email: email, password: password };
        const URL = process.env.REACT_APP_DEV_SERVER_URL;
        return axios.post(URL + '/api/auth/login', userData);

    };

    const minPassLength: number = 5;

    return (
        <Center p={'1rem'} height={'100vh'}>
            <ScaleFade initialScale={0.9} in>
                <Text>Login Status: {loggedIn ? 'True => redirect to Dashboard' : 'False'}</Text>
                <Box w={'85rem'} borderRadius='lg' boxShadow='2xl'  >
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
                        <Flex p={5} flex={1} align={'center'} justify={'center'}>
                            <form style={{ width: '80%' }} onSubmit={handleSubmit(handleSubmitForm)}>
                                <Stack spacing={4} w={'full'} >
                                    <Heading marginY={'2rem'} textAlign={'center'} fontSize={'4xl'}>Sign in</Heading>

                                    <FormControl margin={'1rem'} isInvalid={Boolean(errors.email)}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            {...register(
                                                'email',
                                                {
                                                    required: 'Please enter a valid email',
                                                })
                                            } shadow={'md'} type='email' />
                                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={Boolean(errors.password)}>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            {...register(
                                                'password',
                                                {
                                                    minLength: {
                                                        message: `Minimum of ${minPassLength} characters required`,
                                                        value: minPassLength,
                                                    },
                                                    required: 'Please enter a valid password',
                                                })} shadow={'md'} type='password' />
                                        <FormErrorMessage>
                                            {errors.password && errors.password.message}
                                        </FormErrorMessage>
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
                                            <Button isLoading={isLoading} loadingText='Logging in...' shadow={'xl'} width={'80%'} type='submit' colorScheme={'blue'} variant={'solid'}>
                                                Sign in
                                            </Button>
                                        </Center>
                                        <Text
                                            // paddingBottom={'1rem'}
                                            textAlign={'center'}
                                            fontSize='md'>Don’t have an account? <Link color={'blue.500'} as={ReactLink} to='/register'>Sign Up</Link></Text>
                                    </Stack>
                                </Stack>
                            </form>
                        </Flex>
                    </Stack>
                </Box >
            </ScaleFade>
        </Center>
    );
};
