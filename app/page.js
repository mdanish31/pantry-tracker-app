// pantry-tracker-app/app/page.js
"use client";

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import PantryForm from '../components/PantryForm';
import Search from '../components/Search';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const Home = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentId, setCurrentId] = useState(null);

  const fetchPantryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pantry'));
      setPantryItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log('Pantry Items Fetched:', querySnapshot.docs);
    } catch (error) {
      console.error('Error fetching pantry items:', error);
    }
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom className="header">Pantry Tracker</Typography>
      <div className="form">
        <PantryForm currentId={currentId} setCurrentId={setCurrentId} fetchPantryItems={fetchPantryItems} />
      </div>
      <div className="search">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <List>
        {pantryItems.filter(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
          <ListItem key={item.id} button className="list-item" onClick={() => {
            setCurrentId(item.id);
            setSearchTerm('');
          }}>
            <ListItemText primary={`${item.itemName} - ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;
