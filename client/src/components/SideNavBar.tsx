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
    Tooltip,
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
            bg='blackAlpha.300'
            h='100%'
            left={0}
            p={5}
            shadow='lg'
            top={0}
            w='18rem'
        >
            <SidebarContent onClick={onClose} />
        </Box>
    ) : (
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
            <DrawerOverlay>
                <DrawerContent>
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
            flexDir='column'
            h='100%'
            justifyContent='space-between'
            left='0'
            transition={'.2s'}
        >

            <Flex
                as='nav'
                flexDir='column'
                w='100%'
            >
                <Image
                    alt={'Login Image'}
                    src={logo}
                    w={'100%'}
                />
                <VStack
                    align='center'
                    as={'nav'}
                    paddingTop={'3rem'}
                    spacing={9}
                    width={'100%'}
                >
                    <IconButton
                        aria-label='Theme changer'
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                    />
                    <Button _activeLink={{ background: 'blackAlpha.500', color: 'whiteAlpha.800' }} as={ReactLink} colorScheme={'gray'} onClick={onClick} size='md' to='/dashboard/home' w="100%">
                        Home
                    </Button>
                    <Button _activeLink={{ background: 'blackAlpha.500', color: 'whiteAlpha.800' }} as={ReactLink} colorScheme={'gray'} onClick={onClick} size='md' to='/dashboard/profile' w="100%">
                        Profile
                    </Button>
                    <Button _activeLink={{ background: 'blackAlpha.500', color: 'whiteAlpha.800' }} as={ReactLink} colorScheme={'gray'} disabled={true} onClick={onClick} size='md' to='/dashboard/explore' w="100%">
                        Explore
                    </Button>
                </VStack>
            </Flex>

            <Flex
                flexDir='column'
                mb={2}
                p='5%'
                w='100%'
            >
                <Menu>
                    <Tooltip aria-label='A tooltip' label={user.email}>
                        <MenuButton as={Button} paddingBottom={'3rem'} paddingTop='2rem' rightIcon={<ChevronDownIcon />}>
                            <Flex align='center' alignContent='center' justifyContent={'center'} mt={4}>
                                <Avatar size='md' src='avatar-1.jpg' />
                                <Flex display={'flex'} flexDir='column' maxW={'70%'} ml='2'>
                                    <Heading as='h3' noOfLines={1} size='sm'>{user.displayName || 'No user found'}</Heading>
                                    <Text color='gray' noOfLines={1}>{user.email || 'No user found'}</Text>
                                </Flex>
                            </Flex>
                        </MenuButton>
                    </Tooltip>
                    <MenuList>
                        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex >
    );
};



export default SideNavBar;
