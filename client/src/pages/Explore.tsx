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
    Tabs,
    Text,
    Button
} from '@chakra-ui/react';
import { Collection } from '../components/Collection';
import { AiOutlineRollback } from 'react-icons/ai';

// eslint-disable-next-line no-unused-vars
import { UserStore } from '../interfaces/UserStore';
import useStore from '../store/store';
import { useEffect, useState } from 'react';
import { PhotoCard } from '../components/PhotoCard';
import { Image } from '../interfaces/Image';
type TagStructure = {
    count: number,
    imageData: Image[],
    name: string
}

type ImageDto = {
    id: string
    title: string,
    format: string,
    size: string,
    caption: string,
    tags: string[],
    categories: string[],
    owner: string,
    location: string,
    lastModifiedDateTime: number,
    uploadedDateTime: number,
}

export const Explore = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images1 = user.images;
    console.log(images1);

    const dummyImage1 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['Ocean'],
        title: 'title1',
        uploadedDateTime:321
    };
    const dummyImage2 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['Ocean'],
        title: 'title1',
        uploadedDateTime:321
    };
    const dummyImage3 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['Ocean'],
        title: 'title1',
        uploadedDateTime:321
    };
    const dummyImage4 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['Ocean'],
        title: 'title1',
        uploadedDateTime:321
    };

    const dummyImage5 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['People'],
        title: 'title1',
        uploadedDateTime:321
    };

    const dummyImage6 : Image = {
        caption: 'testing123',
        categories: ['Yes', 'Yes2'],
        format: 'png',
        id: '1',
        lastModifiedDateTime: 123,
        location: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg',
        owner: 'Parth',
        size: '12.2 MB',
        tags: ['People'],
        title: 'title1',
        uploadedDateTime:321
    };

    const images = [dummyImage1, dummyImage2, dummyImage3, dummyImage4, dummyImage5,dummyImage6];
    
    const [tags, setTags] = useState<TagStructure[]>([]);
    const [displayCollection, setDisplayCollection ] = useState<ImageDto[]>([]);
    const [showCollection, setShowCollection] = useState(0);
    const [collectionName, setCollectionName] = useState('');

    const onClickBackToCollection = () => {
        setShowCollection(0);
    };

    const gatherTags = () => {
        if (images.length > 0 ) {
            let gatheredTags: TagStructure[] = [];                      
            images.map(img => {
                img.tags.map(tag => {                    
                    let positionIndex = -1;
                    gatheredTags.forEach((item, index) => {
                        if(item.name === tag) {
                            positionIndex = index;
                            return;
                        }
                    });
                    

                    if(positionIndex === -1) {
                        gatheredTags.push({
                            count: 1,
                            imageData: [img],
                            name: tag
                        });
                    } else {
                        gatheredTags[positionIndex].count++;
                        gatheredTags[positionIndex].imageData.push(img);
                    }

                });

            });
            setTags(gatheredTags);
        }
    };

    useEffect(() => {
        gatherTags();
    }, []);
    
    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '4rem', '4rem']}>
            <Flex align={['center', '', '', '']} marginRight={['', '', '4rem','4rem']} minWidth='100%' zIndex={1000}>
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
                        <Spacer display={['none','none', 'block', 'block']}/>
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
                    
                    <Heading as='h2' fontWeight='semibold' marginTop='1rem' noOfLines={2} paddingBottom={['0.5rem', '1rem', '2rem']} size={['md', 'md', 'xl', '2xl']}
                        textAlign={['center', 'center', 'left', 'left']}>
                        Collections {showCollection === 0? null: <> : {collectionName} </>}
                    </Heading>
                </Box>
            </Flex>
            {showCollection === 0 ? <SimpleGrid maxH={['65vh', '69vh', '70vh', '75vh']}  minChildWidth='15rem' spacing='2rem'>
                {tags.length > 0 ?
                    tags.map((tag, index) => <Collection collectionName={tag.name} count={tag.count} displayCollection={displayCollection} images={tag.imageData} key={index} setCollectionName={setCollectionName} setDisplayCollection={setDisplayCollection} setShowCollection={setShowCollection} thumbnail={tag.imageData[0].location} />)
                    : <Text> No collections created. Add tags to uploaded images to get started.</Text>
                }
            </SimpleGrid> : 
            
                <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>
            
                    <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '14rem', '15rem']} overflowY='scroll' spacing='2rem'>
                
                        {displayCollection.map(image => {
                            return (
                                <PhotoCard
                                    date={'Nov 9, 2022'}
                                    format={image.format}
                                    imageURL={image.location}
                                    key={image.id}
                                    name={image.title}
                                    size={image.size} />);
                        })}

                    </SimpleGrid>
            
            
                    <Button height='3.5rem' leftIcon={<AiOutlineRollback />} maxW='16rem' minW='15rem' onClick={onClickBackToCollection} style={{marginTop: '50px'}}>Back To Folder</Button>

                </Flex>}
            
        </Flex>
    );
};