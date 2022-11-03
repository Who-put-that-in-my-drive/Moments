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
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useStore from '../store/store';
import { useState } from 'react';
import {getServerUrl} from '../utils/WebsiteUtils';

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
        try {
            const response: any = await login(data.email, data.password);
            if (response.data.msg === 'Signed In') {
                reset();
                store.setLoggedIn(true);
                setIsLoading(false);
                navigate('/dashboard');
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
        <Center marginTop={['5rem', '7rem', '0', '0']} h={'100vh'} padding={['0rem', '0.5rem', '3rem', '5rem']}>
            <ScaleFade initialScale={0.9} in>
                <Box borderRadius='lg' boxShadow='2xl' >
                    <Flex direction={{ base: 'column', sm: 'row' }} >
                        <Flex flex={1}>
                            <Image
                                w={'100%'}
                                bg={colorMode === 'light' ? 'gray.700' : 'gray.100'}
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
                    </Flex>
                </Box >
            </ScaleFade>
        </Center>
    );
};
