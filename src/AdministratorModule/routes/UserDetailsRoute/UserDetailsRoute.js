import React from 'react';
import UserDetailsPage from '../../components/UserDetailsPage';
import { inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants';
import { getUserDisplayableErrorMessage } from '../../../utils/APIUtils';

@inject('usersStore')
@observer
class UserDetailsRoute extends React.Component {
    @observable limit = 4
    @observable offset = 0
    @observable lastPageNumber = 2
    @observable currentPageNumber = 1
    @observable isIncrementOffSetButton = false;
    @observable isDecrementOffSetButton = true;
    @observable addButtonDisableButtonStatus = true;
    @observable deleteButtonDisableStatus = false;


    async componentDidMount() {
        await this.props.usersStore.getItems(this.props.match.params.id, this.limit, this.offset);
        this.fetchItems();
    }

    fetchItems = () => {
        this.props.usersStore.selectedResource.getItems(this.props.match.params.id, this.limit, this.offset);
    }

    onIncrementOffSet = () => {
        if (this.currentPageNumber < this.lastPageNumber) {
            this.offset += 4;
            this.currentPageNumber += 1;
            this.props.usersStore.selectedResource.getItems(this.limit, this.offset)
        }
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
    }

    onDecrementOffSet = () => {
        if (this.currentPageNumber > 1) {
            this.offset -= 4;
            this.currentPageNumber -= 1;
            this.props.usersStore.selectedResource.getItems(this.limit, this.offset)
        }
        this.isDecrementOffSetButton = this.currentPageNumber === 1;
        this.isIncrementOffSetButton = this.currentPageNumber === this.lastPageNumber;
    }



    getCurrentUser = () => {
        return this.props.usersStore.selectedResource;
    }

    getCurrentUserItems = () => {
        return this.props.usersStore.selectedResource.computedItems;
    }

    goToPreviousPage = () => {
        this.props.history.goBack();
    }

    getCheckedItemsIds = () => {
        return (this.props.usersStore.selectedResource.itemsList.filter(item => item.isChecked === true)).map(item => item.id);

    }

    onDeleteItems = () => {
        return this.props.usersStore.selectedResource.deleteItemsFromItemsList(this.getCheckedItemsIds());
    }

    onUpdateItem = (id) => {
        this.props.history.push(`${'admin-dashboard'}/${this.props.match.params.id}/${id}`);
    }

    onAddItem = (id) => {
        this.props.history.push(`/${id}/user/addUserItem`);
    }

    onUpdateItem = (id) => {
        console.log("presently on updateItem is not in v1 we will see in v2");
    }

    onHandleUserCheck = (item) => {
        item.onHandleItemCheck();
        let checkedItemsCount = 0;
        this.getCurrentUserItems().forEach(item => {
            item.isChecked ? checkedItemsCount += 1 : checkedItemsCount += 0;
        });
        this.addButtonDisableButtonStatus = checkedItemsCount === 0;
        this.deleteButtonDisableStatus = checkedItemsCount >= 1;

    }

    @computed
    get ApiStatusOfBothAPICall() {
        if (this.props.usersStore.userDetailsAPIStatus === API_FAILED) {
            return API_FAILED
        }
        else if (this.getCurrentUser() === undefined ||
            this.props.usersStore.selectedResource.getItemsListAPIStatus === API_FETCHING) {
            return API_FETCHING;
        }
        else {
            return API_SUCCESS;
        }

    }

    @computed
    get ApiErrorOfBothCalls() {
        return this.props.usersStore.userDetailsAPIError;
    }


    renderUi = observer(() => {
        return <UserDetailsPage
        goToPreviousPage={this.goToPreviousPage}
        searchFunction={this.searchFunction}
        onHandleUserCheck={this.onHandleUserCheck}
        itemsList={this.getCurrentUserItems()}
        addButtonDisableButtonStatus={!this.addButtonDisableButtonStatus}
        deleteButtonDisableStatus={!this.deleteButtonDisableStatus}
        onDeleteItems={this.onDeleteItems}
        onAddItem={this.onAddItem}
        isDecrementOffSetButton={this.isDecrementOffSetButton}
        isIncrementOffSetButton={this.isIncrementOffSetButton}
        currentPageNumber={this.currentPageNumber}
        lastPageNumber={this.lastPageNumber}
        onIncrementOffSet={this.onIncrementOffSet}
        onDecrementOffSet={this.onDecrementOffSet}
        onUpdateItem={this.onUpdateItem}
        user={this.props.usersStore.selectedResource}>
        </UserDetailsPage>;
    });


    render() {
        return (<LoadingWrapperWithFailure
                apiStatus={this.ApiStatusOfBothAPICall}
                apiError={this.ApiErrorOfBothCalls}
                onRetryClick={this.fetchItems}
                renderSuccessUI={this.renderUi}
            />);
    }



}
export default UserDetailsRoute;
