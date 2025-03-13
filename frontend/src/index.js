import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './TodoApp';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);