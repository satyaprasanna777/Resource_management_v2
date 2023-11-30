import React from 'react';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import AddResource from '../../components/AddResource';
import { withRouter } from 'react-router-dom'
import CommonAddItemComponent from '../../common/CommonAddItemComponent'
import Strings from '../../i18n/Strings.json';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants';
@inject('usersStore')
@observer
class AddItemToUser extends React.Component {

    @observable itemName
    @observable link
    @observable discription
    @observable resourceName


    async componentDidMount() {
        await this.props.usersStore.getItems(this.props.match.params.id, 0, 4);
        this.fetchItems();
    }

    fetchItems = () => {
        this.props.usersStore.getItems(this.limit, this.offset);
    }


    getCurrentUserId = () => {
        return this.props.match.params.id;
    }

    getUserById = (id) => {
        return this.props.usersStore.selectedResource;
    }

    onChangeItemName = (e) => {
        this.itemName = e.target.value;
    }
    connection
    onChangeLink = (e) => {
        this.link = e.target.value;
    }

    onChangeDiscription = (e) => {
        this.discription = e.target.value;

    }

    onChangeResourceName = (e) => {
        this.resourceName = e.target.value;
    }

    goToPreviousPage = () => {
        this.props.history.goBack();
    }

    onAddItem = () => {
        this.props.usersStore.selectedResource.addItemtoItemsList({
            "name": this.itemName,
            "link": this.link,
            "resource_name": this.resourceName,
            "description": this.discription,
            "item_id": 20,
            "access_level": "READ"
        });
        this.resourceName = "";
        this.link = "";
        this.discription = "";
        this.itemName = "";
        this.goToPreviousPage();
    }

    renderUi = observer(() => {
        return (
            <CommonAddItemComponent
                goToPreviousPage={this.goToPreviousPage}
                addResource={this.addResource}
                onChangeItemName={this.onChangeItemName}
                onChangeLink={this.onChangeLink}
                onChangeResourceName={this.onChangeResourceName}
                onChangeDiscription={this.onChangeDiscription}
                onAddItem={this.onAddItem}
                resourceName={this.resourceName}
                itemName={this.itemName}
                link={this.link}
                itemId={this.props.match.params.id}
                itemIdStatus={false}
                discription={this.discription}
                headingText={Strings.addItem.headingText}
                submitButtonText={Strings.addItem.createButtonText}
            />
        );
    })

    @computed
    get ApiStatusOfBothAPICall() {
        if (this.getUserById(this.props.match.params.id) === undefined) {
            return API_FETCHING;
        }
        else {
            return API_SUCCESS;
        }

    }

    @computed
    get ApiErrorOfBothCalls() {
        if (this.getUserById(this.props.match.params.id) === undefined) {
            return "Network Error"
        }
        else {
            return "Fetching Issue"
        }
    }

    render() {
        return (<LoadingWrapperWithFailure
                apiStatus={this.ApiStatusOfBothAPICall}
                apiError={this.ApiErrorOfBothCalls}
                onRetryClick={this.fetchItems}
                renderSuccessUI={this.renderUi}
            />);
    }
}
export default withRouter(AddItemToUser);
