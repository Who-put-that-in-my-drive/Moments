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
    useColorMode,
    FormErrorMessage,
    ScaleFade
} from '@chakra-ui/react';
import logo from '../assets/images/logo_transparent.png';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form';


type FormValues = {
    email: string,
    password: string,
    confirm_password: string,
    username: string
};

export default function Register() {
    const { colorMode } = useColorMode();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FormValues>();

    const handleSubmitForm = (data: {}) => {
        console.log(data);
        // ... submit to API or something
    };

    const minPassLength: number = 5;
    const minUsernameLength: number = 5;



    return (
        <>
            <Center p={'1rem'} height={'100vh'}>
                <ScaleFade initialScale={0.9} in>
                    <Box width={'85rem'} height={'auto'} borderRadius='lg' boxShadow='2xl'  >
                        <Stack justify={'center'} direction={{ base: 'column', md: 'row' }} >
                            <Flex flex={1}>
                                <Image
                                    bg={colorMode === 'light' ? 'gray.700' : 'gray.100'}
                                    borderLeftRadius='lg'
                                    alt={'Login Image'}
                                    objectFit={'contain'}
                                    src={logo}
                                    width={'100%'}

                                />
                            </Flex>
                            <Flex p={5} flex={1} align={'center'} justify={'center'}>
                                <form style={{ width: '80%' }} onSubmit={handleSubmit(handleSubmitForm)}>
                                    <Stack spacing={4} w={'full'} >
                                        <Heading textAlign={'center'} fontSize={'4xl'}>Sign Up</Heading>

                                        <FormControl margin={'1rem'} isInvalid={Boolean(errors.username)}>
                                            <FormLabel>Username</FormLabel>
                                            <Input
                                                {...register(
                                                    'username',
                                                    {
                                                        minLength: {
                                                            message: `Minimum ${minUsernameLength}characters required`,
                                                            value: minUsernameLength,
                                                        },
                                                        required: 'Please enter a valid username',
                                                    })
                                                } shadow={'md'} type='string' />
                                            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                                        </FormControl>

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

                                        <FormControl isInvalid={Boolean(errors.confirm_password)}>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <Input
                                                {...register(
                                                    'confirm_password',
                                                    {
                                                        required: 'Please re-enter your password',
                                                        validate: (val: string) => {
                                                            if (watch('password') != val) {
                                                                return 'Your passwords do no match';
                                                            }
                                                        },
                                                    })} shadow={'md'} type='password' />
                                            <FormErrorMessage>
                                                {errors.confirm_password && errors.confirm_password.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <Stack paddingTop={'1rem'} spacing={10}>

                                            <Center>
                                                <Button shadow={'xl'} width={'80%'} type='submit' colorScheme={'blue'} variant={'solid'}>
                                                    Sign in
                                                </Button>
                                            </Center>
                                            <Text
                                                textAlign={'center'}
                                                fontSize='md'>Existing user? <Link color={'blue.500'} as={ReactLink} to='/login'>Log in!</Link></Text>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Flex>
                        </Stack>
                    </Box >
                </ScaleFade>
            </Center>
        </>
    );
};
