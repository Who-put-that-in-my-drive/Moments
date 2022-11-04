import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
    Link,
    Flex,
    Divider,
    Avatar,
    Heading,
    Text,
    Image,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import useStore from '../store/store';
import logo from '../assets/images/logo_transparent.png';




interface Props {
    onClose: () => void
    isOpen: boolean
    variant: 'drawer' | 'sidebar' | any
};

const SideNavBar = ({ isOpen, variant, onClose }: Props) => {

    return variant === 'sidebar' ? (
        <Box

            left={0}
            p={5}
            w="18rem"
            top={0}
            h="100%"
            bg="gray.100"
        >
            <SidebarContent onClick={onClose} />
        </Box>
    ) : (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent backgroundColor={'gray.100'}>
                    <DrawerCloseButton />
                    <DrawerHeader>Moments</DrawerHeader>
                    <DrawerBody>
                        <SidebarContent onClick={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};


const SidebarContent = ({ onClick }: { onClick: MouseEventHandler }) => {
    const store = useStore();
    const user = store.user;
    return (
        <Flex
            left='0'
            h='100%'
            flexDir='column'
            justifyContent='space-between'
            transition={'.2s'}
        >

            <Flex
                flexDir='column'
                w='100%'
                as='nav'
            >
                <Image
                    w={'100%'}
                    alt={'Login Image'}
                    src={logo}
                />
                <VStack paddingTop={'3rem'}
                    spacing={9}
                    align='center'
                    width={'100%'}
                    as={'nav'}
                >
                    <Button onClick={onClick} w="100%" size='md'>
                        <Link as={ReactLink} to='/dashboard/home'> Home </Link>
                    </Button>
                    <Button onClick={onClick} w="100%" size='md'>
                        <Link as={ReactLink} to='/dashboard/profile'>Profile</Link>
                    </Button>
                    <Button onClick={onClick} w="100%" size='md'>
                        <Link as={ReactLink} to='/dashboard'>Membership Plan</Link>
                    </Button>
                </VStack>
            </Flex>

            <Flex
                p='5%'
                flexDir='column'
                w='100%'
                mb={2}
            >
                <Divider display={'flex'} />
                <Flex mt={4} align='center'>
                    <Avatar size='sm' src='avatar-1.jpg' />
                    <Flex flexDir='column' ml={4} display={'flex'}>
                        <Heading as='h3' size='sm'>{user.displayName}</Heading>
                        <Text color='gray'>{user.email}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};



export default SideNavBar;
