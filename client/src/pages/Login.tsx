import {
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    Input,
    Link,
    ScaleFade,
    Stack,
    Text,
    useColorMode
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo_transparent.png';
import useStore from '../store/store';
import { getServerUrl } from '../utils/WebsiteUtils';

type LoginFormValues = {
    email: string
    password: string
};

export default function Login() {
    const navigate = useNavigate();
    const store = useStore();
    const { colorMode } = useColorMode();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm<LoginFormValues>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data: LoginFormValues) => {
        // console.log(data);
        try {
            const response: any = await login(data.email, data.password);
            if (response) {
                reset();
                store.setUser(response.data.data.user);
                store.setLoggedIn(true);
                setIsLoading(false);
                navigate('/dashboard/home');
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.response.data.msg === 'Incorrect Password') {
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
        }
    };


    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        const userData = { email: email, password: password };
        const URL = getServerUrl();
        return await axios.post(URL + '/api/auth/login', userData);
    };

    const minPassLength: number = 5;

    return (
        <Center h={'100vh'} marginTop={['5rem', '7rem', '0', '0']} padding={['0rem', '0.5rem', '3rem', '5rem']}>
            <ScaleFade in initialScale={0.9}>
                <Box borderRadius='lg' boxShadow='2xl' >
                    <Flex direction={{ base: 'column', sm: 'row' }} >
                        <Flex flex={1}>
                            <Image
                                alt={'Login Image'}
                                bg={colorMode === 'light' ? 'gray.700' : 'gray.100'}
                                objectFit={'cover'}
                                src={logo}
                                w={'100%'}
                            />
                        </Flex>
                        <Flex align={'center'} flex={1} justify={'center'} p={5}>
                            <form onSubmit={handleSubmit(handleSubmitForm)} style={{ width: '80%' }}>
                                <Stack spacing={4} w={'full'} >
                                    <Heading fontSize={'4xl'} marginY={'2rem'} textAlign={'center'}>Sign in</Heading>

                                    <FormControl isInvalid={Boolean(errors.email)} margin={'1rem'}>
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
                                            align={'start'}
                                            direction={{ base: 'column', sm: 'row' }}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <Link color={'blue.500'}>Forgot password?</Link>
                                        </Stack>
                                        <Center>
                                            <Button colorScheme={'blue'} isLoading={isLoading} loadingText='Logging in...' shadow={'xl'} type='submit' variant={'solid'} width={'80%'}>
                                                Sign in
                                            </Button>
                                        </Center>
                                        <Text
                                            // paddingBottom={'1rem'}
                                            fontSize='md'
                                            textAlign={'center'}>Don’t have an account? <Link as={ReactLink} color={'blue.500'} to='/register'>Sign Up</Link></Text>
                                    </Stack>
                                </Stack>
                            </form>
                        </Flex>
                    </Flex>
                </Box >
            </ScaleFade>
        </Center>
    );
}
