import { Box, Flex, Heading, SimpleGrid, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { PhotoCard } from '../components/PhotoCard';
import useStore from '../store/store';
export const Uploads = () => {
    const store = useStore();
    const user = store.user;
    const images = user.images;
    return (
        <Flex background={'white'} direction='column' width='100' p='4rem'>
            <Flex width='100vw' zIndex={1000} marginRight={'4rem'}>
                <Box position='fixed' background={'white'}>
                    <Heading as='h2' size='3xl' noOfLines={2} paddingBottom='3rem'>
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
            <SimpleGrid overflowY={'auto'} marginTop={'13rem'} minChildWidth='15rem' spacing='2rem'>
                {images.length > 0 ? images.map(image => {
                    return (<PhotoCard
                        key={image.id}
                        imageURL={image.url}
                        name={image.name}
                        date={image.uploadedOn}
                        size={image.size}
                        format={image.format} />);
                }) : <Text as='h1' size='md' noOfLines={2} paddingBottom='3rem'>
                    No images found. Please upload images.
                </Text>}
            </SimpleGrid>

        </Flex>
    );
};
