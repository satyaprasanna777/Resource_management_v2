import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../../utils/StorageUtils';
import { RESOURCE_MANAGEMENT_SIGN_IN_PATH } from '../../AuthModule/constants/RouteConstants';
import { observer } from 'mobx-react'

@observer
class ProtectedRoute extends React.Component {
    render() {
        const { path, component } = this.props;
        if (getAccessToken() !== undefined && getAccessToken() !== null) {
            console.log(getAccessToken());
            return <Route path={path} component={component}/>;
        }
        else {
            return <Redirect to={{pathname:RESOURCE_MANAGEMENT_SIGN_IN_PATH}}/>
        }
    }
}
export default ProtectedRoute;
