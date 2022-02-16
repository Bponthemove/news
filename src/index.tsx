import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { NewsContextProvider } from './context/NewsContext'

ReactDOM.render(
  <React.StrictMode>
    <NewsContextProvider>
      <App />
    </NewsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
