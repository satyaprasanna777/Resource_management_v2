import { action, computed, observable } from 'mobx';
import { API_INITIAL } from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { ACCESS_TOKEN, } from '../../utils/StorageUtils';
import RequestModel from '../Models/RequestModel';
class RequestsStore {
    @observable requestsList
    @observable getRequestsListAPIStatus
    @observable getRequestsListAPIError
    @observable acceptRequestsAPIStatus
    @observable acceptRequestsAPIError
    @observable rejectRequestsAPIError
    @observable rejectRequestsAPIStatus
    @observable searchedText
    @observable searchedRequests
    @observable filteredRequests
    @observable selectedFilter
    @observable sortedRequests
    @observable paginationStore
    @observable sortBy
    constructor(requestsService, PaginationStore) {
        this.init();
        this.requestsService = requestsService;
        this.id = 1;
        this.paginationStore = new PaginationStore(requestsService.getRequestsAPI, RequestModel, 4, 5);
    }
    @action.bound
    init() {
        this.requestsList = [];
        this.getRequestsListAPIStatus = API_INITIAL;
        this.getRequestsListAPIError = null;
        this.acceptRequestsAPIStatus = API_INITIAL
        this.acceptRequestsAPIError = null
        this.rejectRequestsAPIStatus = API_INITIAL
        this.rejectRequestsAPIError = null
        this.searchedText = "";
        this.selectedFilter = "all";
        this.sortedRequests = [];
        this.filteredRequests = [];
        this.sortBy = "dueDateTime";

    }

    @action.bound
    setGetRequestsListAPIError(error) {
        this.getRequestsListAPIError = error;
    }

    @action.bound
    setGetRequestsListAPIStatus(status) {
        this.getRequestsListAPIStatus = status;
    }


    @action.bound
    acceptRequests(list) {
        const updateStatus = {
            "request_ids_list": list,
            "status": "ACCEPTED",
            "reason": "for forther things"
        };
        const acceptRequestsService = this.requestsService.acceptRequestsAPI(updateStatus);
        return bindPromiseWithOnSuccess(acceptRequestsService).to(this.setAcceptRequestsAPIStatus, this.setAcceptRequestsAPIResponse).catch(this.setAcceptRequestsAPIError)
    }

    @action.bound
    setAcceptRequestsAPIStatus(status) {
        this.acceptRequestsAPIStatus = status;
    }


    @action.bound
    setAcceptRequestsAPIError(error) {
        this.acceptRequestsAPIError = error;
    }

    @action.bound
    setAcceptRequestsAPIResponse(response) {

    }
    @action.bound
    rejectRequests(list) {
        const updateStatus = {
            "request_ids_list": list,
            "status": "REJECTED",
            "reason": "for forther things"
        };
        const rejectRequestsService = this.requestsService.rejectRquesetsAPI(updateStatus);
        return bindPromiseWithOnSuccess(rejectRequestsService).to(this.setRejectRequestsAPIStatus, this.setRejectRequestsAPIResponse).catch(this.setRejectRequestsAPIError)
    }

    @action.bound
    setRejectRequestsAPIStatus(status) {
        this.rejectRequestsAPIStatus = status;
    }

    @action.bound
    setRejectRequestsAPIError(error) {
        this.rejectRequestsAPIError = error;
    }

    @action.bound
    setRejectRequestsAPIResponse(response) {
        //console.log(response);
    }

    @action.bound
    handleSearchedText(e) {
        this.searchedText = e.target.value;
    }

    @action.bound
    getRequestById(id) {
        const requestsList = (Array.from(this.paginationStore.itemsMap.values()));
        return requestsList[0].find(request => request.id === id);
    }

    @computed
    get Requests() {
        const requestsList = (Array.from(this.paginationStore.itemsMap.values()));
        return requestsList[0].filter(Request => Request.userName.includes(this.searchedText));
    }
    @computed
    get totalNoOfRequestssDisplayed() {
        return this.requestsList.length;
    }
}
export default RequestsStore;
