import { Container, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {getServerUrl} from '../utils/WebsiteUtils';

const MainContainer: React.FC = () => {

    const [message, setMessage] = useState('Connecting to server...');
    const [spinnerDisplay, setSpinnerDisplay] = useState(true);
    const URL = getServerUrl();
    useEffect(() => {
        axios.get(`${URL}/api/test`)
            .then(res => {
                const message = res.data;
                console.log(message);
                setMessage(message.message);
                setSpinnerDisplay(false);
            })
            .catch(error => console.log(error.message));
    }, []);

    return (
        <Container>
            <div>
                <Heading as='h1' noOfLines={1} size='xl'>
                    Hello from Moments team!
                </Heading >
                <Heading size='md'>{message}
                    <Spinner hidden={!spinnerDisplay} size="md" /></Heading>
            </div>
        </Container>
    );

};

export default MainContainer;
