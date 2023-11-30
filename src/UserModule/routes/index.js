import React from 'react';
import { Route } from 'react-router-dom';
import { UserDashBoardPath } from '../constants/RouteConstants';
import UserDashBoardRoute from './UserDashBoardRoute';

const UserRoutes = [
    <Route key={Math.random()} exact path={UserDashBoardPath} component={UserDashBoardRoute} />,
];
export default UserRoutes;
