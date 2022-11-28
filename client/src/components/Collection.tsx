import {
    AspectRatio,
    Box,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import { CollectionProps } from '../utils/ComponentPropTypes';

export const Collection = ({ images, collectionName, setDisplayCollection, count, thumbnail, displayCollection, setShowCollection, setCollectionName }: CollectionProps) => {

    const onClickCollection = () => {
        setShowCollection(1);
        setDisplayCollection(images);
        setCollectionName(collectionName);
        // displayCollection is for development testing 
        console.log(displayCollection);
    };

    return (
        <>

            <Flex direction={'column'} justifyContent="center" marginLeft={'0.8'} maxW='20rem' width='full'>
                <AspectRatio maxW='20rem' minW='15rem' ratio={16 / 9}>
                    <Image
                        _hover={{ cursor: 'pointer' }}
                        alt={`Collection thumbnail for ${collectionName}`}
                        objectFit={'cover'}
                        onClick={onClickCollection}
                        rounded="lg"
                        src={thumbnail}
                    />
                </AspectRatio>
                <Box marginTop='1.1rem'>
                    <Text fontSize='xl' textAlign='center'>{<b>{collectionName}</b>}</Text>
                    <Text fontSize='sm' textAlign='center'>{count} items</Text>
                </Box>
            </Flex>
        </>
    );
};