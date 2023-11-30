import { action, computed, observable } from 'mobx';
import { API_INITIAL } from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { ACCESS_TOKEN, } from '../../utils/StorageUtils';
import UserModel from '../Models/UserModel';
import UserItemModel from '../Models/UserItemModel'
class UsersStore {
    @observable limit = 4
    @observable offset = 0
    @observable lastPageNumber = 2
    @observable currentPageNumber = 1
    @observable isDecrementOffSetButton
    @observable isIncrementOffSetButton
    @observable usersList
    @observable getUsersListAPIStatus
    @observable getUsersListAPIError
    @observable searchedText
    @observable searchedUsers
    @observable filteredUsers
    @observable selectedFilter
    @observable sortedUsers
    @observable sortBy


    @observable userDetailsAPIStatus
    @observable userDetailsAPIError = null
    @observable selectedUserItemsList
    @observable selectedResource
    constructor(usersService, itemsService) {
        this.init();
        this.usersService = usersService;
        this.itemsService = itemsService
        this.id = 1

    }
    @action.bound
    init() {
        this.usersList = [];
        this.getUsersListAPIStatus = API_INITIAL;
        this.getUsersListAPIError = null;
        this.searchedText = "";
        this.selectedFilter = "all";
        this.sortedUsers = [];
        this.filteredUsers = [];
        this.sortBy = "dueDateTime";
        this.userDetailsAPIError = null;
        this.userDetailsAPIStatus = API_INITIAL;

    }
    onIncrementOffSet = () => {
        if (this.currentPageNumber < this.lastPageNumber) {
            this.offset += 4;
            this.currentPageNumber += 1;
            this.getUsersList();
        }
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
    }

    onDecrementOffSet = () => {
        if (this.currentPageNumber > 1) {
            this.offset -= 4;
            this.currentPageNumber -= 1;
            this.getUsersList();
        }
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
    }
    @action.bound
    getUsersList() {
        const usersService = this.usersService.getUsersAPI(this.limit, this.offset);
        return bindPromiseWithOnSuccess(usersService).to(this.setGetUsersListAPIStatus, this.setUsersListResponse)
            .catch(this.setGetUsersListAPIError);
    }
    @action.bound
    setUsersListResponse(response) {
        this.usersList = response.map(user => new UserModel(user, this.usersService));
    }
    @action.bound
    setGetUsersListAPIError(error) {
        this.getUsersListAPIError = error;
    }
    @action.bound
    setGetUsersListAPIStatus(status) {
        this.getUsersListAPIStatus = status;
    }

    @action.bound
    getItems(id, limit, offset) {
        const itemsService = this.usersService.getItemsAPI(id, limit, offset);
        return bindPromiseWithOnSuccess(itemsService).to(this.setUserDetailsAPIStatus, this.setUserDetailsAPIResponse).catch(this.setUserDetailsAPIError)
    }

    @action.bound
    setUserDetailsAPIStatus(status) {
        console.log(status, "isodjfoijsdijds");
        this.userDetailsAPIStatus = status;
    }

    @action.bound
    setUserDetailsAPIResponse(response) {
        let resourceObject = {
            "person_name": response.person_name,
            "user_id": response.user_id,
            "name": response.name,
            "department": response.department,
            "job_role": response.job_role,
            "pic": response.pic,
            "item_name": response.item_name,
            "access_level": response.access_level
        };
        this.selectedResource = new UserModel(resourceObject, this.usersService);
        this.selectedResource.getItems(4, 0);
    }

    @action.bound
    setUserDetailsAPIError(error) {
        this.userDetailsAPIError = error;
    }


    @action.bound
    getUserByUserId(id) {
        return this.usersList.find(user => user.id.toString() === id.toString());
    }

    @action.bound
    handleSearchedText(e) {
        this.searchedText = e.target.value;
    }
    @computed
    get users() {
        return this.usersList;
    }
    @computed
    get totalNoOfUserssDisplayed() {
        return this.UsersList.length;
    }
}
export default UsersStore;
