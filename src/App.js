import React, { useContext } from 'react';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import PublicRoutes from './config/PublicRoutes';
import PrivateRoutes from './config/PrivateRoutes';
import { StoreContext, StoreProvider } from './components/context/Store';

function Route() {
  const [store, setStore] = useContext(StoreContext);
  return (
    <React.Fragment>
      {store.user.isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </React.Fragment>
  );
}

function App(props) {
  const value = useContext(StoreContext);
  console.log(value);
  return (
    <BrowserRouter>
      <StoreProvider>
        <div className='App  '>
          <Route />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
