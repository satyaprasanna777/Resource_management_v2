import SignInService from '../services/SignInService/SignInService.fixture';
let signInService = new SignInService();
import AuthStore from './AuthStore';
let authStore = new AuthStore(signInService);
export { authStore as default };
