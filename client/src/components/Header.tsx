import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex,IconButton, Text } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

interface Props {
    onShowSidebar: MouseEventHandler
    showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
    return (
        <>

            {showSidebarButton && (
                <Flex bg="gray.200" color="white" justifyContent="center" p={4} shadow='md' zIndex={'10000'}>
                    <Box flex="1">
                        <IconButton
                            aria-label='button'
                            colorScheme="blackAlpha"
                            icon={<ChevronRightIcon h={8} w={8} />}
                            onClick={onShowSidebar}
                            variant="outline"
                        />
                    </Box>
                    <Center flex="1" h="40px">
                        <Text color={'gray.900'} fontSize="xl">Moments</Text>
                    </Center>
                    <Box flex="1" />
                </Flex>
            )}

        </>
    );
};

export default Header;