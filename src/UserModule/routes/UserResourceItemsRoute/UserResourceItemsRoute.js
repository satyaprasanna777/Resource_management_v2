import React from 'react';
import { withRouter } from "react-router-dom";
import UserResourceItemsPage from '../../components/UserResourceItemsPage';
import { observer, inject } from 'mobx-react';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
@inject('userResourceItemsStore')
@observer
class UserResourceItemsRoute extends React.Component {
    resourcesList
    constructor(props) {
        super(props);
        this.getResources();
    }
    getResources = () => {
        this.props.userResourceItemsStore.getResourcesList();
    }

    searchResources = (e) => {
        this.props.userResourceItemsStore.handleSearchedText(e.target.value);
    }

    gotoResourceDetailsPage = (id) => {
        console.log(id);
        this.props.history.push({ pathname: `/admin-dashboard/${id}` });
    }

    renderUi = observer(() => {
        const {
            userResourceItemsStore: { getResources },
            onChangeFirstToggle,
            onChangeSecondToggle,
            toggleStatus,
            userResourceItemsStore: { addResourceToResourcesList }
        } = this.props;
        return <UserResourceItemsPage
            addResourceToResourcesList={this.addResourceToResourcesList}
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            resourcesList={getResources}
            toggleStatus={toggleStatus}
            searchResources={this.searchResources}
            addResource={addResourceToResourcesList}
            updateResource={this.updateResource}
            gotoResourceDetailsPage={this.gotoResourceDetailsPage}
        />;
    })
    render() {
        const { getResourcesListAPIStatus, getResourcesListAPIError } = this.props.userResourceItemsStore;
        return (<LoadingWrapperWithFailure
                apiStatus={getResourcesListAPIStatus}
                apiError={getResourcesListAPIError}
                onRetryClick={this.getResources}
                renderSuccessUI={this.renderUi}
            />);
    }
}
export default withRouter(UserResourceItemsRoute);
