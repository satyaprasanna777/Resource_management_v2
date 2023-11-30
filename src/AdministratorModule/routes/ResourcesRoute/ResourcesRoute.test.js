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
        resourcesService = new ResourcesService();
        resourcesStore = new ResourcesStore(resourcesService, itemsService);
    });

    it("should contain add button in header", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText } = render(
            <Provider resourcesStore={resourcesStore}>
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

    it("it should go add resource route ", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText, getByTestId } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <AdminDashBoardRoute />
            </Route>
            <Route exact path={AddResourcePath}>
                <LocationDisplay />
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
        fireEvent.click(addButton);

        await
        waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(AddResourcePath);
        });

    });

    it("it should go add resource details Route ", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText, getByTestId } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <AdminDashBoardRoute />
            </Route>
            <Route exact path={ResourcesDetailsPath}>
                <LocationDisplay />
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
        const resourceCard = getByTestId("resource-card");
        fireEvent.click(resourceCard);

        await
        waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent('/admin-dashboard/2');
        });

    });

    it("it should show searched results ", async() => {

        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        const { getByRole, getByText, getByTestId, getByPlaceholderText } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <AdminDashBoardRoute />
            </Route>
            <Route exact path={ResourcesDetailsPath}>
                <LocationDisplay />
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
        const searchField = getByPlaceholderText('Search');
        fireEvent.change(searchField, { target: { value: 'rajasdfsdfdsfdfsdfsdf' } });
        expect(resourcesStore.getResources.length).toBe(0);

    });


});
