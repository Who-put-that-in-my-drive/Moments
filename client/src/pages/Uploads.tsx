import { Box, Center, Flex, Heading, SimpleGrid, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { PhotoCard } from '../components/PhotoCard';
import useStore from '../store/store';
import { UserStore } from '../interfaces/UserStore';
import UploadModal from '../components/UploadModal';
// eslint-disable-next-line

const Uploads = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;
    return (
        <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>
            <Flex align={['center', 'center', '', '']} zIndex={1000}>
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Uploaded Images
                    </Heading>
                    <Tabs display='none' paddingBottom={['1rem', '', '', '3rem']} >
                        <TabList>
                            <Tab>All</Tab>
                            <Tab>Documents</Tab>
                            <Tab>Photos</Tab>
                        </TabList>
                    </Tabs>
                </Box>
            </Flex>
            <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '14rem', '15rem']} overflowY='scroll' spacing='2rem'>
                {images.length > 0 ? images.map(image => {
                    return (<PhotoCard
                        date={image.uploadedOn}
                        format={image.format}
                        imageURL={image.url}
                        key={image.id}
                        name={image.name}
                        size={image.size} />);
                }) : <Text as='h1' noOfLines={2} paddingBottom='3rem' size='md'>
                    No images found. Please upload images.
                </Text>}
            </SimpleGrid>
            <Center paddingTop='.75rem' w={'100%'}>
                <UploadModal />
            </Center>
        </Flex>
    );
};

export default Uploads;
