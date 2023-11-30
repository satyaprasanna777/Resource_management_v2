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
import itemsData from '../../../fixtures/ItemsService.fixture.json';
import { ItemsService } from '../../../services/ItemsService/ItemsService.fixture';
import ResourceModel from './index';
describe("resource model", () => {
    let itemsService;
    let some = { name: "some", id: "some" };
    let resourceModel;
    beforeEach(() => {
        itemsService = new ItemsService();
        resourceModel = new ResourceModel(some, itemsService);
    });

    it('should Intialize   resourceModel', () => {
        expect(resourceModel.getItemsListAPIStatus).toBe(API_INITIAL);
        expect(resourceModel.getItemsListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);

        itemsService.getItemsAPI = mockLoadingFunction;
        resourceModel.getItems();
        expect(resourceModel.getItemsListAPIStatus).toBe(API_FETCHING);

    });

    it("should show api succss state after getting the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            resolve(itemsData);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await resourceModel.getItems();
        expect(resourceModel.getItemsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should show api error state the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            reject(new Error("error"));
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await resourceModel.getItems(1, 2);
        expect(resourceModel.getItemsListAPIStatus).toBe(API_FAILED);

    });


    it('should handleSearchedText', () => {
        const userName = 'raja';
        const event = { target: { value: userName } }
        resourceModel.onHandleSearch(event);
        expect(resourceModel.searchedText).toBe(userName);
    });

    it('should give searched resources', () => {
        resourceModel.itemsList = [{ name: 'raja' }, { name: 'ibHubs' }];
        resourceModel.searchedText = 'ra';
        let users = resourceModel.computedItems;
        expect(users.length).toBe(1);
    });


    it("should intialize additems apistatus and apiError", () => {
        expect(resourceModel.addItemAPIStatus).toBe(API_INITIAL);
        expect(resourceModel.addItemAPIError).toBe(null)
    });

    it("should show fetching state for add items", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;

        resourceModel.addItemtoItemsList();
        expect(resourceModel.addItemAPIStatus).toBe(API_FETCHING)
    });

    it("should show succss state for add Item  ", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await resourceModel.addItemtoItemsList(1);
        expect(resourceModel.addItemAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of  add Item api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await resourceModel.addItemtoItemsList(1);
        expect(resourceModel.addItemAPIStatus).toBe(API_FAILED)
    })


    it("should intialize updateItem apistatus and update Item apiError", () => {
        expect(resourceModel.updateItemAPIStatus).toBe(API_INITIAL);
        expect(resourceModel.updateItemAPIError).toBe(null)
    });

    it("should show fetching state for updateItem items", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.updateItem = mockFunction;
        resourceModel.updateItemsinItemsList({ name: "raja" });
        expect(resourceModel.updateItemAPIStatus).toBe(API_FETCHING);
    });

    it("should show succss state for updateItem items", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.updateItem = mockFunction;
        await resourceModel.updateItemsinItemsList();
        expect(resourceModel.updateItemAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of updateItem api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.updateItem = mockFunction;
        await resourceModel.updateItemsinItemsList();
        expect(resourceModel.updateItemAPIStatus).toBe(API_FAILED);
    });


    it("should show fetching state for deleting items", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        resourceModel.deleteItemsFromItemsList({ name: "raja" });
        expect(resourceModel.deleteItemsAPIStatus).toBe(API_FETCHING);
    });

    it("should show succss state for deleting items", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        await resourceModel.deleteItemsFromItemsList();
        expect(resourceModel.deleteItemsAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of deleting api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        await resourceModel.deleteItemsFromItemsList();
        expect(resourceModel.deleteItemsAPIStatus).toBe(API_FAILED);
    });

})
