/*global jest,expect,await*/
import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from "@ib/api-constants";
import "@testing-library/jest-dom/extend-expect";
import AuthAPI from "../services/SignInService/SignInService.api";
import AuthStore from "./AuthStore";
import Cookie from "js-cookie";
let mockSetCookie = jest.fn();
global.mockSetCookie = mockSetCookie;
Cookie.set = mockSetCookie;
describe("checking AuthStore", () => {
    let authApi;
    let authStore;
    beforeEach(() => {
        authApi = new AuthAPI();
        authStore = new AuthStore(authApi);
    });
    it("should intialize authStore", () => {
        expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL);
        expect(authStore.getUserSignInAPIError).toBe(null);
    });

    it("should test user testing fetching state", () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();

        const requestObject = {
            userName: "test-user",
            passWord: "test-password"
        };

        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockSignInAPI = jest.fn();

        mockSignInAPI.mockReturnValue(mockLoadingPromise);
        authApi = mockSignInAPI;

        authStore.userSignIn(requestObject, onSuccess, onFailure);
        expect(authStore.getUserSignInAPIStatus).toBe(API_FETCHING);
        expect(onSuccess).not.toBeCalled();
        expect(onFailure).not.toBeCalled();
    });

    it("should test user success state", async() => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();

        const requestObject = {
            userName: "test-user",
            password: "password"
        };

        const mockLoadingPromise = new Promise(function(resolve, reject) { resolve() });
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockLoadingPromise);
        authApi = mockSignInAPI;

        await (authStore.userSignIn(requestObject, onSuccess, onFailure));
        expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS);
        expect(onFailure).not.toBeCalled();
        expect(onSuccess).toBeCalled();
    });

    it("should test user failure state", async() => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();

        const requestObject = {
            userName: "test-user",
            password: "password"
        };

        const mockLoadingPromise = new Promise(function(resolve, reject) { reject() });
        const mockSignInAPI = jest.fn();
        mockSignInAPI.mockReturnValue(mockLoadingPromise);
        authApi.signInAPI = mockSignInAPI;

        await (authStore.userSignIn(requestObject, onSuccess, onFailure));
        expect(authStore.getUserSignInAPIStatus).toBe(API_FAILED);
        expect(onFailure).toBeCalled();
        expect(onSuccess).not.toBeCalled();
    });

    it("should do user Signout neatly", () => {
        authStore.userSignOut();
        expect(authStore.getUserSignInAPIStatus).toBe(API_INITIAL);
    });

});
