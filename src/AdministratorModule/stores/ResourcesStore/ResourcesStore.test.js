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
import ResourcesService from '../../services/ResourcesService/ResourcesService.fixture';
import ResourcesStore from './ResourcesStore';
import Resource from '../../fixtures/AddResourceService.fixture.json'
describe("Resources Store", () => {
    let resourceApi;
    let resourcesStore;
    beforeEach(() => {
        resourceApi = new ResourcesService();
        resourcesStore = new ResourcesStore(resourceApi);
    });

    it('should Intialize ResourcesStore', () => {
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_INITIAL);
        expect(resourcesStore.getResourcesListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);

        resourceApi = mockLoadingFunction;
        resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_FETCHING);

    });

    it("should show api succss state after getting the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            resolve();
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        resourceApi = mockFunction;
        await resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_SUCCESS);

    });

    it("should show api error state the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            reject(new Error("error"));
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        resourceApi.getResourceAPI = mockFunction;
        await resourcesStore.getResourcesList();
        expect(resourcesStore.getResourcesListAPIStatus).toBe(API_FAILED);

    });


    it('should handleSearchedText', () => {
        const searchedText = 'raja';
        resourcesStore.handleSearchedText(searchedText);
        expect(resourcesStore.searchedText).toBe(searchedText);
    });

    it('should give searched resources', () => {
        resourcesStore.resourcesList = [{ name: 'raja' }, { name: 'ibHubs' }];
        resourcesStore.searchedText = 'ra';
        let resources = resourcesStore.getResources;
        expect(resources.length).toBe(1);
    });

    it('should give resourcesList length', () => {
        resourcesStore.resourcesList = [{ name: 'raja' }, { name: 'ibHubs' }];
        resourcesStore.searchedText = 'ra';
        let resourcesLength = resourcesStore.totalNoOfResourcessDisplayed;
        expect(resourcesLength).toBe(2);
    });


    it('should should show fetching during add resource api call', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.createResourceAPI = mockLoadingFunction;
        resourcesStore.addResourceToResourcesList();
        expect(resourcesStore.addResourceListAPIStatus).toBe(API_FETCHING);

    });


    it('should should show fetching during add resource api call', async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(Resource) });
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.createResourceAPI = mockLoadingFunction;
        await resourcesStore.addResourceToResourcesList();
        expect(resourcesStore.addResourceListAPIStatus).toBe(API_SUCCESS);
    });


    it('should should show fetching during add resource api call', async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(Resource) });
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.createResourceAPI = mockLoadingFunction;
        await resourcesStore.addResourceToResourcesList();
        expect(resourcesStore.addResourceListAPIStatus).toBe(API_FAILED);
    });


    it('should should show fetching during updating api call', () => {
        const mockPromise = new Promise((resolve) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.updateResourceAPI = mockLoadingFunction;
        resourcesStore.updateResourceInResourceList();
        expect(resourcesStore.updateResourceAPIStatus).toBe(API_FETCHING);
    });


    it('should should show success during updating api call', async() => {
        const mockPromise = new Promise((resolve) => { resolve(Resource) });
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.updateResourceAPI = mockLoadingFunction;
        await resourcesStore.updateResourceInResourceList();
        expect(resourcesStore.updateResourceAPIStatus).toBe(API_SUCCESS);
    });

    it('should should show failed during updating api call', async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(Resource) });
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        resourceApi.updateResourceAPI = mockLoadingFunction;
        await resourcesStore.updateResourceInResourceList();
        expect(resourcesStore.updateResourceAPIStatus).toBe(API_FAILED);
    });

});
