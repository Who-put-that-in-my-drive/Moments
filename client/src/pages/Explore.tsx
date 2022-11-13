import {SearchIcon, SettingsIcon} from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spacer,
    Tab,
    TabList,
    Tabs
} from '@chakra-ui/react';
import { Collection } from '../components/Collection';

import Beach from '../assets/images/Beach.jpg';

export const Explore = () => {
    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '4rem', '4rem']}
            width='100%'>
            <Flex align={['center', '', '', '']} marginRight={['', '', '4rem','4rem']} zIndex={1000}>
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']}
                        size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Explore
                    </Heading>
                    <Flex display='none'>
                        <Box>
                            <Tabs paddingBottom={['1rem', '', '', '3rem']}>
                                <TabList>
                                    <Tab>All</Tab>
                                    <Tab>Documents</Tab>
                                    <Tab>Photos</Tab>
                                </TabList>
                            </Tabs>
                        </Box>
                        <Spacer/>
                        <Box paddingLeft='1rem'>
                            <Flex>
                                <InputGroup maxWidth='16rem'>
                                    <InputLeftElement pointerEvents='none'><SearchIcon/></InputLeftElement>
                                    <Input placeholder='Search' type='text'/>
                                </InputGroup>
                                <IconButton aria-label='Settings' icon={<SettingsIcon/>} ml='0.4rem'/>
                            </Flex>
                        </Box>
                    </Flex>
                    <Heading as='h3' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['md', 'md', 'xl', '2xl']}
                        textAlign={['center', 'center', 'left', 'left']}>
                        Collections
                    </Heading>
                </Box>
            </Flex>
            <Box scrollBehavior='auto' w='100%'>
                <SimpleGrid marginTop={'1rem'} minChildWidth='15rem'
                    overflowY='scroll' spacing='2rem'>
                    <Collection collectionName='Test' isOpen={false} numberOfItems={6} onClose={() => {}} onOpen={() => {}} thumbnail={Beach} />
                </SimpleGrid>
            </Box>
        </Flex>
    );
};