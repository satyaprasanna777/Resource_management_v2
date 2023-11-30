import React from 'react';
import { observable, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import AddResource from '../../components/AddResource';
import AddResourceCommonComponent from '../../common/AddResourceCommonComponent';
import { API_INITIAL, API_FETCHING, API_SUCCESS } from '@ib/api-constants';
import Strings from '../../i18n/Strings.json';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
@inject('resourcesStore')
@observer
class UpdateResourceRoute extends React.Component {

    @observable resourceName
    @observable link
    @observable discription

    async componentDidMount() {
        await this.props.resourcesStore.getItems(this.props.match.params.id, 0, 4);
        this.fetchItems();
        this.resourceName = this.props.resourcesStore.selectedResource.name;
        this.link = this.props.resourcesStore.selectedResource.link;
        this.discription = this.props.resourcesStore.selectedResource.discription;
    }

    fetchItems = () => {
        this.props.resourcesStore.selectedResource.getItems(0, 4);
    }

    getCurrentResource = () => {
        const resourceId = this.props.match.params.id;
        return this.props.resourcesStore.getResourceByResourceId(resourceId);
    }

    getCurrentResourceId = () => {
        return this.props.match.params.id;
    }

    onChangeName = (e) => {
        this.resourceName = e.target.value;
    }

    onChangeLink = (e) => {
        this.link = e.target.value;
    }

    onChangeDiscription = (e) => {
        this.discription = e.target.value;

    }

    goToPreviousPage = () => {
        this.props.history.goBack();
    }

    onAddResource = () => {
        this.props.resourcesStore.updateResourceInResourceList({
            "name": this.resourceName,
            "description": this.discription,
            "link": this.link,
            "thumbnail": "https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/29284354-0af8-413e-a039-a42ca6405dc7@3x.png"
        }, this.getCurrentResourceId());
        this.resourceName = "";
        this.link = "";
        this.discription = "";
        this.thumbnail = "";
        this.goToPreviousPage();
    }

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
        if (this.getCurrentResource(this.getCurrentResourceId()) === undefined) {
            return "Network Error";
        }
        else {
            return "Fetching Issue";
        }
    }


    renderUi = observer(() => {
        return (
            <AddResourceCommonComponent
                imageUploadStatus = { true }
                accessLevelStatus = { false }
                goToPreviousPage={this.goToPreviousPage}
                addResource={this.addResource}
                onChangeName={this.onChangeName}
                onChangeLink={this.onChangeLink}
                onChangeDiscription={this.onChangeDiscription}
                onAddResource={this.onAddResource}
                resourceName={this.resourceName}
                link={this.link}
                discription={this.discription}
                headingText={Strings.updateResource}
                submitButtonText={Strings.updateButtonText}
            />
        );
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
export default UpdateResourceRoute;
