import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import ParallaxRoot from './components/ParallaxRoot';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <ParallaxRoot />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
