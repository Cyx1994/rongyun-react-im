import React, { Suspense } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { SignScreen } from './modules/SignModule';
import CommonContainerComponent from './pages/container';
import WindowLoadingComponent from './components/WindowLoading';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<WindowLoadingComponent />} >
        <HashRouter>
          <Switch>
            <Route path="/sign" component={SignScreen} />
            <Route path="/home" component={CommonContainerComponent} />
            <Redirect to="/sign" />
          </Switch>
        </HashRouter>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
