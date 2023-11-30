import React from 'react';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import AddResource from '../../components/AddResource';
import CommonAddItemComponent from '../../common/CommonAddItemComponent';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import Strings from '../../i18n/Strings.json';
import { API_INITIAL, API_FETCHING, API_SUCCESS } from '@ib/api-constants';
@inject('resourcesStore')
@observer
class UpdateItemRoute extends React.Component {

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

    getItemId = () => {
        return this.props.match.params.itemId;
    }

    getItemByItemId = (value) => {

        return (this.props.resourcesStore.selectedResource.itemsList.find(item => item.id === this.getItemId()).value);
    }

    getCurrentItemDetails = () => {
        return {
            name: this.getItemId().name,
            link: this.getItemId().link,
            discription: this.getItemId().discription,
            resourceName: this.getItemId().resourceName
        };
    }

    onUpdateItem = () => {
        this.props.resourcesStore.selectedResource.updateItemsinItemsList({
            "name": this.itemName,
            "description": this.discription,
            "link": this.link,
            "resource_name": this.resourceName
        });
        this.resourceName = "";
        this.link = "";
        this.discription = "";
        this.thumbnail = "";
        this.goToPreviousPage();
    }

    renderUi = observer(() => {
        return (
            <CommonAddItemComponent
                onChangeItemName={this.onChangeItemName}
                goToPreviousPage={this.goToPreviousPage}
                addResource={this.addResource}
                onChangeResourceName={this.onChangeResourceName}
                onChangeLink={this.onChangeLink}
                onChangeDiscription={this.onChangeDiscription}
                onUpdateItem={this.onUpdateItem}
                resourceName={this.resourceName}
                link={this.link}
                discription={this.discription}
                itemIdStatus={true}
                itemId={this.getItemId()}
                headingText={Strings.updateItem.headingText}
                submitButtonText={Strings.updateItem.createButtonText}
                onAddItem={this.onUpdateItem}
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
export default UpdateItemRoute;
