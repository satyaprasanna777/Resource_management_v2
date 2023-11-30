import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import { SignUpForm } from "../../components/SignUpPage/SignUpForm";
import Strings from '../../i18n/strings.json';
import { RESOURCE_MANAGEMENT_SIGN_IN_PATH, RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH } from '../../constants/RouteConstants'
@inject("authStore")
@observer
class SignUpRoute extends React.Component {
    @observable username = "";
    @observable password = "";
    @observable errorMessage = "";
    @observable confirmPassword = "";
    @observable userNameError = "";
    @observable passwordError = "";
    @observable confirmPasswordError = "";

    onChangeUsername = (e) => {
        this.username = e.target.value;
    }


    onChangePassword = (e) => {
        this.password = e.target.value;
    }

    onChangeConfirmPassword = (e) => {
        this.confirmPassword = e.target.value;
    }

    onEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onSubmitForm(e);
        }
    };

    onSignInSuccess = () => {
        const { history } = this.props;
        history.push(RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH)
    };

    onSignInFailure = () => {
        const { userSignUpError: apiError } = this.props.authStore;
        if (apiError !== null && apiError !== undefined) {
            this.errorMessage = apiError;
            this.confirmPasswordError = this.errorMessage;
            alert(this.errorMessage);
        }
    };

    moveToLoginPage = () => {
        const { history } = this.props;
        history.replace(RESOURCE_MANAGEMENT_SIGN_IN_PATH);
    }

    onSubmitForm = e => {
        const { userSignUp } = this.props.authStore;
        if (this.username === "" || this.username === undefined) {
            this.errorMessage = Strings.emptyUserName;
            this.passwordError = "";
            this.confirmPasswordError = "";
            this.userNameError = this.errorMessage;
            return;
        }
        else if (this.password === "" || this.password === undefined) {
            this.errorMessage = Strings.emptyPassword;
            this.userNameError = "";
            this.passwordError = this.errorMessage;
            this.confirmPasswordError = "";
            return;
        }
        else if (this.confirmPassword === "" || this.confirmPassword === undefined) {
            this.errorMessage = Strings.emptyConfirmPassword;
            this.passwordError = ""
            this.userNameError = "";
            this.confirmPasswordError = this.errorMessage;
            return;
        }
        else if (this.password !== this.confirmPassword) {
            this.errorMessage = Strings.passWordMissMatch
            this.userNameError = "";
            this.passwordError = "";
            this.confirmPasswordError = "passWordMissMatch"

        }

        else {
            this.errorMessage = "";
            this.userNameError = "";
            this.passwordError = "";
            this.confirmPasswordError = "";
            userSignUp({
                username: this.username,
                password: this.password,
                confirmPassword: this.confirmPassword
            }, this.onSignInSuccess, this.onSignInFailure)

        }
    };

    render() {

        return (
            <SignUpForm
        errorMessage={this.errorMessage}
        username={this.username}
        password={this.password}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onSubmitForm={this.onSubmitForm}
        onEnterKeyPress={this.onEnterKeyPress}
        moveToLoginPage={this.moveToLoginPage}
        onChangeConfirmPassword={this.onChangeConfirmPassword}
        userNameError={this.userNameError}
        passwordError={this.passwordError}
        confirmPasswordError={this.confirmPasswordError}
        moveToLoginPage={this.moveToLoginPage}
      />
        );
    }
}
export default withRouter(SignUpRoute);
