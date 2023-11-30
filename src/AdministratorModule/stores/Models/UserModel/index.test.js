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
import usersData from '../../../fixtures/UsersService.fixture.json';
import ItemsService from '../../../services/UsersService/UsersService.fixture';
import UserModel from './index';
describe("userModel model", () => {
    let itemsService;
    let userData = usersData[0];
    let userModel;
    beforeEach(() => {
        itemsService = new ItemsService();
        userModel = new UserModel(userData, itemsService);
    });

    it('should Intialize   userModel', () => {
        expect(userModel.getItemsListAPIStatus).toBe(API_INITIAL);
        expect(userModel.getItemsListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);

        itemsService.getItemsAPI = mockLoadingFunction;
        userModel.getItems();
        expect(userModel.getItemsListAPIStatus).toBe(API_FETCHING);

    });

    it("should show api succss state after getting the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            resolve(itemsData);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await userModel.getItems();
        expect(userModel.getItemsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should show api error state the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            reject(new Error("error"));
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.getItemsAPI = mockFunction;
        await userModel.getItems(1, 2);
        expect(userModel.getItemsListAPIStatus).toBe(API_FAILED);

    });


    it('should handleSearchedText', () => {
        const userName = 'raja';
        const event = { target: { value: userName } }
        userModel.onHandleSearch(event);
        expect(userModel.searchedText).toBe(userName);
    });

    it('should give searched resources', () => {
        userModel.itemsList = [{ itemName: 'raja' }, { itemName: 'ibHubs' }];
        userModel.searchedText = 'ra';
        let users = userModel.computedItems;
        expect(users.length).toBe(1);
    });


    it("should intialize additems apistatus and apiError", () => {
        expect(userModel.addItemAPIStatus).toBe(API_INITIAL);
        expect(userModel.addItemAPIError).toBe(null)
    });

    it("should show fetching state for add items", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;

        userModel.addItemtoItemsList();
        expect(userModel.addItemAPIStatus).toBe(API_FETCHING)
    });

    it("should show succss state for add Item  ", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await userModel.addItemtoItemsList(1);
        expect(userModel.addItemAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of  add Item api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.addItemsAPI = mockFunction;
        await userModel.addItemtoItemsList(1);
        expect(userModel.addItemAPIStatus).toBe(API_FAILED)
    })


    it("should show fetching state for deleting items", () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        userModel.deleteItemsFromItemsList({ name: "raja" });
        expect(userModel.deleteItemsAPIStatus).toBe(API_FETCHING);
    });

    it("should show succss state for deleting items", async() => {
        const mockPromise = new Promise((resolve, reject) => { resolve(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        await userModel.deleteItemsFromItemsList();
        expect(userModel.deleteItemsAPIStatus).toBe(API_SUCCESS)
    });

    it("should show API_FAILED state after failure of deleting api", async() => {
        const mockPromise = new Promise((resolve, reject) => { reject(itemsData) });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        itemsService.deleteItemsAPI = mockFunction;
        await userModel.deleteItemsFromItemsList();
        expect(userModel.deleteItemsAPIStatus).toBe(API_FAILED);
    });

})
