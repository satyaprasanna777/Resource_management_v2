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
import UsersData from '../../fixtures/UsersService.fixture.json';
Cookie.set = mockSetCookie;
import UsersService from '../../services/UsersService/UsersService.fixture';
import UsersStore from './UsersStore';
describe("Users Store", () => {
    let usersService;
    let usersStore;
    beforeEach(() => {
        usersService = new UsersService();
        usersStore = new UsersStore(usersService);
    });

    it('should Intialize usersStore', () => {
        expect(usersStore.getUsersListAPIStatus).toBe(API_INITIAL);
        expect(usersStore.getUsersListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);

        usersService.getUsersAPI = mockLoadingFunction;
        usersStore.getUsersList();
        expect(usersStore.getUsersListAPIStatus).toBe(API_FETCHING);

    });


    it("should show api succss state after getting the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            resolve(UsersData);
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        usersService.getUsersAPI = mockFunction;
        await usersStore.getUsersList();
        expect(usersStore.getUsersListAPIStatus).toBe(API_SUCCESS);

    });

    it("should show api error state the data", async() => {

        const mockPromise = new Promise((resolve, reject) => {
            reject(new Error("error"));
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        usersService.getUsersAPI = mockFunction;
        await usersStore.getUsersList();
        expect(usersStore.getUsersListAPIStatus).toBe(API_FAILED);

    });


    it('should handleSearchedText', () => {
        const userName = 'raja';
        const event = { target: { value: userName } }
        usersStore.handleSearchedText(event);
        expect(usersStore.searchedText).toBe(userName);
    });

    it('should give searched resources', () => {
        usersStore.usersList = [{ userName: 'raja' }, { userName: 'ibHubs' }];
        usersStore.searchedText = 'ra';
        let users = usersStore.users;
        expect(users.length).toBe(2);
    });

})
