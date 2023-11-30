import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class UsersResourceItemsService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }

    getResourceAPI = (id, limit, offset) => {
        return networkCallWithApisauce(
            this.api,
            `/user/resources/v1/?offset=${offset}&limit=${limit}`, {},
            apiMethods.get
        );
    }

    createResourceAPI = (object) => {
        return networkCallWithApisauce(
            this.api,
            `/${object}/resources`, { object },
            apiMethods.post
        );
    }

    updateResourceAPI = (object) => {
        return networkCallWithApisauce(
            this.api,
            `/${object}/resources`, { object },
            apiMethods.post
        );
    }
}
export default UsersResourceItemsService;
