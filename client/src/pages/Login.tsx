import Uppy from '@uppy/core';
import {Dashboard} from '@uppy/react';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import AwsS3 from '@uppy/aws-s3';

export default function Login() {
    //@ts-ignore
    const uppy = new Uppy({ autoProceed: false, debug: true, id: 'uppy1' });
    uppy.use(AwsS3, {
        companionUrl: 'https://moments-gallery.s3.us-east-1.amazonaws.com/mwpereira07%40gmail.com/63631b1f638c94cccebecaf3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA355WHX4HNB6Y352O%2F20221103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221103T013631Z&X-Amz-Expires=3600&X-Amz-Signature=a01cf5b3fb2755e35aa2fa445c5f24472f265450d6b51d4f963919695db5a6b5&X-Amz-SignedHeaders=host&x-id=PutObject',
        limit: 1,
        timeout: 300000,
    });

    return (
        <Dashboard
            // @ts-ignore
            autoProceed="true"
            uppy={uppy}
            metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
        />
    );
};
