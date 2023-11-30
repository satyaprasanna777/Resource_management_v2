/*global jest,expect*/
import {
    API_SUCCESS,
    API_FAILED,
    API_FETCHING,
    API_INITIAL
}
from "@ib/api-constants";
import "@testing-library/jest-dom/extend-expect";
import Cookie from "js-cookie";
let mockSetCookie = jest.fn();
global.mockSetCookie = mockSetCookie;
Cookie.set = mockSetCookie;
import UserResourceItemStore from './UserResourceItemStore';
import UsersResourceItemsService from '../../services/UsersResourceItemsService/UsersResourceItemsService.fixture';
import resourcesList from '../../fixtures/ResourcesService.fixture.json'
describe("should describe user store", () => {
    let resourcesStore;
    let resourcesService;
    beforeEach(() => {
        resourcesService = new UsersResourceItemsService();
        resourcesStore = new UserResourceItemStore(resourcesService);
    });

    it("should give fetching while getting resources of user", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        resourcesService.getResourceAPI = mockFunction;
        resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_FETCHING);
    });

    it("should give fetching while getting resources of user", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            resolve(resourcesList);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        resourcesService.getResourceAPI = mockFunction;
        await resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_SUCCESS);
    });

    it("should give fetching while getting resources of user", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            reject(resourcesList);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        resourcesService.getResourceAPI = mockFunction;
        await resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_FAILED);
    });


});
