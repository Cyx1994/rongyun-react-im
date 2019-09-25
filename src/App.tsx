import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CommonContainerComponent from './pages/container';
import SignScreen from './pages/sign';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/sign" component={SignScreen} />
          <Route path="/home" component={CommonContainerComponent} />
          <Redirect to="/sign" />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
