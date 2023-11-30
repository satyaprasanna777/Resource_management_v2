import { observable, action, computed } from 'mobx';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
class PaginationStore {
    getItemsAPI
    totalNumberOfItems
    limit
    ItemModel
    offSet
    totalNumberOfPages
    @observable currentPageNumber
    @observable getItemsAPIStatus
    @observable getItemsAPIError
    @observable itemEntitiesList
    @observable itemsMap

    constructor(getItemsAPI, ItemModel, numberOfItemPerPage, totalNumberOfItems) {
        this.getItemsAPI = getItemsAPI;
        this.ItemModel = ItemModel;
        this.numberOfItemPerPage = numberOfItemPerPage;
        this.totalNumberOfItems = totalNumberOfItems;
        this.init();
    }

    @action.bound
    init() {
        this.totalNumberOfPages = Math.ceil(this.totalNumberOfItems / this.numberOfItemPerPage);
        this.offset = 0;
        this.currentPageNumber = 1;
        this.itemsMap = new Map();
    }

    @action.bound
    getNextPageItems() {
        this.currentPageNumber += 1;
        this.checkThePageNumberIsInList();

    }

    @action.bound
    getPreviousPageItems() {
        this.currentPageNumber -= 1;
        this.checkThePageNumberIsInList();

    }

    @action.bound
    setCurrentPageNumber(pageNumber) {
        this.currentPageNumber = pageNumber;
        this.checkThePageNumberIsInList();
    }

    @action.bound
    checkThePageNumberIsInList() {

        if (!this.itemsMap.has(this.currentPageNumber))
            this.getItems();
    }

    @action.bound
    getItems() {
        const getItemsAPI = this.getItemsAPI(this.numberOfItemPerPage, this.offsetValue);
        return bindPromiseWithOnSuccess(getItemsAPI)
            .to(this.setGetItemsAPIStatus, this.setGetItemsAPIResponse)
            .catch(this.setGetItemsListAPIError);
    }

    @action.bound
    setGetItemsAPIStatus(status) {
        this.getItemsAPIStatus = status;
    }

    @action.bound
    setGetItemsListAPIError(error) {
        this.getItemsAPIError = error;
    }

    @action.bound
    setGetItemsAPIResponse(response) {
        this.itemEntitiesList = response.map(item => new this.ItemModel(item));
        this.itemsMap.set(this.currentPageNumber, this.itemEntitiesList);

    }

    @computed
    get offsetValue() {
        return (this.currentPageNumber - 1) * this.numberOfItemPerPage;
    }

    @computed
    get currentPageItems() {
        return this.itemsMap.get(this.currentPageNumber);
    }

}
export default PaginationStore;
