import resourcesList from '../../fixtures/ResourcesService.fixture.json'
import itemsList from '../../fixtures/ItemsService.fixture.json';
import Resource from '../../fixtures/AddResourceService.fixture.json'
import { action } from "mobx"
class UsersResourceItemsService {

    getResourceAPI = (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(resourcesList); }, 500)
        });
    }

    getItemsAPI = (id) => {
        return new Promise((resolve, reject) => {
            resolve(itemsList);
        });
    }

    createResourceAPI = (object) => {
        return new Promise((resolve, reject) => {
            resolve(Resource);
        });
    }

    updateResourceAPI = (object) => {
        return new Promise((resolve, reject) => {
            resolve(Resource);
        });
    }

}
export default UsersResourceItemsService;
