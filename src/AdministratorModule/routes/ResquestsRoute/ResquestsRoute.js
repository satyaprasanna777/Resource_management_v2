import React from 'react';
import { withRouter } from "react-router-dom";
import ResquestsPage from '../../components/ResquestsPage';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { observer, inject } from 'mobx-react';
@inject('requestsStore')
@observer
class ResquestsRoute extends React.Component {

    componentDidMount() {
        this.getRequestsList();
    }
    getRequestsList = () => {
        return this.props.requestsStore.paginationStore.getItems();
    }

    onHandleCheck = (id) => {
        this.props.requestsStore.getRequestById(id).onChangeIsChecked();
    }

    onAcceptRequests = () => {
        if (confirm('do you really want accept requests')) {
            this.props.requestsStore.acceptRequests(this.checkedRequests());
            this.getRequestsList();
        }
    }

    onRejectRequests = () => {
        if (confirm('doyou really want to reject requests')) {
            this.props.requestsStore.rejectRequests(this.checkedRequests());
            this.getRequestsList();
        }
    }

    checkedRequests = () => {
        const requestsList = (Array.from(this.props.requestsStore.paginationStore.itemsMap.values()));
        return requestsList[0].filter(request => request.isChecked).map(request => request.id);
    }

    renderUi = observer(() => {
        const {
            requestsStore: { Requests },
            onChangeFirstToggle,
            onChangeSecondToggle,
            onChangeThirdToggle,
            toggleStatus
        } = this.props;
        const { handleSearchedText } = this.props.requestsStore;
        const requestsList = this.props.requestsStore.paginationStore.currentPageItems;
        return <ResquestsPage 
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle}
            toggleStatus={toggleStatus}
            onChangeSearch={handleSearchedText}
            requestsList={requestsList}
            onHandleCheck={this.onHandleCheck}
            rejectButtonStatus={this.checkedRequests().length >= 1}
            onAcceptRequests={this.onAcceptRequests}
            onRejectRequests={this.onRejectRequests}
            
        />;
    })

    render() {
        const { getItemsAPIStatus, getItemsAPIError } = this.props.requestsStore.paginationStore;
        return (<LoadingWrapperWithFailure
                apiStatus={getItemsAPIStatus}
                apiError={getItemsAPIError}
                onRetryClick={this.geRequestsList}
                renderSuccessUI={this.renderUi}
            />);
    }
}
export default withRouter(ResquestsRoute);
