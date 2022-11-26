import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, SimpleGrid, Spacer, Text, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { PhotoCard } from '../components/PhotoCard';
import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

import useStore from '../store/store';
import { UserStore } from '../interfaces/UserStore';
import UploadModal from '../components/UploadModal';
import { getAllImages } from '../services/api/image-service';
import { successResponse } from '../utils/ResponseUtils';
import { Image } from '../interfaces/Image';

const Uploads = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;
    const [displayImages, setDisplayImages] = useState<Image[]>([]);
    const [imagesLoadingFlag, setImagesLoadingFlag] = useState(Boolean);

    const getImages = async () => {
        setImagesLoadingFlag(false);
        try {
            const getImagesResponse: any = await getAllImages();
            if (successResponse(getImagesResponse)) {
                const imagesRawObj = getImagesResponse.data.data.images;
                const imagesRawList = Object.values(imagesRawObj);
                let imagesList: Image[] = imagesRawList.map((imgData: any) => {
                    return castRawToImage(imgData);
                });
                //update the local state (which will be used for local operations like search/sort)
                setDisplayImages([...imagesList]);
                //update the store which is main source of truth
                store.updateImagesList([...imagesList]);
                //fake loading effect
                setTimeout(() => setImagesLoadingFlag(true), 300);
            }
        } catch (error) {
            setImagesLoadingFlag(true);
            console.log(error);
        }
    };


    useEffect(() => {
        //Fetch new images and update the local store as well as component state images
        getImages();
    }, []);

    const onSearchBarChange = (searchQuery: string): void => {
        let newImageList: Image[] = [];
        if (searchQuery.length <= 0) {
            newImageList = images;
        } else {
            images.map(image => {
                if ((image.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (image.format.toLowerCase().includes(searchQuery.toLowerCase()))) {
                    newImageList.push(image);
                }
            });
        }
        setDisplayImages(newImageList);
    };

    //Helper function to sort images by name A -> Z
    const sortByNameAtoZ = (a: Image, b: Image) => {
        const name1 = a.title.toUpperCase();
        const name2 = b.title.toUpperCase();

        let comparison = 0;

        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    };

    //Helper function to sort images by name Z -> A
    const sortByNameZtoA = (a: Image, b: Image) => {
        const name1 = a.title.toUpperCase();
        const name2 = b.title.toUpperCase();

        let comparison = 0;

        if (name1 < name2) {
            comparison = 1;
        } else if (name1 > name2) {
            comparison = -1;
        }
        return comparison;
    };

    // Helper function to sort images by size
    const sortBySizeAscending = (a: Image, b: Image) => {
        const size1 = a.size;
        const size2 = b.size;
        let comparison = 0;

        if (size1 > size2) {
            comparison = 1;
        } else if (size1 < size2) {
            comparison = -1;
        }
        return comparison;
    };
    // Helper function to sort images by size
    const sortBySizeDescending = (a: Image, b: Image) => {
        const size1 = a.size;
        const size2 = b.size;
        let comparison = 0;

        if (size1 < size2) {
            comparison = 1;
        } else if (size1 > size2) {
            comparison = -1;
        }
        return comparison;
    };

    // Helper function to sort images by upload date
    const sortByDateAscending = (a: Image, b: Image) => {
        const size1 = a.uploadedDateTime;
        const size2 = b.uploadedDateTime;
        let comparison = 0;

        if (size1 > size2) {
            comparison = 1;
        } else if (size1 < size2) {
            comparison = -1;
        }
        return comparison;
    };
    // Helper function to sort images by upload date
    const sortByDateDescending = (a: Image, b: Image) => {
        const size1 = a.uploadedDateTime;
        const size2 = b.uploadedDateTime;
        let comparison = 0;

        if (size1 < size2) {
            comparison = 1;
        } else if (size1 > size2) {
            comparison = -1;
        }
        return comparison;
    };

    const onSortMenuClick = (e: any): void => {
        const eventType = e.target.innerHTML;
        switch (eventType) {
        case 'A-Z':
            setDisplayImages([...displayImages].sort(sortByNameAtoZ));
            break;
        case 'Z-A':
            setDisplayImages([...displayImages].sort(sortByNameZtoA));
            break;
        case 'File Size ↑':
            setDisplayImages([...displayImages].sort(sortBySizeDescending));
            break;
        case 'File Size ↓':
            setDisplayImages([...displayImages].sort(sortBySizeAscending));
            break;
        case 'Last Updated ↑':
            setDisplayImages([...displayImages].sort(sortByDateAscending));
            break;
        case 'Last Updated ↓':
            setDisplayImages([...displayImages].sort(sortByDateDescending));
            break;
        default:
            break;
        };
    };

    //Helper functions for image information

    //Converts a number to formatted bytes
    const formatBytes = (bytes: number, decimals = 2): string => {
        if (!+bytes) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    //Returns a formatted date from Epoch seconds
    const convertEpochToDate = (epochStamp: number): string => {
        const d = new Date(0);
        d.setUTCSeconds(epochStamp);
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const castRawToImage = (obj: any): Image => {
        const image = {} as Image;
        image['id'] = obj.data._id;
        image['title'] = obj.data.title;
        image['format'] = obj.data.format;
        image['size'] = obj.data.size;
        image['caption'] = obj.data.caption;
        image['tags'] = obj.data.tags;
        image['categories'] = obj.data.categories;
        image['url'] = obj.presignedUrl;
        image['location'] = obj.data.location;
        image['lastModifiedDateTime'] = obj.data.lastModifiedDateTime;
        image['uploadedDateTime'] = obj.data.uploadedDateTime;

        return image;
    };

    return (
        <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>
            <Flex align={['center', 'center', '', '']} >
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Uploaded Images
                    </Heading>
                    <Flex direction={['column', 'column', 'row', 'row']} justifyContent='space-between'>
                        <Menu>
                            <MenuButton as={Button} disabled={images.length <= 0 ? true : false} rightIcon={<ChevronDownIcon />} width={['100%', '100%', '45%', '22%']}>
                                Filters
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup title='Order' type='radio'>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='A-Z'>A-Z</MenuItemOption>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='Z-A'>Z-A</MenuItemOption>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='Last Updated ↑'>Last Updated ↑</MenuItemOption>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='Last Updated ↓'>Last Updated ↓</MenuItemOption>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='File Size ↑'>File Size ↑</MenuItemOption>
                                    <MenuItemOption onClick={(e: any) => onSortMenuClick(e)} value='File Size ↓'>File Size ↓</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                        <Spacer />

                        <Flex width={['100%', '100%', '45%', '22%']}>
                            <InputGroup>
                                <InputLeftElement pointerEvents={'none'}>
                                    <Search2Icon />
                                </InputLeftElement>
                                <Input disabled={images.length <= 0 ? true : false} onChange={(e) => onSearchBarChange(e.target.value)} placeholder={'Search'} type={'search'} />
                            </InputGroup>
                        </Flex>
                    </Flex>
                </Box>
            </Flex >
            <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '13rem', '15rem']} overflowY='auto' spacing='2rem'>
                {images.length > 0 ?
                    (displayImages.length > 0 ? displayImages.map(image => {
                        return (<PhotoCard
                            caption={image.caption}
                            categories={image.categories}
                            date={convertEpochToDate(parseInt(image.uploadedDateTime))}
                            format={image.format}
                            imageURL={image.url}
                            isLoaded={imagesLoadingFlag}
                            key={image.id}
                            location={image.location}
                            size={formatBytes(image.size)}
                            tags={image.tags}
                            title={image.title}
                        />);
                    }) : <Center>
                        <Text as='h1' noOfLines={2} paddingBottom='3rem' size='lg'>
                            No images matched your search!
                        </Text>
                    </Center>)
                    : <Center>
                        <Text as='h1' noOfLines={2} paddingBottom='3rem' size='lg'>
                            No images found. Please upload images!
                        </Text>
                    </Center>
                }
            </SimpleGrid>

            <Flex float={'right'} height='100%' justifyContent='space-between' paddingTop='2.75rem'>
                <Spacer />
                <UploadModal />
            </Flex>
        </Flex >
    );
};

export default Uploads;
