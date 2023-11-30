import React from 'react';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import CommonAddItemComponent from '../../common/CommonAddItemComponent';
import Strings from '../../i18n/Strings.json';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { API_INITIAL, API_FETCHING, API_SUCCESS } from '@ib/api-constants';
@inject('resourcesStore')
@observer
class AddItemRoute extends React.Component {
    @observable itemName
    @observable link
    @observable discription
    @observable resourceName

    async componentDidMount() {
        await this.props.resourcesStore.getItems(this.props.match.params.id, 0, 4);
        this.fetchItems();
    }

    fetchItems = () => {
        this.props.resourcesStore.selectedResource.getItems(this.limit, this.offset);
    }

    getCurrentResourceId = () => {
        return this.props.match.params.id;
    }

    getResourceById = (id) => {
        return this.props.resourcesStore.getResourceByResourceId(id);
    }

    onChangeItemName = (e) => {
        this.itemName = e.target.value;
    }

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
        this.props.resourcesStore.selectedResource.addItemtoItemsList({
            "name": this.itemName,
            "link": this.link,
            "resource_name": this.resourceName,
            "description": this.discription
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
    });
    @computed
    get ApiStatusOfBothAPICall() {

        if (this.props.resourcesStore.selectedResource === undefined) {
            return API_FETCHING;
        }
        else {
            return API_SUCCESS;
        }
    }

    @computed
    get ApiErrorOfBothCalls() {
        if (this.getResourceById(this.getCurrentResourceId()) === undefined) {
            return this.props.resourcesStore.userDetailsAPIError;
        }
        else {
            this.props.resourcesStore.selectedResource.addItemAPIError;
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
export default AddItemRoute;
