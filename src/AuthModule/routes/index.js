import React from "react";
import { Route } from 'react-router-dom';
import SignInRoute from './SignInRoute';
import { SignUpRoute } from './SignUpRoute'
import { RESOURCE_MANAGEMENT_SIGN_UP_PATH, RESOURCE_MANAGEMENT_SIGN_IN_PATH } from "../constants/RouteConstants"
const routes = [
    <Route key={Math.random()}  path={RESOURCE_MANAGEMENT_SIGN_UP_PATH} component={SignUpRoute} />,
    <Route key={Math.random()}  path={RESOURCE_MANAGEMENT_SIGN_IN_PATH} component={SignInRoute} />
];

export default routes;
