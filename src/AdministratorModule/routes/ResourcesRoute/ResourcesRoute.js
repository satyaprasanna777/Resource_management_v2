import React from 'react';
import { withRouter } from "react-router-dom";
import ResourcesPage from '../../components/ResourcesPage';
import { observer, inject } from 'mobx-react';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { AddResourcePath, } from '../../constants/RouteConstants';
@inject('resourcesStore')
@observer
class ResourcesRoute extends React.Component {
    resourcesList
    componentDidMount() {
        this.getResources();
    }
    getResources = () => {
        this.props.resourcesStore.getResourcesList();
    }

    searchResources = (e) => {
        this.props.resourcesStore.handleSearchedText(e.target.value);
    }

    addResourceToResourcesList = () => {
        this.props.history.push(AddResourcePath);
    }

    gotoResourceDetailsPage = (id) => {
        this.props.history.push({ pathname: `/admin-dashboard/${id}` });
    }

    renderUi = observer(() => {
        const {
            resourcesStore: { getResources },
            onChangeFirstToggle,
            onChangeSecondToggle,
            onChangeThirdToggle,
            toggleStatus,
            resourcesStore: { addResourceToResourcesList }
        } = this.props;
        return <ResourcesPage
            addResourceToResourcesList={this.addResourceToResourcesList}
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle}
            resourcesList={getResources}raja-pamulapati
            toggleStatus={toggleStatus}
            searchResources={this.searchResources}
            addResource={addResourceToResourcesList}
            updateResource={this.updateResource}
            gotoResourceDetailsPage={this.gotoResourceDetailsPage}
        />;
    })
    render() {
        const { getResourcesListAPIStatus, getResourcesListAPIError } = this.props.resourcesStore;
        return (<LoadingWrapperWithFailure
                apiStatus={getResourcesListAPIStatus}
                apiError={getResourcesListAPIError}
                onRetryClick={this.getResources}
                renderSuccessUI={this.renderUi}
            />);
    }
}
export default withRouter(ResourcesRoute);
