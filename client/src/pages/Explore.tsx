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
import {PhotoCard} from '../components/PhotoCard';

export const Explore = () => {
    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '4rem', '4rem']}
            width='100%'>
            <Flex align={['center', '', '', '']} marginRight={'4rem'} zIndex={1000}>
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
                        <Box>
                            <Flex>
                                <InputGroup maxWidth='16rem'>
                                    <InputLeftElement pointerEvents='none'><SearchIcon/></InputLeftElement>
                                    <Input placeholder='Search' type='text'/>
                                </InputGroup>
                                <IconButton aria-label='Settings' icon={<SettingsIcon/>} ml='0.4rem'/>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Box scrollBehavior='auto' w='100%'>
                <Heading as='h3' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['md', 'md', 'xl', '2xl']}
                    textAlign={['center', 'center', 'left', 'left']}>
                    Collections
                </Heading>
                <SimpleGrid marginTop={'1rem'} minChildWidth='15rem'
                    overflowY='scroll' spacing='2rem'>
                    <PhotoCard date='' format=''
                        imageURL='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg'
                        name='test' size='10'/>
                    <PhotoCard date='' format=''
                        imageURL='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg'
                        name='test' size='10'/>
                    <PhotoCard date='' format=''
                        imageURL='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg'
                        name='test' size='10'/>
                    <PhotoCard date='' format=''
                        imageURL='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg'
                        name='test' size='10'/>
                    <PhotoCard date='' format=''
                        imageURL='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg'
                        name='test' size='10'/>
                </SimpleGrid>
            </Box>
        </Flex>
    );
};
