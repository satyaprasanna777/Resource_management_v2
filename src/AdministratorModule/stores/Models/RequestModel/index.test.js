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
import RequestsData from '../../../fixtures/RequestsService.fixture.json';
import RequestModel from './index';
describe("resource model", () => {
    let someData = RequestsData[0];
    let requestModel;
    beforeEach(() => {
        requestModel = new RequestModel(someData);
    });
    it("should change isChecked Value", () => {
        requestModel.onChangeIsChecked();
        expect(requestModel.isChecked).toBe(true);
    });
});
