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
    Tabs, Text,
    useDisclosure
} from '@chakra-ui/react';
import { Collection } from '../components/Collection';

// eslint-disable-next-line no-unused-vars
import { UserStore } from '../interfaces/UserStore';
import useStore from '../store/store';
import { useEffect, useState } from 'react';

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

    const { isOpen, onOpen, onClose } = useDisclosure();

    const gatherTags = () => {
        if (images.length > 0) {
            let gatheredTags: TagStructure[] = [];
            images.forEach(image => {
                if (gatheredTags[image.tags] === undefined) {
                    gatheredTags[image.tags] = {
                        count: 1,
                        imageUrls: [image.url],
                        name: image.tags
                    };
                } else {
                    gatheredTags[image.tags].count++;
                    gatheredTags[image.tags].imageUrls.push(image.url);
                }
            });
            setTags(gatheredTags);
        }
    };

    useEffect(() => {
        gatherTags();
    }, []);

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
                {tags.length > 0 ?
                    <SimpleGrid marginTop={'1rem'} minChildWidth='15rem' overflowY='scroll' spacing='2rem'>
                        {tags.map((tag, index) => <Collection collectionName={tag.name} images={tag.imageUrls} isOpen={isOpen} key={index} numberOfItems={tag.count} onClose={onClose} onOpen={onOpen} />)}
                    </SimpleGrid> :
                    <Text>No collections available, add tags to uploaded images to get started.</Text>}
            </Box>
        </Flex>
    );
};