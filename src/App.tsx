import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom'

import CommonContainerComponent from './pages/container';
import SignScreen from './pages/sign';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/home" component={CommonContainerComponent} />
        <Route path="/sign" component={SignScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
