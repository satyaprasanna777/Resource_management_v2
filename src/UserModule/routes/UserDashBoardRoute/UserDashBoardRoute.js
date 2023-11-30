import React from 'react';
import Strings from '../../i18n/Strings.json';
import { observable } from 'mobx';
import UserResourceItemsRoute from '../UserResourceItemsRoute';
import UserRequestsItemsRoute from '../UserRequestsItemsRoute';
import { observer } from 'mobx-react';
@observer
class UserDashBoardRoute extends React.Component {
    @observable toggleStatus = Strings.resources;

    onChangeFirstToggle = () => {
        this.toggleStatus = Strings.resources;
    }

    onChangeSecondToggle = () => {
        return null
        this.toggleStatus = Strings.requests;
    }


    render() {
        return ((this.toggleStatus === Strings.resources) ?
            <UserResourceItemsRoute
            onChangeFirstToggle={this.onChangeFirstToggle} 
            onChangeSecondToggle={this.onChangeSecondToggle}
            toggleStatus={this.toggleStatus} /> :
            <UserRequestsItemsRoute
            onChangeFirstToggle={this.onChangeFirstToggle} 
            onChangeSecondToggle={this.onChangeSecondToggle}
            toggleStatus={this.toggleStatus}/>
        )
    }
}


export default UserDashBoardRoute;
