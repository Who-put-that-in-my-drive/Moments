import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, IconButton, Text } from '@chakra-ui/react';
// eslint-disable-next-line
import { HeaderProps } from '../utils/ComponentPropTypes';



const Header = ({ showSidebarButton = true, onShowSidebar }: HeaderProps) => {
    return (
        <>
            {showSidebarButton && (
                <Flex shadow='md' zIndex={'10000'} bg="gray.200" p={4} color="white" justifyContent="center">
                    <Box flex="1">
                        <IconButton
                            aria-label='button'
                            icon={<ChevronRightIcon w={8} h={8} />}
                            colorScheme="blackAlpha"
                            variant="outline"
                            onClick={onShowSidebar}
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