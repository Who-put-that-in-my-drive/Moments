import {
    Avatar,
    Box,
    Button,
    Center,
    FormLabel,
    Heading,
    Link,
    HStack,
    Input,
    Text,
    VStack,
    Wrap,
    WrapItem,
    Flex,
    FormErrorMessage,
    FormControl,
    useToast,
    Tag,
    Stack,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from '@chakra-ui/react';
import useStore from '../store/store';
import { useForm } from 'react-hook-form';
import { deleteUser, updateUser } from '../services/api/user-service';
import { useRef, useState } from 'react';
import { successResponse } from '../utils/ResponseUtils';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';

export type UpdateFormDTO = {
    email: string
    firstName: string
    lastName: string
    displayName: string
};

export const Profile = () => {
    const store = useStore();
    const toast = useToast();
    const { onClose, isOpen, onOpen } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdateFormDTO>();
    const user = store.user;
    const minNameLength: number = 2;
    const navigate = useNavigate();
    const userName = (user.firstName && user.lastName ?
        user.firstName + ' ' + user.lastName :
        '') || '';


    const [loading, setLoading] = useState(false);
    const capitalizeFirstChar = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const showToast = (status: string) => {
        const title = status === 'success' ? 'User updated.' : 'User update failed.';
        const description = status === 'success' ? 'We\'ve successfully updated your info.' : 'Something went wrong.';
        const statusT = status === 'success' ? 'success' : 'error';

        return toast({
            description: description,
            duration: 3000,
            isClosable: true,
            position: 'top',
            status: statusT,
            title: title
        });
    };

    const handleSubmitForm = async (data: UpdateFormDTO) => {
        setLoading(true);
        const formData: UpdateFormDTO = {
            ...data,
            displayName: user.displayName,
            email: user.email,
            firstName: capitalizeFirstChar(data.firstName),
            lastName: capitalizeFirstChar(data.lastName)
        };

        try {
            const updateUserResponse = await updateUser(formData);
            if (successResponse(updateUserResponse)) {
                const updatedUserData: User = {
                    ...user,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                };
                store.updateUser(updatedUserData);
                showToast('success');
                setLoading(false);
            }
        } catch (error) {
            showToast('error');
            setLoading(false);
        }
    };

    const deleteUserHandler = async () => {
        const deleteUserResponse: any = await deleteUser();
        if (successResponse(deleteUserResponse)) {
            store.removeUser();
            toast({
                description: 'User deleted!\nWe\'re sorry to see you go 😕',
                duration: 3000,
                isClosable: true,
                position: 'top',
                status: 'success',
                title: 'Success!'
            });
            onClose();
            setTimeout(() => {
                navigate('login');
            }, 3000);

        } else {
            onClose();
            toast({
                description: 'Something went wrong!',
                duration: 3000,
                isClosable: true,
                position: 'top',
                status: 'error',
                title: 'Error!'
            });
        }
    };

    return (
        <>
            <Flex direction={'column'} padding={['1rem', '3rem', '4rem', '5rem']} paddingX={['1rem', '2rem', '3rem', '7rem']} scrollBehavior={'auto'}>
                <Wrap align={'center'} direction={['column', 'column', 'row', 'row']} paddingBottom={'1rem'} spacing={['1rem', '1rem', '2rem', '2rem']}>
                    <WrapItem>
                        <Avatar size='xl' />
                    </WrapItem>
                    <Stack alignItems={['center', 'center', 'normal', 'normal']} direction={'column'} justifyContent='center'>
                        <Heading as='h1' noOfLines={1} size={'xl'}>
                            {userName.length > 0 ? userName : ''}
                        </Heading>
                        <Tag colorScheme='blue' rounded='full' size={'md'} width={'-webkit-fit-content'}>
                            {'@' + user.displayName}
                        </Tag>
                    </Stack>
                </Wrap>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Box>
                        <VStack align='left' spacing={'1rem'} >
                            <Box borderBottomWidth='2px'>
                                <Text as='b' fontSize='xl'>
                                    User Info
                                </Text>
                            </Box>
                            <Flex justifyContent={'space-around'}>
                                <Box paddingRight='1rem' style={{ width: '100%' }}>
                                    <FormControl isInvalid={Boolean(errors.firstName)}>
                                        <FormLabel>First Name</FormLabel>
                                        <Input {...register(
                                            'firstName',
                                            {
                                                minLength: {
                                                    message: `Minimum of ${minNameLength} characters required`,
                                                    value: minNameLength,
                                                },
                                                required: 'Please enter a valid first name',
                                            })} placeholder={user.firstName || 'First name'} type='text' />
                                        <FormErrorMessage>
                                            {errors.firstName && errors.firstName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box paddingLeft='1rem' style={{ width: '100%' }}>
                                    <FormControl isInvalid={Boolean(errors.lastName)}>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input {...register('lastName',
                                            {
                                                minLength: {
                                                    message: `Minimum of ${minNameLength} characters required`,
                                                    value: minNameLength,
                                                },
                                                required: 'Please enter a valid last name',
                                            })} placeholder={user.lastName || 'Last name'} type='text' />
                                        <FormErrorMessage>
                                            {errors.lastName && errors.lastName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </Flex>
                            <div>
                                <FormLabel>Display Name</FormLabel>
                                <Input  {...register('displayName')} disabled type='text' value={user.displayName} />
                            </div>
                            <div>
                                <FormLabel>Email Address</FormLabel>
                                <Input  {...register('email')} disabled type='text' value={user.email} />
                            </div>
                            <Center>
                                <HStack mt='1rem' spacing='2rem'>
                                    <Button colorScheme='gray' size='sm'>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='teal' isLoading={loading} loadingText='Updating..' size='sm' type='submit'>
                                        Save
                                    </Button>
                                </HStack>
                            </Center>
                            <Box borderBottomWidth='2px' pt='0.7rem'>
                                <Text as='b' fontSize='xl'>
                                    Profile Picture
                                </Text>
                            </Box>
                            <HStack position='relative' spacing='2rem'>
                                <Avatar size='xl' />
                                <Link color='teal.500' href='#'>
                                    Change Profile Picture
                                </Link>
                                <Input
                                    accept='image/*'
                                    aria-hidden='true'
                                    opacity='0'
                                    placeholder='test'
                                    position='absolute'
                                    type='file'
                                />
                            </HStack>
                            <Box borderBottomWidth='2px' pt='0.7rem'>
                                <Text as='b' fontSize='xl'>
                                    Delete Profile
                                </Text>
                            </Box>
                            <Center>
                                <HStack position='relative' spacing='2rem'>
                                    <Button colorScheme='red' loadingText='Deleting..' onClick={onOpen} size='sm' type='button'>
                                        Delete Profile
                                    </Button>
                                    <AlertDialog
                                        isCentered
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef}
                                        motionPreset='slideInBottom'
                                        onClose={onClose}
                                    >
                                        <AlertDialogOverlay />

                                        <AlertDialogContent>
                                            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                                            <AlertDialogCloseButton />
                                            <AlertDialogBody>
                                                Are you sure you want to delete your account?
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button onClick={onClose} ref={cancelRef}>
                                                    Cancel
                                                </Button>
                                                <Button colorScheme='red' ml={3} onClick={deleteUserHandler}>
                                                    Yes
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </HStack>
                            </Center>
                        </VStack>
                    </Box>
                </form>
            </Flex>
        </>
    );
};

