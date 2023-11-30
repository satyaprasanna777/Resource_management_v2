import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class RequestsService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }
    getRequestsAPI = (limit, offset) => {
        console.log(limit, offset);
        return networkCallWithApisauce(
            this.api,
            `/requests/v1/?offset=${offset}&limit=${limit}`, {},
            apiMethods.get
        );
    }
    acceptRequestsAPI = (statusObject) => {
        return networkCallWithApisauce(
            this.api,
            `/requests/action/v1/`, statusObject,
            apiMethods.post
        );
    }
    rejectRquesetsAPI = (statusObject) => {
        return networkCallWithApisauce(
            this.api,
            `/requests/action/v1/`, statusObject,
            apiMethods.post
        );
    }

}
export default RequestsService;
