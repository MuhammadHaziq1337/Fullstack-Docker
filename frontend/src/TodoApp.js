import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!text) return;
    
    try {
      const res = await axios.post('http://localhost:5000/api/items', { text });
      setItems([res.data, ...items]);
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Docker Full Stack App with Flask-updated</h1>
        <form onSubmit={addItem}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new item 123"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {items.map(item => (
            <li key={item._id || item.id}>{item.text}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default TodoApp;