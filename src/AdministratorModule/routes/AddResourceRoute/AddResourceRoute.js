import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import AddResource from '../../components/AddResource';
import AddResourceCommonComponent from '../../common/AddResourceCommonComponent'
import Strings from '../../i18n/Strings.json';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
@inject('resourcesStore')
@observer
class AddResourceRoute extends React.Component {

    @observable resourceName
    @observable link
    @observable discription

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
        this.props.resourcesStore.addResourceToResourcesList({
            "name": this.resourceName,
            "description": this.discription,
            "link": this.link,
            "thumbnail": "https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/29284354-0af8-413e-a039-a42ca6405dc7@3x.png"
        });
        this.resourceName = "";
        this.link = "";
        this.discription = "";
        this.thumbnail = "";
        this.props.resourcesStore.getResourcesList();
        this.goToPreviousPage();
    }

    render() {
        return (
            <AddResourceCommonComponent
                imageUploadStatus={true}
                accessLevelStatus={false}
                goToPreviousPage={this.goToPreviousPage}
                addResource={this.addResource}
                onChangeName={this.onChangeName}
                onChangeLink={this.onChangeLink}
                onChangeDiscription={this.onChangeDiscription}
                onAddResource={this.onAddResource}
                resourceName={this.resourceName}
                link={this.link}
                discription={this.discription}
                headingText={Strings.addResource.headingText}
                submitButtonText={Strings.addResource.createButtonText}
            />
        );
    }

}
export default AddResourceRoute;
