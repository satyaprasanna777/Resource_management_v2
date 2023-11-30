import React from 'react';
import { withRouter } from "react-router-dom";
import UsersPage from '../../components/UsersPage';
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import { observer, inject } from 'mobx-react';
@inject('usersStore')
@observer
class UsersRoute extends React.Component {
    constructor(props) {
        super(props);
        this.getUsersList();
    }

    getUsersList = () => {
        this.props.usersStore.getUsersList();
    }

    gotoUserDetailsPage = (id) => {
        this.props.history.push(`/${id}/user`);
    }

    renderUi = observer(() => {
        const { usersStore: { users }, onChangeFirstToggle, onChangeSecondToggle, onChangeThirdToggle, toggleStatus } = this.props;
        const { handleSearchedText } = this.props.usersStore;
        return <UsersPage 
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle}
            toggleStatus={toggleStatus}
            onChangeSearch={handleSearchedText}
            gotoUserDetailsPage={this.gotoUserDetailsPage}
            usersList={users}
        />;
    })

    render() {
        const { getUsersListAPIStatus, getUsersListAPIError } = this.props.usersStore;
        return (<LoadingWrapperWithFailure
                apiStatus={getUsersListAPIStatus}
                apiError={getUsersListAPIError}
                onRetryClick={this.getUsersList}
                renderSuccessUI={this.renderUi}
            />);

    }
}
export default withRouter(UsersRoute);
