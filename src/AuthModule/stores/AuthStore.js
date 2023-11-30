import { observable, action } from "mobx";
import { API_INITIAL } from "@ib/api-constants";
import { bindPromiseWithOnSuccess } from "@ib/mobx-promise";
import { setAccessToken, clearUserSession } from "../utils/StorageUtils";
import { getUserDisplayableErrorMessage } from '../../utils/APIUtils';

class AuthStore {
    authAPIService;
    @observable getUserSignInAPIStatus;
    @observable getUserSignInAPIError;
    @observable userDetails;
    @observable response;
    @observable userSignUpError
    @observable userSignUpStatus

    constructor(authAPIService) {
        this.authAPIService = authAPIService;
        this.init();
    }

    @action.bound
    init() {
        this.getUserSignInAPIStatus = API_INITIAL;
        this.getUserSignInAPIError = null;
    }

    @action.bound
    setGetUserSignInAPIStatus(status) {
        this.getUserSignInAPIStatus = status;
    }

    @action.bound
    setGetUserSignInAPIError(error) {
        this.getUserSignInAPIError = getUserDisplayableErrorMessage(error);
    }

    @action.bound
    setUserSignInAPIResponse(response) {
        this.response = response;
        if (this.response.hasOwnProperty('access_token')) {
            setAccessToken(response.access_token);
        }
    }
    @action.bound
    userSignIn(request, onSuccess, onFailure) {
        const userSignInAPIPromise = this.authAPIService.signInAPI(request);
        return bindPromiseWithOnSuccess(userSignInAPIPromise)
            .to(this.setGetUserSignInAPIStatus, response => {
                this.setUserSignInAPIResponse(response);
                onSuccess();
            })
            .catch(error => {
                this.setGetUserSignInAPIError(error);
                onFailure();
            });
    }

    @action.bound
    setGetUserSignUpAPIStatus(status) {
        this.userSignUpStatus = status;
    }

    @action.bound
    setGetUserSignUpAPIError(error) {
        this.userSignUpError = getUserDisplayableErrorMessage(error);
    }

    @action.bound
    setUserSignUpAPIResponse(response) {
        console.log(response);
    }

    @action.bound
    userSignUp(request, onSuccess, onFailure) {
        const userSignInAPIPromise = this.authAPIService.signUpAPI(request);
        return bindPromiseWithOnSuccess(userSignInAPIPromise)
            .to(this.setGetUserSignUpAPIStatus, response => {
                this.setUserSignUpAPIResponse(response);
                onSuccess();
            })
            .catch(error => {
                this.setGetUserSignUpAPIError(error);
                onFailure();
            });
    }

    @action.bound
    userSignOut() {
        clearUserSession();
        this.init();
    }
}

export default AuthStore;
