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
                <Box height={['72px', '72px', '100vh']}>
                    <SideNavBar
                        variant={variants?.navigation}
                        isOpen={isSidebarOpen}
                        onClose={toggleSidebar}
                    />
                    <Box zIndex={1000} marginLeft={!variants?.navigationButton ? '200px' : ''}>
                        <Header
                            showSidebarButton={variants?.navigationButton}
                            onShowSidebar={toggleSidebar}
                        />
                    </Box>
                </Box>
                <Box zIndex={100} maxH='100vh' w='100%' overflowY='scroll'>
                    <Outlet />
                </Box>
            </Flex>
            <Flex>
            </Flex>
        </>
    );
};


export default Dashboard;