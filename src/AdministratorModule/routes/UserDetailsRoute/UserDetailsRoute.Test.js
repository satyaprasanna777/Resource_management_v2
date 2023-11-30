/*global jest,expect*/
import React from 'react';
import UserDetailsRoute from './';
import UsersStore from '../../stores/UsersStore';
import UsersService from '../../services/UsersService/UsersService.fixture';
import { UserItemsService } from '../../services/UserItemsService/UserItemsService.fixture';
import usersData from '../../fixtures/UsersService.fixture.json'
import itemsData from '../../fixtures/ItemsService.fixture.json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { UserDetailsPath, UpdateResourcePath, AddItemPath, AdminDashBoardPage } from '../../constants/RouteConstants';
import Strings from '../../i18n/Strings.json';
const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});

describe("should describe UserDetailsRoute", () => {
    let usersService;
    let usersStore;
    let itemsService;
    beforeEach(() => {
        itemsService = new UserItemsService();
        usersService = new UsersService();
        usersStore = new UsersStore(usersService, itemsService);
    });

    it("should go to previous page when click on users", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(AdminDashBoardPage);
        history.push(`/${id}/user`);
        const { getByRole, getByTestId, debug } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={AdminDashBoardPage}>
                <LocationDisplay/>
            </Route>
            <Route exact path={UserDetailsPath}>
                <UserDetailsRoute history={history} match={object} />
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(itemsData);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        usersService.getItemsAPI = mockGetItemsApi;
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(id, 0, 4);
        const goBackButton = getByRole("button", { name: "< Users" });
        fireEvent.click(goBackButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(AdminDashBoardPage);
        });
    });

    it("should give current resource id", () => {
        expect("raja").toBe("raja");
    });

    it("should show userDetails", async() => {
        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/${id}/user`);
        let responseObject = {
            "resource_id": id,
            "name": "sampleName",
            "thumbnail": "somethumbnail",
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData
        };
        const { getByRole, getByText, getByPlaceholderText } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={UserDetailsPath}>
                <UserDetailsRoute history={history} match={object} />
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(responseObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        usersService.getItemsAPI = mockGetItemsApi;
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(id, 0, 4);
        getByText('sampleName');
        getByText('www.www.com');
        getByText('someDescrption');
        getByText('Items');

    });

    it("should go to addItem Route when we click on additem Button", async() => {

        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/${id}/user`);
        let users = usersData[0]
        let userObject = {
            "person_name": users.person_name,
            "user_id": users.user_id,
            "name": users.name,
            "department": users.department,
            "job_role": users.job_role,
            "pic": users.pic,
            "item_name": users.item_name,
            "access_level": users.access_level
        };
        const { getByRole, getByText, getByTestId, getByPlaceholderText } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={UserDetailsPath}>
                <UserDetailsRoute history={history} match={object} />
            </Route>
            <Route exact path={AddItemPath}>
                <LocationDisplay/>
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(userObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        usersService.getItemsAPI = mockGetItemsApi;
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(id, 0, 4);
        const updateButton = getByRole('button', { name: 'ADD ITEM' });
        fireEvent.click(updateButton);
        await waitFor(() => {
            expect(getByTestId("location-display")).toHaveTextContent(`${AdminDashBoardPage}/${id}/addItem`);
        });
    });

    it("should go to delete Route when we click on delete Button", async() => {

        const id = 1;
        const object = { params: { id: 1 } };
        const history = createMemoryHistory();
        history.push(`/${id}/user`);
        let users = usersData[0]
        let userObject = {
            "person_name": users.person_name,
            "user_id": users.user_id,
            "name": users.name,
            "department": users.department,
            "job_role": users.job_role,
            "pic": users.pic,
            "item_name": users.item_name,
            "access_level": users.access_level
        };
        const { getByRole, getByText, getByTestId, getByPlaceholderText, debug } = render(
            <Provider usersStore={usersStore}>
            <Router history={history}>
            <Route exact path={UserDetailsPath}>
                <UserDetailsRoute history={history} match={object} />
            </Route>
            <Route exact path={AddItemPath}>
                <LocationDisplay/>
            </Route>
            </Router>
        </Provider>
        );
        const mockGetItemsApi = jest.fn();
        const mockGetItemsPromise = new Promise((resolve, reject) => {
            resolve(userObject);
        });
        mockGetItemsApi.mockReturnValue(mockGetItemsPromise);
        usersService.getItemsAPI = mockGetItemsApi;
        await usersStore.getItems(id, 0, 4);
        usersStore.selectedResource.getItems(id, 0, 4);
        const deleteButton = getByRole('button', { name: 'DELETE' });
        const itemsList = [
            { id: 1, isChecked: true, name: 'sai' },
            { id: 2, isChecked: true, name: 'saikrishna' },
            { id: 3, isChecked: true, name: 'saikrish' }
        ];
        fireEvent.click(deleteButton);

    });


});
