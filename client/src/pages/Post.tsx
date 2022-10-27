import {
    Box,
    Container,
    Flex,
    FormLabel,
    Image,
    useColorMode
} from '@chakra-ui/react';
import Beach from '../assets/images/Beach.jpg';


export default function Dashboard() {
    const { colorMode } = useColorMode();

    return (
        <Flex minWidth='sm'>
            <Box p='0'>
                <Image src={Beach} borderLeftRadius='2xl'/>
            </Box>
            <Container  paddingBlock='2' 
                bg={colorMode === 'light' ? 'gray.700' : 'gray.100'} 
                borderRightRadius='2xl'>
                <FormLabel>Test</FormLabel>
                <div>
                    <p style={{ color:'black' }}>
                        Testing
                    </p>
                </div>
            </Container>
        </Flex>
        
    );
}