import itemsData from '../../fixtures/ItemsService.fixture'
import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
class UserItemsService {
    api
    constructor() {
        this.api = create({ baseURL: 'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/ecommerce' });
    }
    getItemsAPI = (id, limit, offset) => {
        return new Promise((resolve, reject) => {
            resolve(itemsData);
        });
    }
    addItemsAPI = (object) => {
        return new Promise((resolve, reject) => {
            resolve(itemsData);
        });
    }
    deleteItemsAPI = (idsList) => {
        return new Promise((resolve, reject) => {
            resolve(itemsData);
        });
    }
    updateItem = (id, object) => {
        return new Promise((resolve, reject) => {
            resolve(itemsData);
        });
    }
}
export { UserItemsService };
