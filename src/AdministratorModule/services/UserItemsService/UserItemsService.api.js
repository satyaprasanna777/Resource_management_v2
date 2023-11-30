import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class UserItemsService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }
    getItemsAPI = (id, limit, offSet) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/${id}/items?limit=${limit}&offset=${offSet}`, {},
            apiMethods.get
        );
    }
    addItemsAPI = (id, object) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/${id}/item/create/v1/`, object,
            apiMethods.post
        );
    }
    deleteItemsAPI = (idsList) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/delete/v1/`, idsList,
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
export default UserItemsService;
