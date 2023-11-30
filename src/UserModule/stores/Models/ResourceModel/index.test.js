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
import { ItemsService } from '../../../services/ItemsService/ItemsService.fixture';
import ItemModel from './index';
describe("resource model", () => {
    let itemsService;
    let som = { name: "some", id: "some" };
    let itemModel;
    beforeEach(() => {
        itemsService = new ItemsService();
        itemModel = new ItemModel(som, itemsService);
    });

    it('should Intialize   itemModel', () => {
        expect(itemModel.getItemsListAPIStatus).toBe(API_INITIAL);
        expect(itemModel.getItemsListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);

        itemsService.getItemsAPI = mockLoadingFunction;
        itemModel.getItems();
        expect(itemModel.getItemsListAPIStatus).toBe(API_FETCHING);

    });

    it("should show api succss state after getting the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            resolve();
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await itemModel.getItems();
        expect(itemModel.getItemsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should show api error state the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            reject(new Error("error"));
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await itemModel.getItems(1, 2);
        expect(itemModel.getItemsListAPIStatus).toBe(API_FAILED);

    });


    it('should handleSearchedText', () => {
        const userName = 'raja';
        const event = { target: { value: userName } }
        itemModel.onHandleSearch(event);
        expect(itemModel.searchedText).toBe(userName);
    });

    it('should give searched resources', () => {
        itemModel.itemsList = [{ name: 'raja' }, { name: 'ibHubs' }];
        itemModel.searchedText = 'ra';
        let users = itemModel.computedItems;
        expect(users.length).toBe(1);
    });


    it("should intialize additems apistatus and apiError", () => {
        expect(itemModel.addItemAPIStatus).toBe(API_INITIAL);
        expect(itemModel.addItemAPIError).toBe(null)
    });

    // it("should show fetching state for add items", async() => {
    //     const mockPromise = new Promise((resolve, reject) => {});
    //     const mockFunction = jest.fn();
    //     mockFunction.mockReturnValue(mockPromise);
    //     itemsService.addItemsAPI = mockFunction;

    //     await itemModel.addItemtoItemsList();
    //     expect(itemModel.addItemAPIStatus).toBe(API_FETCHING)
    // });

    it("should show succss state for add Item  ", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve("some data") });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await itemModel.addItemtoItemsList(1);
        expect(itemModel.addItemAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of  add Item api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject("some data") });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await itemModel.addItemtoItemsList(1);
        expect(itemModel.addItemAPIStatus).toBe(API_FAILED)
    })


    it("should intialize updateItem apistatus and update Item apiError", () => {
        expect(itemModel.updateItemAPIStatus).toBe(API_INITIAL);
        expect(itemModel.updateItemAPIError).toBe(null)
    });

    // it("should show fetching state for updateItem items", async() => {
    //     const mockPromise = new Promise((resolve, reject) => {});
    //     const mockFunction = jest.fn();
    //     mockFunction.mockReturnValue(mockPromise);
    //     itemsService.updateItem = mockFunction;

    //     await itemModel.updateItemsinItemsList({ name: "raja" })
    //     expect(itemModel.updateItemAPIStatus).toBe(API_FETCHING)
    // });

    it("should show succss state for updateItem items", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve("some data") });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.updateItem = mockFunction;
        await itemModel.updateItemsinItemsList();
        expect(itemModel.updateItemAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of updateItem api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject("some data") });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.updateItem = mockFunction;
        await itemModel.updateItemsinItemsList();
        expect(itemModel.updateItemAPIStatus).toBe(API_FAILED)
    })
})
