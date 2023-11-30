import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../utils/APIUtils';
import { apiMethods } from '../../../constants/APIConstants';
import { baseUrl } from '../../../common/Constants';
class SignInService {
    api
    constructor() {
        this.api = create({ baseURL: baseUrl });
    }
    signInAPI = (object) => {

        return networkCallWithApisauce(
            this.api,
            '/login/v1/', object, apiMethods.post
        );
    }

    signUpAPI = (object) => {

        return networkCallWithApisauce(
            this.api,
            '/user/signup/v1/', object, apiMethods.post
        );
    }

}
export default SignInService;
