import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Image,
    Input,
    Link,
    ScaleFade,
    Stack,
    Text,
    useColorMode,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo_transparent.png';
import { registerUser } from '../services/api.service';

export type RegisterFormValues = {
    email: string,
    password: string,
    confirm_password: string,
    displayName: string
};

export default function Register() {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<RegisterFormValues>();
    const minPassLength: number = 7;
    const minUsernameLength: number = 3;

    const handleSubmitForm = async (data: RegisterFormValues) => {
        setGeneralError(false);
        setIsLoading(true);
        try {
            await registerUser(data);
            reset();
            onOpen();
            setIsLoading(false);
        } catch (error) {
            setGeneralError(true);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Center marginTop={['5rem', '7rem', '0', '0']} h={'100vh'} padding={['0rem', '0.5rem', '3rem', '5rem']}>
                <ScaleFade initialScale={0.9} in>
                    <Box boxShadow='2xl'>
                        <Flex direction={{ base: 'column', md: 'row' }} >
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
                                        <Heading textAlign={'center'} fontSize={'4xl'}>Sign Up</Heading>
                                        <FormControl margin={'1rem'} isInvalid={Boolean(errors.displayName)}>
                                            <FormLabel>Username</FormLabel>
                                            <Input
                                                {...register(
                                                    'displayName',
                                                    {
                                                        minLength: {
                                                            message: `Minimum ${minUsernameLength} characters required`,
                                                            value: minUsernameLength,
                                                        },
                                                        required: 'Please enter a valid username',
                                                    })
                                                } shadow={'md'} type='string' />
                                            <FormErrorMessage>{errors.displayName && errors.displayName.message}</FormErrorMessage>
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
                                            <Text textAlign='center' color='tomato'>
                                                {generalError ? 'Something went wrong please try again!' : null}
                                            </Text>
                                        </FormControl>
                                        <Stack paddingTop={'1rem'} spacing={10}>

                                            <Center>
                                                <Button isLoading={isLoading} loadingText={'Registering user...'} shadow={'xl'} width={'80%'} type='submit' colorScheme={'blue'} variant={'solid'}>
                                                    Sign up
                                                </Button>

                                            </Center>
                                            <Text
                                                textAlign={'center'}
                                                fontSize='md'>Existing user? <Link color={'blue.500'} as={ReactLink} to='/login'>Log in!</Link></Text>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Flex>
                        </Flex>
                    </Box >
                </ScaleFade>
            </Center>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogCloseButton />
                    <Center borderTopRadius={'md'} w='100%' h='12rem' bg='green.400' color='white'>
                        <Icon as={CheckCircleIcon} w={24} h={24} />
                    </Center>
                    <AlertDialogBody>
                        <VStack spacing={4}>
                            <Center>
                                <Text as='b' fontSize='4xl'> Great! </Text>
                            </Center>
                            <Center>
                                <Text fontSize='lg'> Your account has been created successfully. </Text>
                            </Center>
                        </VStack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => { navigate('/login'); }} rightIcon={<ArrowForwardIcon />} colorScheme='gray' variant='outline'>
                            Sign In
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
