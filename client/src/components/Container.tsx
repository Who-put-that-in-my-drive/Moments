import React, { useEffect, useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'

const MainContainer: React.FC = () => {


  const [message, setMessage] = useState('Connecting to server...');
  const [spinnerDisplay, setSpinnerDisplay] = useState(true)
  useEffect(()=>{
    fetch('/api/test')
    .then(res => res.json())
    .then(data => { setMessage(data.data); setSpinnerDisplay(false)})
    .catch(error => console.log(error))
  }, []);

  return(
    <Container>
    <div>
    <Heading as='h1' size='xl' noOfLines={1}>
    Hello from Moments team!
    </Heading>
      <h2>{message}
      <Spinner size="sm" hidden={!spinnerDisplay} /></h2>
    </div>
    </Container>
 )

};

export default MainContainer;
