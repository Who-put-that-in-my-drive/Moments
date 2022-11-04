import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };


const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    return (
        <>
            <Flex direction={['column', 'column', 'row', 'row']}>
                <Box height={'100vh'}>
                    <SideNavBar
                        variant={variants?.navigation}
                        isOpen={isSidebarOpen}
                        onClose={toggleSidebar}
                    />
                    <Box marginLeft={!variants?.navigationButton ? '200px' : ''}>
                        <Header
                            showSidebarButton={variants?.navigationButton}
                            onShowSidebar={toggleSidebar}
                        />
                    </Box>
                </Box>
                <Outlet />
            </Flex>
            <Flex>

            </Flex>




        </>
    );
};


export default Dashboard;