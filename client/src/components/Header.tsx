import { Box, Center, IconButton, Text, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { MouseEventHandler } from 'react';

interface Props {
    onShowSidebar: MouseEventHandler
    showSidebarButton?: boolean
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
    return (
        <>

            {showSidebarButton && (
                <Flex bg="gray.200" p={4} color="white" justifyContent="center">
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