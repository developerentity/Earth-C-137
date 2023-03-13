import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import ParallaxRoot from './components/ParallaxRoot';

function App() {
  return (
    <Provider store={store}>
      <ParallaxRoot />
    </Provider>
  );
}

export default App;
