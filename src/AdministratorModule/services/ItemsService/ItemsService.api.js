import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class ItemsService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }
    getItemsAPI = (id, limit, offSet) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/${id}/items/v1/?limit=${limit}&offset=${offSet}`, {},
            apiMethods.get
        );
    }
    addItemsAPI = (id, object) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/${id}/item/create/v1/?limit=4&offset=0`, object,
            apiMethods.post
        );
    }

    deleteItemsAPI = (idsList) => {
        return networkCallWithApisauce(
            this.api,
            `/items/delete/v1/`, idsList,
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
export { ItemsService };
