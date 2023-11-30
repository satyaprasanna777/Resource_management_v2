/*global jest,expect*/
import React from 'react';
import ResourceDetailsRoute from './';
import ResourcesStore from '../../stores/ResourcesStore';
import ResourcesService from '../../services/ResourcesService/ResourcesService.fixture';
import { ItemsService } from '../../services/ItemsService/ItemsService.fixture';
import ResourcesData from '../../fixtures/ResourcesService.fixture.json'
import itemsData from '../../fixtures/ItemsService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { ResourcesDetailsPath, UpdateResourcePath, AddItemPath, AdminDashBoardPage } from '../../constants/RouteConstants';
import Strings from '../../i18n/Strings.json';
const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});

describe("should describe ResourceDetailsRoute", () => {
    let resourcesService;
    let resourcesStore;
    let itemsService;
    beforeEach(() => {
        itemsService = new ItemsService();
        resourcesService = new ResourcesService();
        resourcesStore = new ResourcesStore(resourcesService, itemsService);
    });

    it("should go to previous page when click on resources", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        history.push(`/admin-dashboard/${id}`);
        const { getByRole, getByTestId, debug } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <LocationDisplay/>
            </Route>
            <Route exact path={ResourcesDetailsPath}>
                <ResourceDetailsRoute history={history} match={object} />
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(itemsData);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        itemsService.getItemsAPI = mockGetItemsApi;
        await resourcesStore.getItems(id, 0, 4);
        resourcesStore.selectedResource.getItems(id, 0, 4);
        const goBackButton = getByRole("button", { name: "< Resources" });
        fireEvent.click(goBackButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(AdminDashBoardPage);
        });
    });

    it("should give current resource id", () => {
        expect("raja").toBe("raja");
    });

    it("should show ResourceDetails", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/admin-dashboard/${id}`);
        let responseObject = {
            "resource_id": id,
            "name": "sampleName",
            "thumbnail": "somethumbnail",
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData
        };
        const { getByRole, getByText, getByPlaceholderText } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={ResourcesDetailsPath}>
                <ResourceDetailsRoute history={history} match={object} />
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(responseObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        itemsService.getItemsAPI = mockGetItemsApi;
        await resourcesStore.getItems(id, 0, 4);
        resourcesStore.selectedResource.getItems(id, 0, 4);
        getByText('sampleName');
        getByText('www.www.com');
        getByText('someDescrption');
        getByText('Items');

    });

    it("should go to updateResource Route when we click on update Button", async() => {

        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/admin-dashboard/${id}`);
        let responseObject = {
            "resource_id": id,
            "name": "sampleName",
            "thumbnail": "somethumbnail",
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData
        };
        const { getByRole, getByText, getByTestId, getByPlaceholderText } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={ResourcesDetailsPath}>
                <ResourceDetailsRoute history={history} match={object} />
            </Route>
            <Route exact path={UpdateResourcePath}>
                <LocationDisplay/>
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(responseObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        itemsService.getItemsAPI = mockGetItemsApi;
        await resourcesStore.getItems(id, 0, 4);
        resourcesStore.selectedResource.getItems(id, 0, 4);
        const updateButton = getByRole('button', { name: 'UPDATE' });
        fireEvent.click(updateButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(`/admin-dashboard/${id}/updateresource`);
        });
    });

    it("should go to addItem Route when we click on update Button", async() => {

        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/admin-dashboard/${id}`);
        let responseObject = {
            "resource_id": id,
            "name": "sampleName",
            "thumbnail": "somethumbnail",
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData
        };
        const { getByRole, getByText, getByTestId, getByPlaceholderText } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={ResourcesDetailsPath}>
                <ResourceDetailsRoute history={history} match={object} />
            </Route>
            <Route exact path={AddItemPath}>
                <LocationDisplay/>
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(responseObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        itemsService.getItemsAPI = mockGetItemsApi;
        await resourcesStore.getItems(id, 0, 4);
        resourcesStore.selectedResource.getItems(id, 0, 4);
        const updateButton = getByRole('button', { name: 'ADD ITEM' });
        fireEvent.click(updateButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(`${AdminDashBoardPage}/${id}/addItem`);
        });
    });

    it("should go to addItem Route when we click on update Button", async() => {

        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/admin-dashboard/${id}`);
        let responseObject = {
            "resource_id": 1,
            "name": "sampleName",
            "thumbnail": "some thumbnail",
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData.items.slice(0, 4)
        };
        const { getByRole, getByText, getByTestId, getByPlaceholderText, debug } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={ResourcesDetailsPath}>
                <ResourceDetailsRoute history={history} match={object} />
            </Route>
            <Route exact path={AddItemPath}>
                <LocationDisplay/>
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(responseObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        itemsService.getItemsAPI = mockGetItemsApi;
        await resourcesStore.getItems(id, 0, 4);
        resourcesStore.selectedResource.getItems(id, 0, 4);
        const deleteButton = getByRole('button', { name: 'DELETE' });
        const itemsList = [
            { id: 1, isChecked: true, name: 'sai' },
            { id: 2, isChecked: true, name: 'saikrishna' },
            { id: 3, isChecked: true, name: 'saikrish' }
        ];
        fireEvent.click(deleteButton);

    });


});
