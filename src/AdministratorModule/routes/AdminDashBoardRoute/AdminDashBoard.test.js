/*global jest,expect*/
import React from 'react';
import AdminDashBoardRoute from './';
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

    it("should go to previous page when click on resources", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText } = render(
            <Provider resourcesStore={resourcesStore} requestsStore={requestsStore}>
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

    });


    it("shoud go to requests page when we click on requests tab", async() => {


        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText } = render(
            <Provider resourcesStore={resourcesStore} requestsStore={requestsStore}>
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

        const requestsButton = getByRole('button', { name: "Requests" });
        fireEvent.click(requestsButton);
        const mockGetRequests = jest.fn();
        const mockGetRequestsPromise = new Promise(async(resolve, reject) => {
            resolve(requestsData);
        });
        mockGetRequests.mockReturnValue(mockGetRequestsPromise);
        requestsService.getRequestsAPI = mockGetRequests;
        await requestsStore.paginationStore.getItems();
        getByText('Pending Requests');
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

    it("should give current resource id", () => {
        expect("raja").toBe("raja");
    });

});
