import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';
// eslint-disable-next-line 
import { MouseEventHandler } from 'react';
import { getServerUrl } from '../utils/WebsiteUtils';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo_transparent.png';
import useStore from '../store/store';
import { SideNavBarProps } from '../utils/ComponentPropTypes';
import { Store } from '../utils/Interfaces';



const SideNavBar = ({ isOpen, variant, onClose }: SideNavBarProps) => {

    return variant === 'sidebar' ? (
        <Box
            shadow='lg'
            left={0}
            p={5}
            w='18rem'
            top={0}
            h='100%'
            bg='blackAlpha.300'
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
    const { colorMode, toggleColorMode } = useColorMode();
    const store: Store = useStore();
    const user = store.user;
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        try {
            const response: any = await logout();
            console.log(response.data);
            store.removeUser();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };


    const logout = async (): Promise<void> => {
        const URL = getServerUrl();
        return await axios.get(URL + '/api/auth/logout');
    };

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
                    _activeLink={{ background: 'black' }}
                >
                    <IconButton
                        disabled={true}
                        onClick={toggleColorMode}
                        aria-label='Theme changer'
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />

                    <Button _activeLink={{ background: 'gray.300' }} as={ReactLink} to='/dashboard/home' onClick={onClick} w="100%" size='md'>
                        Home
                    </Button>
                    <Button _activeLink={{ background: 'gray.300' }} as={ReactLink} to='/dashboard/profile' onClick={onClick} w="100%" size='md'>
                        Profile
                    </Button>
                    <Button disabled={true} _activeLink={{ background: 'gray.300' }} as={ReactLink} to='/dashboard/plans' onClick={onClick} w="100%" size='md'>
                        Membership Plan
                    </Button>
                </VStack>
            </Flex>

            <Flex
                p='5%'
                flexDir='column'
                w='100%'
                mb={2}
            >
                {/* <Divider p={'1rem'} display={'flex'} /> */}

                <Menu>
                    <MenuButton paddingBottom={'3rem'} paddingTop='2rem' as={Button} rightIcon={<ChevronDownIcon />}>
                        <Flex justifyContent={'center'} alignContent='center' mt={4} align='center'>

                            <Avatar size='md' src='avatar-1.jpg' />
                            <Flex flexDir='column' ml={4} display={'flex'}>
                                <Heading as='h3' size='sm'>{user.displayName || 'No user found'}</Heading>
                                <Text color='gray'>{user.email || 'No user found'}</Text>
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex >
    );
};



export default SideNavBar;
