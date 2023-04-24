import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import { SnackbarProvider } from 'notistack';
import { rootRouter } from './routers/main';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={rootRouter} />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
