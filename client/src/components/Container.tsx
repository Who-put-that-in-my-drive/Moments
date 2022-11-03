import { useEffect, useState } from 'react';
import { Container, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
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
                <Heading as='h1' size='xl' noOfLines={1}>
                    Hello from Moments team!
                </Heading >
                <Heading size='md'>{message}
                    <Spinner size="md" hidden={!spinnerDisplay} /></Heading>
            </div>
        </Container>
    );

};

export default MainContainer;
