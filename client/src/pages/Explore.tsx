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
    size: number,
    caption: string,
    tags: string,
    categories: string,
    url: string,
    location: string,
    lastModifiedDateTime: string,
    uploadedDateTime: string,
}

export const Explore = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;

    const deleteImage = (imageId: string): void => {
        let _images = [...images];
        _images = _images.filter((imageObj: Image) => (imageObj.id != imageId));
        store.deleteImage(imageId);
    };

    const dummyImage1 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'Ocean',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };
    const dummyImage2 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'Ocean',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };
    const dummyImage3 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'Ocean',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };
    const dummyImage4 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'Ocean',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };

    const dummyImage5 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'People',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };

    const dummyImage6 : Image = {
        caption: 'testing123',
        categories: 'caption',
        format: 'png',
        id: '1',
        lastModifiedDateTime: '123',
        location: 'Toronto',
        size: 12.2,
        tags: 'People',
        title: 'title1',
        uploadedDateTime:'321',
        url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-simon-berger-1323550.jpg&fm=jpg'
    };

    const images23 = [dummyImage1, dummyImage2, dummyImage3, dummyImage4, dummyImage5,dummyImage6];
    console.log(images23);

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
                img.tags.split(',').map(tag => {                    
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
                        Collections {showCollection === 0? null: <> : {collectionName} </>}
                    </Heading>
                </Box>
            </Flex>
            {showCollection === 0 ? <SimpleGrid maxH={['65vh', '69vh', '70vh', '75vh']}  minChildWidth='15rem' spacing='2rem'>
                {tags.length > 0 ?
                    tags.map((tag, index) => <Collection collectionName={tag.name} count={tag.count} displayCollection={displayCollection} images={tag.imageData} key={index} setCollectionName={setCollectionName} setDisplayCollection={setDisplayCollection} setShowCollection={setShowCollection} thumbnail={tag.imageData[0].url} />)
                    : <Text> No collections created. Add tags to uploaded images to get started.</Text>
                }
            </SimpleGrid> : 
            
                <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>
            
                    <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '14rem', '15rem']} overflowY='scroll' spacing='2rem'>
                
                        {displayCollection.map(image => {
                            return (
                                <PhotoCard           
                                    caption={image.caption} 
                                    categories={image.categories}
                                    date={'Nov 9, 2022'}
                                    deleteImageCallback={deleteImage}
                                    format={image.format}
                                    id={image.id}
                                    imageURL={image.url}
                                    isLoaded={true}
                                    key={image.id}
                                    location={image.location}
                                    size={String(image.size)}
                                    tags={image.tags}
                                    title={image.title} />);
                        })}

                    </SimpleGrid>
            
            
                    <Button height='3.5rem' leftIcon={<AiOutlineRollback />} maxW='16rem' minW='15rem' onClick={onClickBackToCollection} style={{marginTop: '50px'}}>Back To Folder</Button>

                </Flex>}
            
        </Flex>
    );
};