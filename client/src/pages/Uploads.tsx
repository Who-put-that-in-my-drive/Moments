import { Box, Button, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Spacer, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { PhotoCard } from '../components/PhotoCard';
import useStore from '../store/store';
import {UserStore} from '../interfaces/UserStore';
import { ChevronDownIcon, Search2Icon, SettingsIcon } from '@chakra-ui/icons';
// eslint-disable-next-line

const Uploads = () => {
    const store: UserStore = useStore();
    const user = store.user;
    const images = user.images;
    return (
        <Flex align={['center', 'center', 'normal', 'normal']} direction='column' p={['1rem', '2rem', '4rem', '4rem']} width='100%'>
            <Flex align={['center', '', '', '']} marginRight={'4rem'} zIndex={1000}>
                <Box w='100%'>
                    <Heading as='h2' noOfLines={2} paddingBottom={['1rem', '2rem', '3rem']} size={['xl', 'xl', '2xl', '3xl']} textAlign={['center', 'center', 'left', 'left']}>
                        Uploaded Images
                    </Heading>
                    <Tabs paddingBottom={['1rem', '', '', '3rem']} >
                        <TabList>
                            <Tab>All</Tab>
                            <Tab>Documents</Tab>
                            <Tab>Photos</Tab>
                            <Tab>People</Tab>
                        </TabList>
                    </Tabs>
                    <Flex paddingBottom={'4'}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Filters
                            </MenuButton>
                            <MenuList>
                                <MenuItem>A-Z</MenuItem>
                                <MenuItem>Z-A</MenuItem>
                                <MenuItem>Last Updated</MenuItem>
                                <MenuItem>File Size</MenuItem>
                            </MenuList>
                        </Menu>

                        <Spacer />
                        
                        <Flex alignItems={'flex-end'} width={'22%'}>
                            <InputGroup>
                                <InputLeftElement pointerEvents={'none'}>
                                    <Search2Icon />
                                </InputLeftElement>
                                <Input maxW={'60'} placeholder={'Search'} type={'search'} />
                            </InputGroup>

                            <IconButton
                                aria-label='Access Settings'
                                icon={<SettingsIcon />}
                            />
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            <SimpleGrid marginTop={'1rem'} maxH={['65vh', '69vh', '70vh', '75vh']} minChildWidth='15rem' overflowY='scroll' spacing='2rem'>
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
