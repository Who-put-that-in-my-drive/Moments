import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

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
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import React from 'react';

export const UploadModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    //@ts-ignore
    const uppy = new Uppy({restrictions: {
        allowedFileTypes: ['image/*'],
        maxFileSize: 100000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1
    }});
    
    // @ts-ignore
    uppy.use(AwsS3, {
        // @ts-ignore
        getUploadParameters: (file) => {
            return {
                // fields: data.fields,
                // Provide content type header required by S3
                headers: {
                    'Content-Type': file.type
                },
                method: 'PUT',
                url:
                    'https://moments-gallery.s3.us-east-1.amazonaws.com/mwpereira07%40gmail.com/636345e0bc4617f0ee6b709f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA355WHX4HNB6Y352O%2F20221103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221103T043901Z&X-Amz-Expires=3600&X-Amz-Signature=dac235b0a6537a064b1220ed102490ee463b13b6c858eb3907eadf4b90aca468&X-Amz-SignedHeaders=host&x-id=PutObject'
            };
        }
    });
    
    React.useEffect(() => {
        return () => uppy.close({ reason: 'unmount' });
    }, [uppy]);

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="2xl"> 
                <ModalOverlay />
                
                <ModalContent>
                    <ModalHeader>Upload Image</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <form>
                            <FormControl>
                                <Dashboard
                                    // @ts-ignore
                                    autoProceed="true"
                                    uppy={uppy}
                                    metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
                                    height="400px"
                                    // @ts-ignore
                                    theme={localStorage.getItem('chakra-ui-color-mode').toString()}
                                />
                            </FormControl>
                            
                            <FormControl isRequired my={3}>
                                <FormLabel>Title</FormLabel>
                                <Input></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Caption</FormLabel>
                                <Input></Input>
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Upload
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadModal;