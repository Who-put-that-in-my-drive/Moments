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

export default function Login() {
    const { colorMode } = useColorMode();
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
                            <FormControl margin={'1rem'} id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input shadow={'md'} type="email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input shadow={'md'} type="password" />
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
                                    <Button shadow={'xl'} width={'80%'} type='submit' colorScheme={'blue'} variant={'solid'}>
                                        Create account
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
