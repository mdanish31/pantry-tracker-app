// pantry-tracker-app/components/PantryForm.js
"use client";

import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';

const PantryForm = ({ currentId, setCurrentId, fetchPantryItems }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      if (currentId) {
        const itemDoc = doc(db, 'pantry', currentId);
        const itemData = await getDoc(itemDoc);
        if (itemData.exists()) {
          setItemName(itemData.data().itemName);
          setQuantity(itemData.data().quantity);
        }
      } else {
        setItemName('');
        setQuantity('');
      }
    };
    fetchItem();
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      const itemDoc = doc(db, 'pantry', currentId);
      await updateDoc(itemDoc, { itemName, quantity });
      setCurrentId(null);
    } else {
      await addDoc(collection(db, 'pantry'), { itemName, quantity });
    }

    fetchPantryItems();
    setItemName('');
    setQuantity('');
  };

  const handleDelete = async () => {
    if (currentId) {
      const itemDoc = doc(db, 'pantry', currentId);
      await deleteDoc(itemDoc);
      setCurrentId(null);
      fetchPantryItems();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {currentId ? 'Update' : 'Add'} Item
      </Button>
      {currentId && (
        <Button onClick={handleDelete} variant="contained" color="secondary">
          Delete Item
        </Button>
      )}
    </form>
  );
};

export default PantryForm;
