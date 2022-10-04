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
    Box
} from '@chakra-ui/react';

export default function Login() {
    return (
        <Box borderWidth='2px' borderRadius='lg' boxShadow='lg' >
            <Stack justify={'center'} direction={{ base: 'column', md: 'row' }} >
                <Flex flex={1}>
                    <Image
                        borderLeftRadius='lg'
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                        }
                    />
                </Flex>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading textAlign={'center'} fontSize={'2xl'}>Sign in to Moments</Heading>
                        <FormControl id="email">
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
                            <Button colorScheme={'blue'} variant={'solid'}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </Stack>
        </Box >
    );
};
