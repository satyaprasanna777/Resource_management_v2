/*global jest,expect*/
import React from 'react';
import AddItemRoute from './';
import ResourcesStore from '../../stores/ResourcesStore';
import ResourcesService from '../../services/ResourcesService/ResourcesService.fixture';
import { ItemsService } from '../../services/ItemsService/ItemsService.fixture';
import itemsData from '../../fixtures/ItemsService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { UpdateItemPath, AdminDashBoardPage } from '../../constants/RouteConstants';
import Strings from '../../i18n/Strings.json';
const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});

describe("should describe addItemRoute", () => {
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
        history.push(`${AdminDashBoardPage}/${id}/updateItem`);
        const { getByRole, getByTestId, debug } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <LocationDisplay/>
            </Route>
            <Route exact path={UpdateItemPath}>
                <AddItemRoute history={history} match={object} />
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
        resourcesStore.selectedResource.getItems(0, 4);
        const goBackButton = getByRole("button", { name: "< Resources" });
        fireEvent.click(goBackButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(AdminDashBoardPage);
        });
    });


    it("should show enterd details while user entering details in form", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/admin-dashboard/${1}/${2}`);
        const { getByRole, getByPlaceholderText } = render(
            <Provider resourcesStore={resourcesStore}>
            <Router history={history}>
            <Route exact path={UpdateItemPath}>
                <AddItemRoute history={history} match={object} />
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
        const itemNameField = getByPlaceholderText(Strings.addItem.itemNameLabelText);
        const resourceNameField = getByPlaceholderText(Strings.addItem.resourceNameLabelText);
        const LinkField = getByPlaceholderText(Strings.addResource.linkTextForLabel);
        const discriptionField = getByPlaceholderText(Strings.addItem.discriptionTextForLabel);
        const itemName = "test-item";
        const resourceName = "test-resourceName";
        const link = "test-link";
        const discription = "test-discription";
        const submitButton = getByRole("button", { name: 'UPDATE ITEM' });

        fireEvent.change(itemNameField, { target: { value: itemName } });
        fireEvent.change(resourceNameField, { target: { value: resourceName } });
        fireEvent.change(LinkField, { target: { value: link } });
        fireEvent.change(discriptionField, { target: { value: discription } });

        fireEvent.click(submitButton);
        expect(itemNameField).not.toBeInTheDocument();

    });

});
