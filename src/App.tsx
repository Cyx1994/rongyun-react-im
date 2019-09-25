import React from 'react';
import { BrowserRouter, Route, } from 'react-router-dom'

import CommonContainerComponent from './pages/container';
import SignScreen from './pages/sign';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/home" component={CommonContainerComponent} />
      <Route path="/sign" component={SignScreen} />
    </BrowserRouter>
  );
}

export default App;
