import React from 'react';
import { ListGroup } from 'react-bootstrap';

const LibraryList = ({ properties }) => {
 return (
   <ListGroup>
     {properties.map((Library, index) => (
       <ListGroup.Item key={index}>
         <h2>{Library.title}</h2>
         <p>{Library.author}</p>
         <p>{Library.description}</p>
         <p>{Library.price}</p>
       </ListGroup.Item>
     ))}
   </ListGroup>
 );
};

export default LibraryList;