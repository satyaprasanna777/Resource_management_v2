import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class UsersService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }
    getUsersAPI = (limit, offset) => {
        return networkCallWithApisauce(
            this.api,
            `/users/v1/?offset=${offset}&limit=${limit}`, {},
            apiMethods.get
        );
    }
    getItemsAPI = (id, limit, offset) => {
        console.log(id, limit, offset);
        return networkCallWithApisauce(
            this.api,
            `/users/${id}/items/v1/?limit=${limit}&offset=${offset}`, {},
            apiMethods.get
        );
    }
    addItemsAPI = (id, object) => {
        console.log(id, object);
        return networkCallWithApisauce(
            this.api,
            `/users/${id}/item/add/v1/`, object,
            apiMethods.post
        );
    }
    deleteItemsAPI = (idsList) => {
        
        return networkCallWithApisauce(
            this.api,
            `/users/delete/v1/`, idsList,
            apiMethods.post
        );
    }

    updateItem = (id, object) => {
        return networkCallWithApisauce(
            this.api,
            `/items/${id}/update/v1/`, object,
            apiMethods.post
        );
    }

}
export default UsersService;
