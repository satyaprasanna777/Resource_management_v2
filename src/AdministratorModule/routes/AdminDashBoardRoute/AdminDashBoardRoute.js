import React from 'react';
import Strings from '../../i18n/Strings.json';
import { observable } from 'mobx';
import ResourcesRoute from '../ResourcesRoute';
import ResquestsRoute from '../ResquestsRoute';
import UsersRoute from '../UsersRoute';
import { observer } from 'mobx-react';
@observer
class AdminDashBoardRoute extends React.Component {
    @observable toggleStatus = Strings.resources;

    onChangeFirstToggle = () => {
        this.toggleStatus = Strings.resources;
    }

    onChangeSecondToggle = () => {
        this.toggleStatus = Strings.requests;
    }

    onChangeThirdToggle = () => {
        this.toggleStatus = Strings.users;
    }

    render() {
        return ((this.toggleStatus === Strings.resources) ?
            <ResourcesRoute
            onChangeFirstToggle={this.onChangeFirstToggle} 
            onChangeSecondToggle={this.onChangeSecondToggle}
            onChangeThirdToggle={this.onChangeThirdToggle}
            toggleStatus={this.toggleStatus} /> :
            (this.toggleStatus === Strings.requests) ?
            <ResquestsRoute
            onChangeFirstToggle={this.onChangeFirstToggle} 
            onChangeSecondToggle={this.onChangeSecondToggle}
            onChangeThirdToggle={this.onChangeThirdToggle}
            toggleStatus={this.toggleStatus}
            /> : <UsersRoute
            onChangeFirstToggle={this.onChangeFirstToggle} 
            onChangeSecondToggle={this.onChangeSecondToggle}
            onChangeThirdToggle={this.onChangeThirdToggle}
            toggleStatus={this.toggleStatus}
            />);
    }
}
export default AdminDashBoardRoute;
