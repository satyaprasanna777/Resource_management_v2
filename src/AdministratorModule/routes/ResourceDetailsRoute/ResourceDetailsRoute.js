import React from 'react';
import ResourceDetails from '../../components/ResourceDetails';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable, computed } from 'mobx';
import { getLoadingStatus } from '@ib/api-utils';
import { UpdateResourcePath, AdminDashBoardPage } from '../../constants/RouteConstants';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants';

@inject('resourcesStore')
@observer
class ResourceDetailsRoute extends React.Component {
    @observable limit = 4
    @observable offset = 0
    @observable lastPageNumber = 2
    @observable currentPageNumber = 1
    @observable isIncrementOffSetButton = false;
    @observable isDecrementOffSetButton = true;
    @observable addButtonDisableButtonStatus = true;
    @observable deleteButtonDisableStatus = false;

    async componentDidMount() {
        await this.props.resourcesStore.getItems(this.props.match.params.id, this.limit, this.offset);
        this.fetchItems();
    }

    fetchItems = () => {
        if (this.props.resourcesStore.selectedResource !== undefined) {
            this.props.resourcesStore.selectedResource.getItems(this.props.match.params.id, this.limit, this.offset);
        }
    }

    getCurrentResourceItems = () => {
        return this.props.resourcesStore.selectedResource.computedItems;
    }


    getCurrentResource = () => {
        return this.props.resourcesStore.selectedResource;
    }


    onIncrementOffSet = () => {
        if (this.currentPageNumber < this.lastPageNumber) {
            this.offset += 4;
            this.currentPageNumber += 1;
            this.fetchItems();
        }
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
    }

    onDecrementOffSet = () => {
        if (this.currentPageNumber > 1) {
            this.offset -= 4;
            this.currentPageNumber -= 1;
            this.fetchItems();
        }
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
    }


    goToPreviousPage = () => {
        this.props.history.goBack();
    }

    updateResource = () => {
        this.props.history.push(`${AdminDashBoardPage}/${this.props.match.params.id}/updateresource`);
    }

    onAddItem = (id) => {
        this.props.history.push(`${AdminDashBoardPage}/${id}/addItem`);
    }

    getCheckedItemsIds = () => {
        return (this.getCurrentResourceItems().filter(item => item.isChecked === true)).map(item => item.id);
    }

    onDeleteItems = async() => {
        await this.props.resourcesStore.selectedResource.deleteItemsFromItemsList(this.getCheckedItemsIds());
        this.fetchItems();
        this.addButtonDisableButtonStatus = !this.addButtonDisableButtonStatus;
        this.deleteButtonDisableStatus = !this.deleteButtonDisableStatus;
    }

    onUpdateItem = (id) => {
        this.props.history.push(`${AdminDashBoardPage}/${this.props.match.params.id}/${id}`);
    }

    onHandleItemCheck = (item) => {

        item.onHandleItemCheck();
        let checkedItemsCount = 0;
        this.getCurrentResourceItems().forEach(item => {
            item.isChecked ? checkedItemsCount += 1 : checkedItemsCount += 0;
        });
        this.addButtonDisableButtonStatus = checkedItemsCount === 0;
        this.deleteButtonDisableStatus = checkedItemsCount >= 1;

    }

    @computed
    get ApiStatusOfBothAPICall() {
        // if (this.props.resourcesStore.selectedResource !== undefined) {
        //     console.log("rajaaaaaaaaa", getLoadingStatus(this.props.resourcesStore.userDetailsAPIStatus, this.props.resourcesStore.selectedResource.getItemsListAPIStatus));
        // }
        if (this.props.resourcesStore.userDetailsAPIStatus === API_FAILED) {
            return API_FAILED;
        }
        if (this.props.resourcesStore.selectedResource === undefined) {
            return API_FETCHING;
        }
        else {
            return API_SUCCESS;
        }
    }

    @computed
    get ApiErrorOfBothCalls() {
        if (this.props.resourcesStore.userDetailsAPIError !== null) {
            return this.props.resourcesStore.userDetailsAPIError
        }

    }


    renderUi = observer(() => {
        return <ResourceDetails
        key={this.getCurrentResource().id}
        resource={this.getCurrentResource()} 
        itemsList={this.getCurrentResourceItems()} 
        goToPreviousPage={this.goToPreviousPage}
        updateResource={this.updateResource}
        onIncrementOffSet={this.onIncrementOffSet}
        onDecrementOffSet={this.onDecrementOffSet}
        currentPageNumber={this.currentPageNumber}
        lastPageNumber={this.lastPageNumber}
        isDecrementOffSetButton={this.isDecrementOffSetButton}
        isIncrementOffSetButton={this.isIncrementOffSetButton}
        onAddItem={this.onAddItem}
        onDeleteItems={this.onDeleteItems}
        onUpdateItem={this.onUpdateItem}
        onHandleItemCheck={this.onHandleItemCheck}
        addButtonDisableButtonStatus={!this.addButtonDisableButtonStatus}
        deleteButtonDisableStatus={!this.deleteButtonDisableStatus}
        handleSearchedText={this.props.resourcesStore.handleSearchedText}/>;
    })


    render() {

        return (<LoadingWrapperWithFailure
                apiStatus={this.ApiStatusOfBothAPICall}
                apiError={this.ApiErrorOfBothCalls}
                onRetryClick={this.fetchItems}
                renderSuccessUI={this.renderUi}
            />);
    }
}

export default withRouter(ResourceDetailsRoute);
