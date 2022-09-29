import React, { useEffect, useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'

const MainContainer: React.FC = () => {
  const [message, setMessage] = useState(<Spinner />);
  useEffect(()=>{
    fetch('/test')
    .then(res => res.json())
    .then(data => { setMessage(data.data)})
  }, []);

  return(
    <Container>
    <div> 
    <Heading as='h1' size='xl' noOfLines={1}>
    Hello from Moments team!
    </Heading>
      <h2>{message}</h2> 
    </div>
    </Container>
 )
  
};

export default MainContainer;