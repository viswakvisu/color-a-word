import React from 'react';
import { ToastContainer } from 'react-toastify';

import ColorsContextProvider from './components/ColorsContextProvider.js';
import UserInput from './components/UserInput.js';
import Grid from './components/Grid.js';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => (
    <ColorsContextProvider>
        <UserInput />
        <Grid />
        <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
        />
    </ColorsContextProvider>
);

export default App;