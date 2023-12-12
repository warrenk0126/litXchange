import React from 'react';
import LibraryList from './LibraryList';

const App = () => {
 const properties = [
   { title: 'Library 1', description: 'Description 1', price: '$100' },
   { title: 'Library 2', description: 'Description 2', price: '$200' },
   // more properties...
 ];

 return (
   <div className="container">
     <h1>Library Listings</h1>
     <LibraryList properties={properties} />
   </div>
 );
};

export default App;