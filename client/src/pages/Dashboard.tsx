
import { 
    Box, 
    Button,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tab,
    Tabs,
    TabList,
    useBreakpointValue,
    Spacer, 
} from '@chakra-ui/react';

import { 
    ChevronDownIcon,
    Search2Icon,
    SettingsIcon,
} from '@chakra-ui/icons';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };
// eslint-disable-next-line

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    return (
        <>
            <Flex direction={['column', 'column', 'row', 'row']}>
                <Box height={['72px', '72px', '100vh']}>
                    <SideNavBar
                        isOpen={isSidebarOpen}
                        onClose={toggleSidebar}
                        variant={variants?.navigation}
                    />
                    <Box marginLeft={!variants?.navigationButton ? '200px' : ''} zIndex={1000}>
                        <Header
                            onShowSidebar={toggleSidebar}
                            showSidebarButton={variants?.navigationButton}
                        />
                    </Box>
                </Box> 
                <Box maxH='100vh' overflowY='scroll' w='100%' zIndex={100}>
                    <Tabs aria-label='tab nav'>
                        <TabList>
                            <Tab>All</Tab>
                            <Tab>Documents</Tab>
                            <Tab>Photos</Tab>
                            <Tab>People</Tab>
                        </TabList>
                    </Tabs>

                    <Flex padding={'10'}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Filters
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Last Updated</MenuItem>
                            </MenuList>        
                        </Menu>
                        <Spacer />
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' >
                                <Search2Icon />   
                            </InputLeftElement>
                            <Input maxW={'60'} placeholder='Search' type='search'/>
                        </InputGroup>

                        <IconButton 
                            aria-label='Access Settings'
                            icon={<SettingsIcon/>} 
                        />
                    </Flex>
                    <Outlet />
                </Box>
            </Flex>
            <Flex>
            </Flex>
        </>
    );
};


export default Dashboard;