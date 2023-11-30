import { action, computed, observable } from 'mobx';
import { API_INITIAL } from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { ACCESS_TOKEN, } from '../../../utils/StorageUtils';
import ResourceModel from '../Models/ResourceModel';
class UserResourceItemStore {

    @observable limit = 4
    @observable offset = 0
    @observable lastPageNumber = 2
    @observable currentPageNumber = 1
    @observable isDecrementOffSetButton
    @observable isIncrementOffSetButton
    @observable resourcesList
    @observable getResourcesListAPIStatus
    @observable getResourcesListAPIError
    @observable searchedText
    @observable searchedResources
    @observable clickedResource
    @observable addResourceListAPIStatus
    @observable addResourceListAPIError
    @observable updateResourceAPIStatus
    @observable updateResourceAPIError
    itemsService


    constructor(resourcesService, itemsService) {
        this.init();
        this.resourcesService = resourcesService;
        this.id = 1;
        this.itemsService = itemsService;

    }

    @action.bound
    init() {
        this.itemsList = this.resourcesList = [];
        this.getResourcesListAPIStatus = API_INITIAL;
        this.getResourcesListAPIError = null;
        this.searchedText = "";
    }


    @action.bound
    onIncrementOffSet() {
        if (this.currentPageNumber < this.lastPageNumber) {
            this.offset += 4;
            this.currentPageNumber += 1;
            this.getResourcesList();
        }
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
    }

    @action.bound
    onDecrementOffSet() {
        if (this.currentPageNumber > 1) {
            this.offset -= 4;
            this.currentPageNumber -= 1;
            this.getResourcesList();
        }
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
    }

    @action.bound
    getResourcesList() {
        const resourcesService = this.resourcesService.getResourceAPI(this.id, this.limit, this.offset);
        return bindPromiseWithOnSuccess(resourcesService).to(this.setGetResourcesListAPIStatus, this.setResourcesListResponse)
            .catch(this.setGetResourcesListAPIError);
    }


    @action.bound
    setGetResourcesListAPIStatus(status) {
        this.getResourcesListAPIStatus = status;
    }

    @action.bound
    setGetResourcesListAPIError(error) {
        this.getResourcesListAPIError = error;
    }

    @action.bound
    setResourcesListResponse(response) {
        this.resourcesList = response.map(eachResponse => new ResourceModel(eachResponse, this.itemsService));
    }


    @action.bound
    addResourceToResourcesList(object) {
        const resourcesService = this.resourcesService.createResourceAPI(object);
        return bindPromiseWithOnSuccess(resourcesService).to(this.setAddResourceListAPIStatus, this.setAddResourceListResponse).catch(this.setAddResourceAPIError);
    }

    @action.bound
    setAddResourceListAPIStatus(status) {
        this.addResourceListAPIStatus = status;
    }

    @action.bound
    setAddResourceAPIError(error) {
        this.addResourceListAPIError = error;
    }

    @action.bound
    setAddResourceListResponse(response) {
        this.resourcesList.push(new ResourceModel(response, this.itemsService));
    }


    @action.bound
    updateResourceInResourceList(object) {
        const resourcesService = this.resourcesService.updateResourceAPI(object);
        return bindPromiseWithOnSuccess(resourcesService).to(this.setUpdateResourceAPIStatus, this.setUpdateResourceResponse).catch(this.setUpdateResourceAPIError)
    }

    @action.bound
    setUpdateResourceAPIStatus(status) {
        this.updateResourceAPIStatus = status;
    }


    @action.bound
    setUpdateResourceAPIError(error) {
        this.updateResourceAPIError = error;
    }

    @action.bound
    setUpdateResourceResponse(response) {
        console.log(response);
    }

    @action.bound
    getResourceByResourceId(id) {
        return this.resourcesList.find(resource => resource.id.toString() === id.toString());
    }

    @action.bound
    handleSearchedText(enteredText) {
        this.searchedText = enteredText;
    }

    @computed
    get getResources() {
        if (this.resourcesList.length === 0) return [];
        else {
            const searchedResources = this.resourcesList.filter(resource => resource.resourceName.includes(this.searchedText));
            return searchedResources;
        }
    }


    @computed
    get totalNoOfResourcessDisplayed() {
        return this.resourcesList.length;
    }
}
export default UserResourceItemStore;
