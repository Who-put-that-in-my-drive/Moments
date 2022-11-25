import { SearchIcon, SettingsIcon } from '@chakra-ui/icons';
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
    Tabs,
    Text,
} from '@chakra-ui/react';
import { Collection } from '../components/Collection';

// eslint-disable-next-line no-unused-vars
import { UserStore } from '../interfaces/UserStore';
import useStore from '../store/store';
import { useEffect, useState } from 'react';
import { Image } from '../interfaces/Image';

type TagStructure = {
    count: number,
    imageUrls: string[],
    name: string
}

export const Explore = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;
    const [tags, setTags] = useState<TagStructure[]>([]);


    const gatherTags = () => {
        if (images.length > 0) {
            let gatheredTags: TagStructure[] = [];
            images.forEach((image: Image) => {
                // eslint-disable-next-line
                // if (gatheredTags[image.tags] === undefined) {
                //     gatheredTags[image.tags] = {
                //         count: 1,
                //         imageUrls: [image.url],
                //         name: image.tags
                //     };
                image;
                // } else {
                //     gatheredTags[image.tags].count++;
                //     gatheredTags[image.tags].imageUrls.push(image.url);
                // }
            });
            setTags(gatheredTags);
        }
    };

    useEffect(() => {
        gatherTags();
    }, []);

    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '4rem', '4rem']}>
            <Flex align={['center', '', '', '']} marginRight={['', '', '4rem', '4rem']} minWidth='100%' zIndex={1000}>
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '2.5rem']}
                        size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Explore
                    </Heading>
                    <Flex align={['center', 'center', 'normal', 'normal']} justifyContent={['center', 'center', '', '']}>
                        <Box display='none'>
                            <Tabs paddingBottom={['1rem', '', '', '3rem']}>
                                <TabList>
                                    <Tab>All</Tab>
                                    <Tab>Documents</Tab>
                                    <Tab>Photos</Tab>
                                </TabList>
                            </Tabs>
                        </Box>
                        <Spacer display={['none', 'none', 'block', 'block']} />
                        <Box>
                            <Flex>
                                <InputGroup maxWidth='16rem'>
                                    <InputLeftElement pointerEvents='none'><SearchIcon /></InputLeftElement>
                                    <Input placeholder='Search' type='text' />
                                </InputGroup>
                                <IconButton aria-label='Settings' icon={<SettingsIcon />} ml='0.4rem' />
                            </Flex>
                        </Box>
                    </Flex>
                    <Heading as='h2' fontWeight='semibold' marginTop='1rem' noOfLines={2} paddingBottom={['0.5rem', '1rem', '2rem']} size={['md', 'md', 'xl', '2xl']}
                        textAlign={['center', 'center', 'left', 'left']}>
                        Collections
                    </Heading>
                </Box>
            </Flex>
            <SimpleGrid maxH={['65vh', '69vh', '70vh', '75vh']} minChildWidth='15rem' spacing='2rem'>
                {tags.length > 0 ?
                    tags.map((tag, index) => <Collection collectionName={tag.name} images={tag.imageUrls} key={index} />)
                    : <Text> No collections created. Add tags to uploaded images to get started.</Text>
                }
            </SimpleGrid>
        </Flex>
    );
};