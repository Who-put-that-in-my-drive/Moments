import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spacer,
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
        store.deleteImage(imageId);
    };


    const [tags, setTags] = useState<TagStructure[]>([]);
    const [displayTags, setDisplayTags] = useState<TagStructure[]>([]);
    const [displayCollection, setDisplayCollection] = useState<ImageDto[]>([]);
    const [showCollection, setShowCollection] = useState(0);
    const [collectionName, setCollectionName] = useState('');

    const onSearchBarChange = (searchQuery: string): void => {
        let newTagsList: TagStructure[] = [];
        if (searchQuery.length <= 0) {
            newTagsList = tags;
        } else {
            tags.map(item => {
                if (item.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
                    newTagsList.push(item);
                }
            });
        }
        setDisplayTags(newTagsList);
    };

    const onClickBackToCollection = () => {
        setShowCollection(0);
    };

    const gatherTags = () => {
        if (images.length > 0) {
            let gatheredTags: TagStructure[] = [];
            images.map(img => {
                img.tags.toString().split(',').map((tag: string) => {
                    let positionIndex = -1;
                    gatheredTags.forEach((item, index) => {
                        if (item.name === tag) {
                            positionIndex = index;
                            return;
                        }
                    });


                    if (positionIndex === -1) {
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
            setDisplayTags(gatheredTags);
            setTags(gatheredTags);
        }
    };

    useEffect(() => {
        gatherTags();
    }, []);

    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '2rem', '2rem']}>
            <Flex align={['center', '', '', '']} minWidth='100%' zIndex={1000}>
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['.5rem', '2rem', '2.5rem']}
                        size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Explore
                    </Heading>
                    <Flex alignItems='center' direction={['column', 'column', 'row', 'row']} justifyContent={'space-between'}>
                        <Heading as='h2' fontWeight='normal' noOfLines={1} pb={['1rem', '1rem', '', '']} size={['sm', 'md', 'lg', 'xl']} textAlign='left'>
                            Collections{showCollection === 0 ? null : <>: {collectionName} </>}
                        </Heading>
                        <Spacer display={['none', 'none', 'block', 'block']} />
                        <InputGroup maxWidth={['100%', '100%', '16rem', '16rem']}>
                            <InputLeftElement pointerEvents='none'><SearchIcon /></InputLeftElement>
                            <Input onChange={(e) => onSearchBarChange(e.target.value)} placeholder='Search' type='text' />
                        </InputGroup>
                    </Flex>
                </Box>
            </Flex>
            {showCollection === 0 ? <SimpleGrid maxH={['67vh', '66vh', '75vh', '75vh']} minChildWidth={['13rem', '13rem', '13rem', '15rem']} overflowY='auto' padding={'1.7rem'} spacing='2rem'>
                {displayTags.length > 0 ?
                    displayTags.map((tag, index) => <Collection collectionName={tag.name} count={tag.count} displayCollection={displayCollection} images={tag.imageData} key={index} setCollectionName={setCollectionName} setDisplayCollection={setDisplayCollection} setShowCollection={setShowCollection} thumbnail={tag.imageData[0].url} />)
                    : <> {tags.length > 0 ? <Text> No collections was found.</Text>
                        : <Text> No collections created. Add tags to uploaded images to get started.</Text>}</>

                }
            </SimpleGrid> :

                <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>

                    <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '14rem', '15rem']} overflowY='auto' spacing='2rem'>
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


                    <Button height='3.5rem' leftIcon={<AiOutlineRollback />} maxW='16rem' minW='15rem' onClick={onClickBackToCollection} style={{ marginTop: '50px' }}>Back To Folder</Button>

                </Flex>}

        </Flex>
    );
};