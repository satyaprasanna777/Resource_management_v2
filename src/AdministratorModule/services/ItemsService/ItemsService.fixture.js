import itemsData from '../../fixtures/ItemsService.fixture.json'
import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
class ItemsService {
    getItemsAPI = (id, limit, offset) => {
        let responseObject = {
            "resource_id": id,
            "name": "sampleName",
            "thumbnail": offset,
            "link": "www.www.com",
            "description": "someDescrption",
            "items": itemsData.items.slice(offset, offset + limit)
        };
        return new Promise((resolve, reject) => {
            resolve(responseObject);
        });
    }
    addItemsAPI = (id, object) => {
        return new Promise((resolve, reject) => {
            resolve(itemsData);
        });
    }
    deleteItemsAPI = (object) => {
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
export { ItemsService };
