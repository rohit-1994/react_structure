import React, { PureComponent } from 'react';
import './styles.scss';
import './themes.scss';

import UIProvider from '../Components/HOC/UIProvider';
import AuthUIProvider from '../Components/HOC/AuthUIProvider';
import { Provider } from 'react-redux';
import { store, persistor } from '../Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import { RouteConfig } from '../Config/RouteConfig';
import RouterService from '../Services/RouterService';

import Header from '../Components/Molecule/Header';
import Footer from '../Components/Molecule/Footer';

/**
 * Importing all the required routes
 */
import Landing from '../Routes/Landing';
import ResetPassword from '../Routes/ResetPassword';
import PageNotFound from '../Routes/PageNotFound';

const PersistGateWithRouter = withRouter(PersistGate);

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AuthUIProvider>
          <UIProvider>
            <BrowserRouter ref={RouterService.setBrowserHistoryRef}>
              <PersistGateWithRouter persistor={persistor}>
                <Header />
                <Switch>
                  <Route exact path={RouteConfig.LANDING} component={Landing} />
                  <Route exact path={RouteConfig.RESET_PASSWORD} component={ResetPassword} />
                  <Route component={PageNotFound} />
                </Switch>
                <Footer />
              </PersistGateWithRouter>
            </BrowserRouter>
          </UIProvider>
        </AuthUIProvider>
      </Provider>
    );
  }
}

export default App;
