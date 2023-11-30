/*global jest,expect*/
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import AuthStore from '../../stores/AuthStore';
import {
    RESOURCE_MANAGEMENT_SIGN_UP_PATH,
    RESOURCE_MANAGEMENT_SIGN_IN_PATH,
    RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH
}
from "../../constants/RouteConstants";
import SignInService from '../../services/SignInService';
import SignInRoute from '.';

import getUserSignInResponse from "../../fixtures/SignInService.fixture.json";

const LocationDisplay = withRouter(({ location }) => {
    return <div data-testid="location-display">{location.pathname}</div>;
});
describe("SignIn Route", () => {
    let signInService;
    let authStore;

    beforeEach(() => {
        signInService = new SignInService();
        authStore = new AuthStore(signInService);
    });

    it("should render username empty error", () => {
        const { getByText, getByRole } = render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authStore={authStore}/>
            </Router>
        );
        const signInButton = getByRole("button", { name: "LOGIN" });
        fireEvent.click(signInButton);
        getByText(/Please enter username/i);
    });

    it("should render password empty error", () => {
        const { getByText, getByRole, getByPlaceholderText } = render(
            <Router history={createMemoryHistory()}>
                <SignInRoute authStore={authStore}/>
            </Router>
        );
        const username = "test-user";
        const usernameField = getByPlaceholderText("Username");
        fireEvent.change(usernameField, { target: { value: username } });
        const signInButton = getByRole('button', { name: 'LOGIN' });
        fireEvent.click(signInButton);
        getByText(/Please enter password/i);
    });
    it("should render signIn success state", async() => {
        const history = createMemoryHistory();
        const route = RESOURCE_MANAGEMENT_SIGN_IN_PATH;
        history.push(route);
        const { getByPlaceholderText, getByRole, queryByRole, getByTestId } = render(
            <Provider authStore={authStore}>
                <Router history={history}>
                    <Route path={RESOURCE_MANAGEMENT_SIGN_IN_PATH}>
                        <SignInRoute />
                    </Route>
                    <Route path={RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH}>
                        <LocationDisplay/>
                    </Route>
                </Router>
            </Provider>
        );
        const userName = "test-user";
        const password = "test-password";

        const userNameField = getByPlaceholderText("Username");
        const signInButton = getByRole('button', { name: 'LOGIN' });
        const mockSignInAPI = jest.fn();
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(getUserSignInResponse);
        });
        mockSignInAPI.mockReturnValue(mockSuccessPromise);
        signInService.signInAPI = mockSignInAPI;

        fireEvent.change(userNameField, { target: { value: userName } });
        fireEvent.change(userNameField, { target: { value: password } });
        fireEvent.click(signInButton);
        waitFor(() => {
            expect(queryByRole('button', { name: "LOGIN" })).not.toBeInTheDocument();
            expect(getByTestId("location-display")).toHaveTextContent(RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH);
        });
    });

    it("should render sign in failure state", () => {
        let getUserSignInResponse = authStore.getUserSignInAPIStatus;
        const history = createMemoryHistory();
        const route = RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH;
        const userName = "vijay";
        const password = "jhsofd";
        const { getByPlaceholderText, getByRole, getByText, queryByRole } = render(
            <Router history={createMemoryHistory()}>
                    <SignInRoute authStore={authStore}/>
            </Router>
        );
        const mockSignInAPI = jest.fn()
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(getUserSignInResponse);
        });
        mockSignInAPI.mockReturnValue(mockSuccessPromise);
        let userNameField = getByPlaceholderText("Username");
        let passwordField = getByPlaceholderText("Password");
        const signInButton = getByRole('button', { name: 'LOGIN' });
        fireEvent.change(userNameField, { target: { value: userName } });
        fireEvent.change(passwordField, { target: { value: password } });

        waitFor(() => {
            getByText(/server-error/i);
        });

    });

});
