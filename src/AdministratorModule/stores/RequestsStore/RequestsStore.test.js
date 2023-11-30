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
import fixturesData from '../../fixtures/RequestsService.fixture.json'
let mockSetCookie = jest.fn();
global.mockSetCookie = mockSetCookie;
Cookie.set = mockSetCookie;
import RequestsService from '../../services/RequestsServices/RequestsServices.fixture';
import RequestsStore from './RequestsStore';
import PaginationStore from '../PaginationStore'
describe("Requests Store", () => {
    let requestsService;
    let requestsStore;
    beforeEach(() => {
        requestsService = new RequestsService();
        requestsStore = new RequestsStore(requestsService, PaginationStore);
    });

    it('should Intialize ResourcesStore', () => {
        expect(requestsStore.getRequestsListAPIStatus).toBe(API_INITIAL);
        expect(requestsStore.getRequestsListAPIError).toBe(null);
    });

    it('should show loading while fetching the data', () => {
        const mockPromise = new Promise((resolve, reject) => {});
        const mockLoadingFunction = jest.fn();
        mockLoadingFunction.mockReturnValue(mockPromise);
        requestsService.getRequestsAPI = mockLoadingFunction;
        requestsStore.paginationStore.getItems();;
        expect(requestsStore.paginationStore.getItemsAPIStatus).toBe(API_FETCHING);

    });


    it("should show api succss state after getting the data", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            resolve(fixturesData);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.getRequestsAPI = mockFunction;
        await requestsStore.paginationStore.getItems();
        expect(requestsStore.paginationStore.getItemsAPIStatus).toBe(API_SUCCESS);

    });

    // it("should show api error state the data", async() => {
                //     const mockPromise = new Promise((resolve, reject) => {
                //         reject(new Error("error"));
                //     });
                //     const mockFunction = jest.fn();
                //     mockFunction.mockReturnValue(mockPromise);
                //     requestsService.getRequestsAPI = mockFunction;
                //     await requestsStore.paginationStore.getItems();
                //     expect(requestsStore.paginationStore.getItemsAPIStatus).toBe(API_FAILED);
    
                // });


    it('should handleSearchedText', () => {
        const testName = 'raja',
            event = { target: { value: testName } }
        requestsStore.handleSearchedText(event);
        expect(requestsStore.searchedText).toBe(testName);
    });



    it('should give resourcesList length', () => {
        requestsStore.requestsList = [{ itemName: 'raja' }, { itemName: 'ibHubs' }];
        requestsStore.searchedText = 'ra';
        let requestsLength = requestsStore.totalNoOfRequestssDisplayed;
        expect(requestsLength).toBe(2);
    });


    it("should show fetching while accepting requests", () => {
        const mockPromise = new Promise((resolve, reject) => {})
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.acceptRequestsAPI = mockFunction;
        requestsStore.acceptRequests();
        expect(requestsStore.acceptRequestsAPIStatus).toBe(API_FETCHING);

    })


    it("should show success while accepting requests", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            resolve(fixturesData);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.acceptRequestsAPI = mockFunction;
        await requestsStore.acceptRequests();
        expect(requestsStore.acceptRequestsAPIStatus).toBe(API_SUCCESS);

    });

    it("should show failed while accepting requests", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            reject(fixturesData);
        });
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.acceptRequestsAPI = mockFunction;
        await requestsStore.acceptRequests();
        expect(requestsStore.acceptRequestsAPIStatus).toBe(API_FAILED);

    });


    it("should show failed while accept requests", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            reject(fixturesData)
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.rejectRquesetsAPI = mockFunction;
        await requestsStore.rejectRequests();
        expect(requestsStore.rejectRequestsAPIStatus).toBe(API_FAILED);

    })

    it("should show success while rejectin requests", async() => {
        const mockPromise = new Promise((resolve, reject) => {
            resolve(fixturesData)
        })
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.rejectRquesetsAPI = mockFunction;
        await requestsStore.rejectRequests();
        expect(requestsStore.rejectRequestsAPIStatus).toBe(API_SUCCESS);

    })

    it("should show fetching while reject requests", () => {
        const mockPromise = new Promise((resolve, reject) => {})
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(mockPromise);
        requestsService.rejectRquesetsAPI = mockFunction;
        requestsStore.rejectRequests();
        expect(requestsStore.rejectRequestsAPIStatus).toBe(API_FETCHING);

    })


});
