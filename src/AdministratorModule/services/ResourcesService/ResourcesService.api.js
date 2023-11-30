import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class ResourcesService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }

    getResourceAPI = (limit, offset) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/v1/?offset=${offset}&limit=${limit}`, {},
            apiMethods.get
        );
    }
    //`/resources/v1/?offset=${offset}&limit=${limit}`,
    createResourceAPI = (object) => {
        console.log(object);
        return networkCallWithApisauce(
            this.api,
            `/resource/create/v1/`, object,
            apiMethods.post
        );
    }

    updateResourceAPI = (object, id) => {
        return networkCallWithApisauce(
            this.api,
            `/resources/${id}/update/v1/`, object,
            apiMethods.post
        );
    }
}
export default ResourcesService;
