import { observable, action, computed } from 'mobx';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { API_INITIAL } from '@ib/api-constants';
import UserItemModel from '../UserItemModel';
class UserModel {
    @observable userName
    @observable resourceName
    @observable itemName
    @observable accessLevel
    @observable dueDateTime
    @observable id
    @observable isChecked
    @observable itemsList
    @observable getItemsListAPIStatus = API_INITIAL
    @observable getItemsListAPIError = null
    @observable addItemAPIStatus = API_INITIAL;
    @observable addItemAPIError = null
    @observable deleteItemAPIStatus = API_INITIAL
    @observable deleteItemAPIError = null
    @observable deleteItemsAPIStatus = API_INITIAL
    @observable deleteItemsAPIError = null;
    @observable searchedText = "";
    @observable searchedText = ""
    itemsService
    constructor(user, itemsService) {
        this.id = user.user_id;
        this.userName = user.person_name;
        this.department = user.department;
        this.jobRole = user.job_role;
        this.pic = user.pic;
        this.isChecked = false;
        this.itemName = user.item_name;
        this.accessLevel = user.access_level;
        this.itemsService = itemsService;
    }
    onChangeIsChecked = () => {
        this.isChecked = !this.isChecked;

    }
    @action.bound
    onUpdateName(updatedName) {
        this.name = updatedName;
    }
    @action.bound
    onUpdateLink(updatedLink) {
        this.link = updatedLink;
    }
    @action.bound
    onUpdateThumbnail(updatedThumbnail) {
        this.thumbnail = updatedThumbnail;
    }
    @action.bound
    onUpdateDiscription(updatedDiscription) {
        this.discription = updatedDiscription;
    }
    @action.bound
    getItems(limit, offSet) {
        const itemsServiceInstance = this.itemsService.getItemsAPI(this.id, limit, offSet);
        return bindPromiseWithOnSuccess(itemsServiceInstance)
            .to(this.setGetItemsListAPIStatus, this.setItemsListResponse)
            .catch(this.setGetItemsListAPIError);
    }

    @action.bound
    setGetItemsListAPIStatus(status) {
        this.getItemsListAPIStatus = status;
    }

    @action.bound
    setGetItemsListAPIError(error) {
        this.getItemsListAPIError = error;
    }

    @action.bound
    setItemsListResponse(response) {
        this.itemsList = response.items.map(eachItem => new UserItemModel(eachItem));
    }

    @action.bound
    addItemtoItemsList(item) {
        const itemsServiceInstance = this.itemsService.addItemsAPI(this.id, item);
        return bindPromiseWithOnSuccess(itemsServiceInstance).to(this.setAddItemAPIStatus, this.setAddItemAPIResponse)
            .catch(this.setAddItemAPIError);
    }

    @action.bound
    setAddItemAPIStatus(status) {
        this.addItemAPIStatus = status;
    }

    @action.bound
    setAddItemAPIError(error) {
        this.addItemAPIError = error;
    }

    @action.bound
    setAddItemAPIResponse(response) {
        console.log("add item response is set successfully in users items");
    }

    @action.bound
    deleteItemsFromItemsList(list) {
        const deleteItemsService = this.itemsService.deleteItemsAPI(list);
        return bindPromiseWithOnSuccess(deleteItemsService).to(this.setDeleteItemAPIStatus, this.setDeleteItemAPIResponse)
            .catch(this.setDeleteItemAPIError);
    }

    @action.bound
    setDeleteItemAPIStatus(status) {
        this.deleteItemsAPIStatus = status;
    }

    @action.bound
    setDeleteItemAPIError(error) {
        this.deleteItemsAPIError = error
    }

    @action.bound
    setDeleteItemAPIResponse(response) {
        console.log("response in user items");
    }

    @action.bound
    setUpdateItemAPIResponse(response) {
        //console.log(response, "updateItem response");
    }

    @action.bound
    onHandleSearch(e) {
        this.searchedText = e.target.value;
    }

    @computed
    get computedItems() {
        let searchedItems = this.itemsList.filter(item => item.itemName.includes(this.searchedText));
        return searchedItems;

    }


}
export default UserModel;
