/*global jest,expect*/
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import AuthStore from '../../stores/AuthStore';
import {
    RESOURCE_MANAGEMENT_SIGN_UP_PATH,
    RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH
}
from "../../constants/RouteConstants";
import SignInService from '../../services/SignInService';
import { SignUpRoute } from '.';
import fixturesData from '../../fixtures/SignInService.fixture.json'
const LocationDisplay = withRouter(({ location }) => {
    <div data-testid="location-display">{location.pathname}</div>;
});
describe("Signup Route", () => {
    let authStore;
    let signInService;
    beforeEach(() => {
        signInService = new SignInService();
        authStore = new AuthStore(signInService);
    });
    it("should render username empty error", () => {
        const { getByText, getByRole } = render(
            <Router history={createMemoryHistory()}>
                    <SignUpRoute authStore={authStore}/>
            </Router>
        );
        const signUpButton = getByRole("button", { name: "SIGNUP" });
        fireEvent.click(signUpButton);
        getByText(/Please enter username/i);
    });
    it("should render password empty error", () => {
        const { getByText, getByRole, getByPlaceholderText } = render(
            <Router history={createMemoryHistory()}>
            <SignUpRoute authStore={authStore}/>
            </Router>
        );
        const username = "test-user";
        const usernameField = getByPlaceholderText("Username");
        fireEvent.change(usernameField, { target: { value: username } })
        const signInButton = getByRole('button', { name: 'SIGNUP' });
        fireEvent.click(signInButton);
        getByText(/Please enter password/i);
    });


    it("shoud render confirm password empty error", () => {

        const { getByText, getByRole, getByPlaceholderText } = render(
            <Router history={createMemoryHistory()}>
                <SignUpRoute authStore={authStore}/>
            </Router>
        );
        const username = "raja";
        const password = "india wale";
        const userNameField = getByPlaceholderText('Username');
        const passwordField = getByPlaceholderText('Password');
        fireEvent.change(userNameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });

        const SignUpButton = getByRole('button', { name: 'SIGNUP' });
        fireEvent.click(SignUpButton);
        getByText(/Please enter Confirm Password/i);

    });

    /* it("should render signup success state", async() => {
         let getUserSignInResponse = SignInService.fixture;
         const history = createMemoryHistory();
         const route = RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH;
         history.push(route);
         const { getByPlaceholderText, getByRole, queryByRole, getByTestId } = render(
             <Provider authStore={authStore}>
                     <Router history={history}>
                         <Route path={RESOURCE_MANAGEMENT_SIGN_UP_PATH}>
                             <SignUpRoute />
                         </Route>
                         <Route path={RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH}>
                             <LocationDisplay/>
                         </Route>
                     </Router>
                 </Provider>
         );
         const userName = "test-user";
         const password = "test-password";
         const confirmPassword = "test-password";
         const userNameField = getByPlaceholderText("Username");
         const passwordField = getByPlaceholderText('Password');
         const confirmPasswordField = getByPlaceholderText('Confirm Password')
         const signUpButton = getByRole('button', { name: 'SIGNUP' });
         const mockSignInAPI = jest.fn();
         
         const mockSuccessPromise = new Promise(function(resolve, reject) {
             resolve(getUserSignInResponse);
         });

         mockSignInAPI.mockReturnValue(mockSuccessPromise);
         signInService.signInAPI = mockSignInAPI;

         fireEvent.change(userNameField, { target: { value: userName } });
         fireEvent.change(passwordField, { target: { value: password } });
         fireEvent.change(confirmPasswordField, { target: { value: confirmPassword } })
         fireEvent.click(signUpButton);
         await waitFor(() => {
             expect(queryByRole('button', { name: "SIGNUP" })).not.toBeInTheDocument();
             expect(getByTestId("location-display")).toHaveTextContent(RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH);
         });
     }); */
    /*
    it("should render SIGNUP failure state", () => {
        let getUserSignInResponse = authStore.getUserSignInAPIStatus;
        const history = createMemoryHistory();
        const route = RESOURCE_MANAGEMENT_SIGN_UP_PATH;
        const userName = "vijay";
        const password = "jhsofd";
        const { getByPlaceholderText, getByRole, getByText, queryByRole } = render(
            <Router history={createMemoryHistory()}>
                    <SignUpRoute authStore={authStore}/>
            </Router>
        );
        const mockSignInAPI = jest.fn()
        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(getUserSignInResponse);
        });
        mockSignInAPI.mockReturnValue(mockSuccessPromise);
        let userNameField = getByPlaceholderText("Username");
        let passwordField = getByPlaceholderText("Password");
        const signInButton = getByRole('button', { name: 'SIGNUP' });
        fireEvent.change(userNameField, { target: { value: userName } });
        fireEvent.change(passwordField, { target: { value: password } });

        waitFor(() => {
            getByText(/server-error/i);
        });

    });*/
});
