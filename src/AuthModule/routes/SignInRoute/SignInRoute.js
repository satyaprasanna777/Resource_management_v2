import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import { SignInForm } from "../../components/SignInPage/SignInForm";
import {
    RESOURCE_MANAGEMENT_SIGN_UP_PATH,
    RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH,
    RESOURCE_MANAGEMENT_SIGN_IN_PATH,
    USER_DASHBOARD_PATH
}
from '../../constants/RouteConstants';

import { getAccessToken } from "../../utils/StorageUtils";
import Strings from '../../i18n/strings.json';
@inject("authStore")
@observer
class SignInRoute extends React.Component {
    @observable username = "";
    @observable password = "";
    @observable errorMessage = "";
    @observable userNameError = "";
    @observable passwordError = "";
    onChangeUsername = (e) => {
        this.username = e.target.value;
    }


    onChangePassword = (e) => {
        this.password = e.target.value;
    }

    onEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onSubmitForm(e);
        }
    };

    onSignInSuccess = () => {
        const { history } = this.props;
        if (getAccessToken() !== undefined) {

            if (this.props.authStore.response.is_admin) {
                history.replace(RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH);
            }
            else {
                history.replace(USER_DASHBOARD_PATH);
            }
        }
        else {
            alert("please enter valid details");
            return "";
        }
    };

    moveToSignUpPage = () => {
        const { history } = this.props;
        history.push(RESOURCE_MANAGEMENT_SIGN_UP_PATH);
    }

    onSignInFailure = () => {
        const { getUserSignInAPIError: apiError } = this.props.authStore;
        if (apiError !== null && apiError !== undefined) {
            this.passwordError = apiError;
            alert(apiError);
        }
    };

    onSubmitForm = e => {
        const { userSignIn } = this.props.authStore;
        if (this.username === "" || this.username === undefined) {
            this.errorMessage = Strings.emptyUserName;
            this.passwordError = "";
            this.userNameError = this.errorMessage;
            return;
        }
        else if (this.password === "" || this.password === undefined) {
            this.errorMessage = Strings.emptyPassword;
            this.userNameError = "";
            this.passwordError = this.errorMessage;
            return;
        }
        else {
            this.errorMessage = "";
            this.userNameError = "";
            this.passwordError = "";
            userSignIn({
                username: this.username,
                password: this.password
            }, this.onSignInSuccess, this.onSignInFailure)
        }
    };


    render() {
        return (
            <SignInForm
        errorMessage={this.errorMessage}
        username={this.username}
        password={this.password}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onSubmitForm={this.onSubmitForm}
        onEnterKeyPress={this.onEnterKeyPress}
        userNameError={this.userNameError}
        passwordError={this.passwordError}
        moveToSignUpPage={this.moveToSignUpPage}
      />
        );
    }
}
export default withRouter(SignInRoute);
