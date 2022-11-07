import { Box, Flex, Heading, SimpleGrid, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { PhotoCard } from '../components/PhotoCard';
import useStore from '../store/store';
import { Store } from '../utils/Interfaces';

const Uploads = () => {
    const store: Store = useStore();
    const user = store.user;
    const images = user.images;
    return (
        <Flex background={'white'} direction='column' p='4rem' width='100'>
            <Flex marginRight={'4rem'} width='100vw' zIndex={1000}>
                <Box background={'white'} position='fixed'>
                    <Heading as='h2' noOfLines={2} paddingBottom='3rem' size='3xl'>
                        Uploaded Images
                    </Heading>
                    <Tabs paddingBottom='3rem'>
                        <TabList>
                            <Tab>All</Tab>
                            <Tab>Documents</Tab>
                            <Tab>Photos</Tab>
                        </TabList>
                    </Tabs>
                </Box>
            </Flex>
            <SimpleGrid marginTop={'13rem'} minChildWidth='15rem' overflowY={'auto'} spacing='2rem'>
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
        </Flex>
    );
};

export default Uploads;