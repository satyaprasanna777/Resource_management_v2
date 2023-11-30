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
import ItemsData from '../../../fixtures/ItemsService.fixture.json';
import ItemModel from './index';
describe("resource model", () => {
    let someData = ItemsData.items[0];
    let requestModel;
    beforeEach(() => {
        requestModel = new ItemModel(someData);
    });
    it("should change isChecked Value", () => {
        requestModel.onHandleItemCheck();
        expect(requestModel.isChecked).toBe(true);
    });
});
