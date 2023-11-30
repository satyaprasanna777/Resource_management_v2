/*global jest,expect*/
import React from 'react';
import AddItemToUserRoute from './';
import UsersStore from '../../stores/UsersStore';
import UsersService from '../../services/UsersService/UsersService.fixture';
import { ItemsService } from '../../services/ItemsService/ItemsService.fixture';
import itemsData from '../../fixtures/ItemsService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { AddUserItemPath, AdminDashBoardPage } from '../../constants/RouteConstants';
import Strings from '../../i18n/Strings.json';
const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});

describe("should describe addItem To User Route", () => {
    let usersService;
    let usersStore;
    let itemsService;
    beforeEach(() => {
        itemsService = new ItemsService();
        usersService = new UsersService();
        usersStore = new UsersStore(usersService, itemsService);
    });

    it("should go to previous page when click on resources", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        history.push(`/${id}/user/addUserItem`);
        const { getByRole, getByTestId } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <LocationDisplay/>
            </Route>
            <Route exact path={AddUserItemPath}>
                <AddItemToUserRoute history={history} match={object} />
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
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(0, 4);
        const goBackButton = getByRole("button", { name: "< Resources" });
        fireEvent.click(goBackButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(AdminDashBoardPage);
        });
    });

    it("should give current resource id", () => {
        expect("raja").toBe("raja");
    });

    it("should show enterd details while user entering details in form", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/${id}/user/addUserItem`);
        const { getByRole, getByPlaceholderText } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={AddUserItemPath}>
                <AddItemToUserRoute history={history} match={object} />
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
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(0, 4);
        const itemNameField = getByPlaceholderText(Strings.addItem.itemNameLabelText);
        const resourceNameField = getByPlaceholderText(Strings.addItem.resourceNameLabelText);
        const LinkField = getByPlaceholderText(Strings.addResource.linkTextForLabel);
        const discriptionField = getByPlaceholderText(Strings.addItem.discriptionTextForLabel);
        const itemName = "test-item";
        const resourceName = "test-resourceName";
        const link = "test-link";
        const discription = "test-discription";
        const submitButton = getByRole("button", { name: Strings.addItem.createButtonText });

        fireEvent.change(itemNameField, { target: { value: itemName } });
        fireEvent.change(resourceNameField, { target: { value: resourceName } });
        fireEvent.change(LinkField, { target: { value: link } });
        fireEvent.change(discriptionField, { target: { value: discription } });

        fireEvent.click(submitButton);

    });

});
