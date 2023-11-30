import UsersResourceItemsService from '../services/UsersResourceItemsService/UsersResourceItemsService.fixture';
import UserResourceItemStore from './UserResourceItemStore';
const userResourceItemsStore = new UserResourceItemStore(new UsersResourceItemsService);
export { userResourceItemsStore };
