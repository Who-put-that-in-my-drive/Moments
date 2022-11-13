import {AspectRatio, Box, Flex, Image, Text, useDisclosure} from '@chakra-ui/react';

import { CollectionProps } from '../utils/ComponentPropTypes';

export const Collection = (props: CollectionProps) => {
    const { onOpen } = useDisclosure();
    return (
        <Flex onClick={onOpen} w='full'>
            <AspectRatio boxShadow='dark-lg' minW='15rem'  ratio={16 / 9}>
                <Image
                    alt={`Picture of ${props.collectionName}`}
                    objectFit={'cover'}
                    rounded="lg"
                    src={props.thumbnail}

                />
            </AspectRatio>
            <Box>
                <Text as='b' fontSize='xl' textAlign='left'>{props.collectionName}</Text>
                <Text fontSize='sm' textAlign='left'>{props.numberOfItems}</Text>
            </Box>
        </Flex>);
};