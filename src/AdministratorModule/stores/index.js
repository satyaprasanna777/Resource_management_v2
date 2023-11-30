import ResourcesService from '../services/ResourcesService/ResourcesService.fixture';
import ResourcesStore from './ResourcesStore';
import RequestsService from '../services/RequestsServices/RequestsServices.fixture';
import RequestsStore from './RequestsStore';
import UsersStore from './UsersStore';
import UsersService from '../services/UsersService/UsersService.fixture';
import { ItemsService } from '../services/ItemsService/ItemsService.fixture';
import UserItemsService from '../services/UserItemsService';
import PaginationStore from './PaginationStore';
const usersStore = new UsersStore(new UsersService(), new UserItemsService());
const resourcesStore = new ResourcesStore(new ResourcesService(), new ItemsService());
const requestsStore = new RequestsStore(new RequestsService(), PaginationStore);
export { resourcesStore, requestsStore, usersStore };