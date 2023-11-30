import fixturesData from '../../fixtures/SignInService.fixture.json';
class SignInService {
    signInAPI = (object) => {
        console.log(object);
        return new Promise((resolve, reject) => {
            resolve(fixturesData);
        });
    }
}
export default SignInService;
