import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spacer, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { PhotoCard } from '../components/PhotoCard';
import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';

import useStore from '../store/store';
import { UserStore } from '../interfaces/UserStore';
import UploadModal from '../components/UploadModal';

const Uploads = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;
    const [displayImages, setDisplayImages] = useState(images);

    const onSearchBarChange = (searchQuery: string): void => {
        let newImageList = [];
        if (searchQuery.length <= 0) {
            newImageList = images;
        } else {
            images.map(image => {
                if ((image.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (image.format.toLowerCase().includes(searchQuery.toLowerCase()))) {
                    newImageList.push(image);
                }
            });
        }
        setDisplayImages(newImageList);
    };

    //Helper function to sort images by name A -> Z
    const sortByNameAtoZ = (a: any, b: any) => {
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();

        let comparison = 0;

        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    };

    //Helper function to sort images by name Z -> A
    const sortByNameZtoA = (a: any, b: any) => {
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();

        let comparison = 0;

        if (name1 < name2) {
            comparison = 1;
        } else if (name1 > name2) {
            comparison = -1;
        }
        return comparison;
    };

    const onSortMenuClick = (e: any): void => {
        const eventType = e.target.innerHTML;
        console.log(displayImages);
        switch (eventType) {
        case 'A-Z':
            setDisplayImages([...displayImages].sort(sortByNameAtoZ));
            break;
        case 'Z-A':
            setDisplayImages([...displayImages].sort(sortByNameZtoA));
            break;
        case 'Last Updated':
            // Sort by Last updated function will go here
            break;
        case 'File Size':
            //Sort by file size function will go here
            break;
        default:
            break;
        };
    };
    return (
        <Flex align={['center', 'normal', 'normal', 'normal']} direction='column' maxH={'100vh'} p={['1rem', '2rem', '4rem', '3rem']} width='100%'>
            <Flex align={['center', 'center', '', '']} >
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Uploaded Images
                    </Heading>
                    <Tabs display={'none'} paddingBottom={['1rem', '', '', '3rem']} >
                        <TabList>
                            <Tab>All</Tab>
                            <Tab>Documents</Tab>
                            <Tab>Photos</Tab>
                            <Tab>People</Tab>
                        </TabList>
                    </Tabs>
                    <Flex direction={['column', 'column', 'column', 'row']} justifyContent='space-between'>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width={['100%', '100%', '100%', '22%']}>
                                Filters
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={(e) => onSortMenuClick(e)}>A-Z</MenuItem>
                                <MenuItem onClick={(e) => onSortMenuClick(e)}>Z-A</MenuItem>
                                <MenuItem onClick={(e) => onSortMenuClick(e)}>Last Updated</MenuItem>
                                <MenuItem onClick={(e) => onSortMenuClick(e)}>File Size</MenuItem>
                            </MenuList>
                        </Menu>

                        <Spacer />

                        <Flex width={['100%', '100%', '100%', '22%']}>
                            <InputGroup>
                                <InputLeftElement pointerEvents={'none'}>
                                    <Search2Icon />
                                </InputLeftElement>
                                <Input onChange={(e) => onSearchBarChange(e.target.value)} placeholder={'Search'} type={'search'} />
                            </InputGroup>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            <SimpleGrid marginTop={'1rem'} maxH={['67vh', '66vh', '77vh', '77vh']} minChildWidth={['13rem', '13rem', '14rem', '15rem']} overflowY='scroll' spacing='2rem'>
                {displayImages.length > 0 ? displayImages.map(image => {
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

            <Flex float={'right'} height='100%' justifyContent='space-between' paddingTop='2.75rem'>
                <Spacer />
                <UploadModal />
            </Flex>
        </Flex>
    );
};

export default Uploads;
