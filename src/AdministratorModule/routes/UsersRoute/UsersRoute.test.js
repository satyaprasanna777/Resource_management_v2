/*global jest,expect*/
import React from 'react';


import ResourcesStore from '../../stores/ResourcesStore';
import RequestsStore from '../../stores/RequestsStore';
import UsersStore from '../../stores/UsersStore';
import UsersService from '../../services/UsersService/UsersService.fixture';
import ResourcesService from '../../services/ResourcesService/ResourcesService.fixture';
import { ItemsService } from '../../services/ItemsService/ItemsService.fixture';
import resourcesData from '../../fixtures/ResourcesService.fixture.json';
import requestsData from '../../fixtures/RequestsService.fixture.json';
import RequestsService from '../../services/RequestsServices/RequestsServices.fixture';
import itemsData from '../../fixtures/ItemsService.fixture.json';
import usersData from '../../fixtures/UsersService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { AdminDashBoardPage } from '../../constants/RouteConstants';
import Strings from '../../i18n/Strings.json';
import PaginationStore from '../../stores/PaginationStore';

import AdminDashBoardRoute from './';
//import { AdminDashBoardPage, UserDetailsPath, AddResourcePath, ResourcesDetailsPath } from '../../constants/RouteConstants';

const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});

describe("should show resources when the toggle is resources", () => {
    let resourcesService;
    let resourcesStore;
    let itemsService;
    let requestsStore;
    let requestsService;
    let usersStore;
    let usersService;


    beforeEach(() => {
        itemsService = new ItemsService();
        resourcesService = new ResourcesService();
        resourcesStore = new ResourcesStore(resourcesService, itemsService);
        requestsService = new RequestsService();
        usersService = new UsersService();
        usersStore = new UsersStore(usersService, itemsService);
        requestsStore = new RequestsStore(requestsService, PaginationStore);
    });



    it("shoud go to usres page when we click on users tab", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText } = render(
            <Provider resourcesStore={resourcesStore} usersStore={usersStore} requestsStore={requestsStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <AdminDashBoardRoute />
            </Route>
            </Router>
        </Provider>
        );

        const mockGetResources = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(resourcesData);
        });
        mockGetResources.mockReturnValue(mockGetItemsPromise);
        resourcesService.getResourceAPI = mockGetResources;
        await resourcesStore.getResourcesList();
        const addButton = getByRole("button", { name: "+add" });

        const usersButton = getByRole('button', { name: "Users" });
        fireEvent.click(usersButton);
        const mockGetRequests = jest.fn();
        const mockGetRequestsPromise = new Promise(async(resolve, reject) => {
            resolve(usersData);
        });
        mockGetRequests.mockReturnValue(mockGetRequestsPromise);
        usersService.getUsersAPI = mockGetRequests;
        await usersStore.getUsersList();
        getByText('PERSON NAME');

    });


    // it("should contain add button in header", async() => {

    //     const history = createMemoryHistory();
    //     history.push(AdminDashBoardPage);
    //     const { getByRole, getByText } = render(
    //         <Provider resourcesStore={resourcesStore}>
    //         <Router history={history}>
    //         <Route exact path={AdminDashBoardPage}>
    //             <AdminDashBoardRoute />
    //         </Route>
    //         </Router>
    //     </Provider>
    //     );

    //     const mockGetResources = jest.fn();
    //     const mockGetItemsPromise = new Promise((resolve, reject) => {
    //         resolve(ResourcesData);
    //     });
    //     mockGetResources.mockReturnValue(mockGetItemsPromise);
    //     resourcesService.getResourceAPI = mockGetResources;
    //     await resourcesStore.getResourcesList();
    //     const mockGetUsers = jest.fn();
    //     const mockGetUserItemsPromise = new Promise((resolve, reject) => {
    //         resolve(usersData);
    //     });
    //     mockGetUsers.mockReturnValue(mockGetUserItemsPromise);
    //     usersService.getUsersAPI = mockGetResources;
    //     await usersStore.getUsersList();


    // });

    // it("it should go add resource route ", async() => {

    //     const history = createMemoryHistory();
    //     history.push(AdminDashBoardPage);
    //     const { getByRole, getByText, getByTestId } = render(
    //         <Provider resourcesStore={resourcesStore}>
    //         <Router history={history}>
    //         <Route exact path={AdminDashBoardPage}>
    //             <AdminDashBoardRoute />
    //         </Route>
    //         <Route exact path={AddResourcePath}>
    //             <LocationDisplay />
    //         </Route>
    //         </Router>
    //     </Provider>
    //     );
    //     const mockGetResources = jest.fn();
    //     const mockGetItemsPromise = new Promise((resolve, reject) => {
    //         resolve(usersData);
    //     });
    //     mockGetResources.mockReturnValue(mockGetItemsPromise);
    //     usersService.getUsersAPI = mockGetResources;
    //     await usersStore.getUsersList();
    //     const addButton = getByRole("button", { name: "+add" });
    //     fireEvent.click(addButton);

    //     await
    //     waitFor(() => {
    //         expect(getByTestId("location-display")).toHaveTextContent(AddResourcePath);
    //     });

    // });

    // it("it should go add user details Route ", async() => {

    //     const history = createMemoryHistory();
    //     history.push(AdminDashBoardPage);
    //     const { getByRole, getByText, getByTestId } = render(
    //         <Provider resourcesStore={resourcesStore}>
    //         <Router history={history}>
    //         <Route exact path={AdminDashBoardPage}>
    //             <AdminDashBoardRoute />
    //         </Route>
    //         <Route exact path={UserDetailsPath}>
    //             <LocationDisplay />
    //         </Route>
    //         </Router>
    //     </Provider>
    //     );
    //     const mockGetResources = jest.fn();
    //     const mockGetItemsPromise = new Promise((resolve, reject) => {
    //         resolve(usersData);
    //     });
    //     mockGetResources.mockReturnValue(mockGetItemsPromise);
    //     usersService.getUsersAPI = mockGetResources;
    //     await usersStore.getUsersList();
    //     const resourceCard = getByTestId("user-card");
    //     fireEvent.click(resourceCard);

    //     await
    //     waitFor(() => {
    //         expect(getByTestId("location-display")).toHaveTextContent('/2/user');
    //     });

    // });

    // it("it should show searched results ", async() => {

    //     const history = createMemoryHistory();
    //     history.push(AdminDashBoardPage);
    //     const { getByRole, getByText, getByTestId, getByPlaceholderText } = render(
    //         <Provider resourcesStore={resourcesStore}>
    //         <Router history={history}>
    //         <Route exact path={AdminDashBoardPage}>
    //             <AdminDashBoardRoute />
    //         </Route>
    //         <Route exact path={ResourcesDetailsPath}>
    //             <LocationDisplay />
    //         </Route>
    //         </Router>
    //     </Provider>
    //     );
    //     const mockGetResources = jest.fn();
    //     const mockGetItemsPromise = new Promise((resolve, reject) => {
    //         resolve(usersData);
    //     });
    //     mockGetResources.mockReturnValue(mockGetItemsPromise);
    //     usersService.getUsersAPI = mockGetResources;
    //     await usersStore.getUsersList();
    //     const searchField = getByPlaceholderText('Search');
    //     fireEvent.change(searchField, { target: { value: 'rajasdfsdfdsfdfsdfsdf' } });
    //     expect(resourcesStore.getResources.length).toBe(0);

    // });


});
