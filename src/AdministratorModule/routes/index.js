import React from 'react';
import { Route } from 'react-router-dom';
import {
    AdminResourcesPage,
    AdminDashBoardPage,
    AdminRequestsPage,
    AdminUsersPage,
    UpdateItemPage,
    ResourcesDetailsPath,
    AddResourcePath,
    UpdateResourcePath,
    AddItemPath,
    UpdateItemPath,
    UserDetailsPath,
    AddUserItemPath

}
from "../constants/RouteConstants";
import ResourcesRoute from './ResourcesRoute';
import ResquestsRoute from './ResquestsRoute';
import UsersRoute from './UsersRoute';
import ResourceDetailsRoute from './ResourceDetailsRoute';
import AdminDashBoardRoute from './AdminDashBoardRoute';
import AddResourceRoute from './AddResourceRoute';
import UpdateResourceRoute from './UpdateResourceRoute';
import ProtectedRoute from '../../common/ProtectedRoute';
import AddItemRoute from './AddItemRoute';
import UpdateItemRoute from './UpdateItemRoute';
import UserDetailsRoute from './UserDetailsRoute';
import AddItemToUser from './AddItemToUser'

const administratorRoutes = [
    <ProtectedRoute key={Math.random()} exact path={AddResourcePath} component={AddResourceRoute} />,
    <ProtectedRoute key={Math.random()} exact path={UpdateResourcePath} component={UpdateResourceRoute} />,
    <ProtectedRoute key={Math.random()} exact path={AddItemPath} component={AddItemRoute} />,
    <ProtectedRoute key={Math.random()} exact path={UpdateItemPath} component={UpdateItemRoute} />,
    <ProtectedRoute key={Math.random()} exact path={AdminResourcesPage} component={ResourcesRoute} />,
    <ProtectedRoute key={Math.random()} exact path={AdminRequestsPage} component={ResquestsRoute} />,
    <ProtectedRoute key={Math.random()} exact path={AdminUsersPage} component={UsersRoute} />,
    <ProtectedRoute key={Math.random()} exact path={ResourcesDetailsPath} component={ResourceDetailsRoute} />,
    <ProtectedRoute key={Math.random()} exact path={UserDetailsPath} component={UserDetailsRoute} />,
    <ProtectedRoute key={Math.random()} exact path={AddUserItemPath} component={AddItemToUser} />,
    <ProtectedRoute key={Math.random()} exact path={AdminDashBoardPage} component={AdminDashBoardRoute} />,
];

export default administratorRoutes;
