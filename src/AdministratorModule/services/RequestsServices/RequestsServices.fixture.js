import fixturesData from '../../fixtures/RequestsService.fixture.json'
class RequestsService {
    getRequestsAPI = (limit, offset) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(fixturesData.slice(offset, offset + limit)) }, 500);
        });
    }
    acceptRequestsAPI = (statusObject) => {
        console.log(statusObject);
        return new Promise((resolve, reject) => {
            resolve(fixturesData);
        });
    }
    rejectRquesetsAPI = (statusObject) => {
        console.log(statusObject);
        return new Promise((resolve, reject) => {
            resolve(fixturesData);
        });
    }
}
export default RequestsService;
