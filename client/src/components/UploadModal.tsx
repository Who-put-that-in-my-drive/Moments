import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import '../assets/DnD.scss';
import { uploadImageToS3 , uploadImage } from '../services/api/image-service';
import { successResponse } from '../utils/ResponseUtils';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import DragAndDrop from './DragAndDrop';

export interface UploadFormDTO {
    title: string,
    format: any,
    size: string,
    caption: string,
    tags: string[],
    location: string,
}

let formData = {
    caption: '',
    format: '',
    location: '',
    size: '',
    tags: [],
    title: '',
};

let imageBytes: any;

export const UploadModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        //@ts-ignore
        formData = {...formData, caption: e.target.caption.value, location: e.target.location.value, tags: e.target.tags.value, title: e.target.title.value,};
        sendFormData(formData);
    };

    const sendFormData = async (uploadFormDTO: UploadFormDTO) => {
        try {
            const response: any = await uploadImage(uploadFormDTO);
            if (successResponse(response)) {
                const presignedURL = response.data.data.presignedUrl;

                uploadImageToS3(imageBytes, presignedURL, uploadFormDTO.format);
            } else {
                // Set error response here
            }
        } catch (error: any) {

        }
    };

    const handleImageSubmit = (image: any, format: any, size: any) => {
        formData.format = format.split('/')[1];
        formData.size = size;
        imageBytes = image;
    };
    
    return (
        <>
            <Button leftIcon={<AiOutlineCloudUpload />} onClick={onOpen} width={'100%'}>Upload Images</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Image</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                {/* @ts-ignore */}
                                <DragAndDrop imageSubmitCallback={handleImageSubmit} />
                            </FormControl>

                            <FormControl isRequired my={3}>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name='title'
                                    type='text'
                                ></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Caption</FormLabel>
                                <Input
                                    name='caption'
                                    type='text'
                                ></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Input
                                    name='tags'
                                    type='text'
                                ></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    name='location'
                                    type='text'
                                ></Input>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Upload
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadModal;
