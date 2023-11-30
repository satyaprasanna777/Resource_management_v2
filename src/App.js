import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { resourcesStore, requestsStore, usersStore } from './AdministratorModule/stores'
import HomePage from "./components/HomePage";
import Page1 from "./components/Page1";
import "./App.css";
import authStore from './AuthModule/stores';
import { Provider } from 'mobx-react';
import routes from './AuthModule/routes';
import administratorRoutes from './AdministratorModule/routes';
import { userResourceItemsStore } from './UserModule/stores';
import NewRequestComponent from './UserModule/components/NewRequestComponent'
import UserRoutes from './UserModule/routes'
const App = () => {
  return (
    <Provider {...{authStore}} {...{requestsStore}} {...{userResourceItemsStore}} {...{resourcesStore}} {...{usersStore}}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/page-1">
          <Page1/>
        </Route>
        {routes}
        {administratorRoutes}
        {UserRoutes}
        <Route exact path='/newrequest-component' component={NewRequestComponent}/>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </Provider>
  );
};

export default App;
