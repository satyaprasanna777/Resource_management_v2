import React from "react";
import { observer } from "mobx-react";
import Strings from '../../../i18n/strings.json';
import { InputField, SubmitButton } from '../../../common';
import { getAccessToken } from '../../../utils/StorageUtils';
import { Redirect } from 'react-router-dom';
import {
  SignInPageContainer,
  SignInPageForm,
  SignInHeading,
  SignInButtonComponent,
  IbHubsLogoComponent,
  LabelComponent,
  AlreadyHaveAnAccount,
  LinkComponent,
  ErrorTextComponent,
}
from './styledComponents';
import { RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH } from '../../../constants/RouteConstants';

import { SignInPageAssets } from '../Assets';
export function SignInButton(props) {
  return <SignInButtonComponent 
            text="Sign in"
            onClick={props.onSubmitForm}
          >{Strings.signInButtonText}</SignInButtonComponent>;
}

@observer
class SignInForm extends React.Component {
  userNameRef = React.createRef();
  passwordRef = React.createRef();

  render() {

    const {
      apiStatus,
      username,
      onChangeUsername,
      password,
      onChangePassword,
      onEnterKeyPress,
      onSubmitForm,
      errorMessage,
      userNameError,
      passwordError,
      moveToSignUpPage
    } = this.props;
    if (getAccessToken()) <Redirect to={RESOURCE_MANAGEMENT_ADMIN_DASHBOARD_PATH}/>;
    return (
      <SignInPageContainer>
        <SignInPageForm>
          <IbHubsLogoComponent src={SignInPageAssets.ibHubsLogo}/>
          <SignInHeading>{Strings.hiThere}</SignInHeading>
          <SignInHeading>{Strings.pleaseSignIn}</SignInHeading>
          <LabelComponent>{Strings.userNameLabel}</LabelComponent>
          <InputField  onChangeEvent={onChangeUsername} placeholderText={Strings.userNamePlaceholder} onKeyPressEvent={onEnterKeyPress} inputType="text" value={username}  />
          <ErrorTextComponent>{userNameError}</ErrorTextComponent>
          <LabelComponent>{Strings.passWordLabel}</LabelComponent>
          <InputField onChangeEvent={onChangePassword} placeholderText={Strings.passwordPlaceholder} onKeyPressEvent={onEnterKeyPress} inputType="password" value={password}  />
          <ErrorTextComponent>{passwordError}</ErrorTextComponent>
          <SubmitButton onSubmitForm={onSubmitForm} text={Strings.signInButtonText}/>
          <AlreadyHaveAnAccount>{Strings.dontHaveAccount}  <LinkComponent onClick={moveToSignUpPage}>{Strings.signUpText}</LinkComponent></AlreadyHaveAnAccount>
        </SignInPageForm>
      </SignInPageContainer>
    );
  }
}

export { SignInForm };
