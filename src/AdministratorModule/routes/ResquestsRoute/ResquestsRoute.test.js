/*global jest,expect*/
import React from 'react';
import AdminDashBoardRoute from './';
import ResourcesStore from '../../stores/ResourcesStore';
import RequestsStore from '../../stores/RequestsStore';
import UsersStore from '../../stores/UsersStore';
import UsersService from '../../services/UsersService/UsersService.fixture';
import ResourcesService from '../../services/ResourcesService/ResourcesService.fixture';
import { ItemsService } from '../../services/ItemsService/ItemsService.fixture';
import requestsData from '../../fixtures/ResourcesService.fixture.json';
import RequestsService from '../../services/RequestsServices/RequestsServices.fixture';
import itemsData from '../../fixtures/ItemsService.fixture.json';
import usersData from '../../fixtures/UsersService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { AdminDashBoardPage, AddResourcePath, ResourcesDetailsPath } from '../../constants/RouteConstants';
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
        requestsService = new RequestsService();
        requestsStore = new RequestsStore(requestsService, PaginationStore);
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
            resolve(requestsData);
        });
        mockGetResources.mockReturnValue(mockGetItemsPromise);
        requestsService.getRequestsAPI = mockGetResources;
        await requestsStore.paginationStore.getItems();
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


    it("shoud accept requests", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText, getByTestId } = render(
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
            resolve(requestsData);
        });
        mockGetResources.mockReturnValue(mockGetItemsPromise);
        requestsService.getRequestsAPI = mockGetResources;
        await requestsStore.paginationStore.getItems();
        const requestsButton = getByRole('button', { name: "Requests" });
        fireEvent.click(requestsButton);
        const mockGetRequests = jest.fn();
        const mockGetRequestsPromise = new Promise(async(resolve, reject) => {
            resolve(requestsData);
        });
        mockGetRequests.mockReturnValue(mockGetRequestsPromise);
        requestsService.getRequestsAPI = mockGetRequests;
        await requestsStore.paginationStore.getItems();
        let checkBox = getByTestId('request-card');
        fireEvent.click(checkBox);
        const acceptButton = getByRole("button", { name: 'ACCEPT' });
        fireEvent.click(acceptButton);
        // const confirmButton = getByRole("button", { name: "OK" })
        // fireEvent.click(confirmButton);

    });


    it("shoud reject requests", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText, getByTestId } = render(
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
            resolve(requestsData);
        });
        mockGetResources.mockReturnValue(mockGetItemsPromise);
        requestsService.getRequestsAPI = mockGetResources;
        await requestsStore.paginationStore.getItems();
        const requestsButton = getByRole('button', { name: "Requests" });
        fireEvent.click(requestsButton);
        const mockGetRequests = jest.fn();
        const mockGetRequestsPromise = new Promise(async(resolve, reject) => {
            resolve(requestsData);
        });
        mockGetRequests.mockReturnValue(mockGetRequestsPromise);
        requestsService.getRequestsAPI = mockGetRequests;
        await requestsStore.paginationStore.getItems();
        let checkBox = getByTestId('request-card');
        fireEvent.click(checkBox);
        const acceptButton = getByRole("button", { name: 'REJECT' });
        fireEvent.click(acceptButton);

        //fireEvent.keyDown(domNode, { key: 'Enter', code: 'Enter' })
        // const confirmButton = getByRole("button", { name: "OK" });
        // fireEvent.click(confirmButton)
    });

});
