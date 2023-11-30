import UsersData from '../../fixtures/UsersService.fixture.json';
import itemsData from '../../fixtures/ItemsService.fixture.json'
class UsersService {

    getUsersAPI = (limit, offset) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(UsersData.slice(offset, offset + limit)) }, 500);
        });
    }

    getItemsAPI = (id, limit, offset) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(itemsData) }, 500);
        });
    }


    addItemsAPI = (id, object) => {
        return new Promise((resolve, reject) => {
            resolve(UsersData);
        });
    }
    deleteItemsAPI = (idsList) => {
        return new Promise((resolve, reject) => {
            resolve(UsersData);
        });
    }

    updateItem = (id, object) => {
        return new Promise((resolve, reject) => {
            resolve(UsersData);
        });
    }

}
export default UsersService;
