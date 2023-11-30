import { observable, action, computed } from 'mobx';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { API_INITIAL } from '@ib/api-constants';
import ItemModel from '../ItemModel';
class ResourceModel {
    @observable name
    @observable link
    @observable thumbnail
    @observable id
    @observable discription
    @observable itemsList = []
    itemsService
    @observable getItemsListAPIStatus = API_INITIAL
    @observable getItemsListAPIError = null
    @observable addItemAPIStatus = API_INITIAL;
    @observable addItemAPIError = null
    @observable deleteItemAPIStatus = API_INITIAL
    @observable deleteItemAPIError = null
    @observable deleteItemsAPIStatus = API_INITIAL
    @observable deleteItemsAPIError = null;
    @observable searchedText = "";
    @observable updateItemAPIStatus = API_INITIAL
    @observable updateItemAPIError = null
    constructor(resource, itemsService) {
        this.resourceName = resource.resource;
        this.itemName = resource.item;
        this.link = resource.link;
        this.accessLevel = resource.access_level;
        this.id = resource.useritem_id;
        this.discription = resource.description;
        this.itemsService = itemsService;
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
        this.itemsList = response.map(eachItem => new ItemModel(eachItem));
    }

    @action.bound
    addItemtoItemsList(item) {
        const itemsServiceInstance = this.itemsService.addItemsAPI(this.id, item);
        return bindPromiseWithOnSuccess(itemsServiceInstance).to(this.setAddItemAPIStatus, this.setAddItemAPIResponse)
            .catch(this.setAddItemAPIError)
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
        console.log(response, "add item response is set successfully");
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
        console.log("response");
    }


    @action.bound
    updateItemsinItemsList(object) {
        const updateItemService = this.itemsService.updateItem(this.id, object);
        return bindPromiseWithOnSuccess(updateItemService).to(this.setUpdateItemAPIStatus, this.setUpdateItemAPIResponse).catch(this.setUpdateItemAPIError);
    }

    @action.bound
    setUpdateItemAPIStatus(status) {
        this.updateItemAPIStatus = status;
    }

    @action.bound
    setUpdateItemAPIError(error) {
        this.updateItemAPIError = error;
    }

    @action.bound
    setUpdateItemAPIResponse(response) {
        console.log(response, "updateItem response");
    }

    @action.bound
    onHandleSearch(e) {
        this.searchedText = e.target.value;
    }
    @computed
    get computedItems() {
        let searchedItems = this.itemsList.filter(item => item.name.includes(this.searchedText));
        return searchedItems;

    }
}
export default ResourceModel;
