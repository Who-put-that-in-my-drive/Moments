import React, { useEffect, useState } from 'react';


const Container: React.FC = () => {
  const [message, setMessage] = useState('Waiting for message from backend...');
  useEffect(()=>{
    fetch('/test')
    .then(res => res.json())
    .then(data => { setMessage(data.data)})
  }, []);

  return(
  <div> 
    <h1>Hello from Moments team!</h1>
    <h2>{message}</h2> 
  </div>)
  
};

export default Container;