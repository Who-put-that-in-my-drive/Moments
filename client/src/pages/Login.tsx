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
    Text
} from '@chakra-ui/react';
import logo from '../assets/images/logo.png';
import { Link as ReactLink } from 'react-router-dom';

export default function Login() {
    return (
        <Center height={'100vh'}>
            <Box maxW={'90vw'} borderWidth='1px' borderRadius='lg' boxShadow='xl' >
                <Stack justify={'center'} direction={{ base: 'column', md: 'row' }} >
                    <Flex flex={1}>
                        <Image
                            borderLeftRadius='lg'
                            alt={'Login Image'}
                            objectFit={'cover'}
                            src={logo}
                        />
                    </Flex>
                    <Flex p={8} flex={1} align={'center'} justify={'center'}>
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading marginY={'2rem'} textAlign={'center'} fontSize={'4xl'}>Sign in to Moments</Heading>
                            <FormControl margin={'1rem'} id="email">
                                <FormLabel>Email</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.500'}>Forgot password?</Link>
                                </Stack>
                                <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                                    Sign in
                                </Button>
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
