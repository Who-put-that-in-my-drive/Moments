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
    Center
} from '@chakra-ui/react';
import logo from '../assets/images/logo.png';

export default function Login() {
    return (
        <Center height={'100vh'}>
            <Box maxW={'90vw'} borderWidth='1px' borderRadius='lg' boxShadow='lg' >
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
                            <Stack spacing={6}>
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
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>
            </Box >
        </Center>
    );
};
