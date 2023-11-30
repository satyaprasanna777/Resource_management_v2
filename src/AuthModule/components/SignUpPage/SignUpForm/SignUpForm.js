import React from "react";
import { observer } from "mobx-react";
import Strings from '../../../i18n/strings.json';
import {
  SignUpPageContainer,
  SignUpPageForm,
  SignUpHeading,
  IbHubsLogoComponent,
  LabelComponent,
  AlreadyHaveAnAccount,
  LinkComponent,
  ErrorTextComponent,
  moveToLoginPage
}
from './styledComponents';
import { SignUpPageAssets } from '../Assets';
import { InputField, SubmitButton } from '../../../common';
export function SignUpButton(props) {
  return <SignUpButtonComponent 
            onClick={props.onSubmitForm}
            onKeyPress={props.onEnterKeyPress}
          >{Strings.signUpButtonText}</SignUpButtonComponent>;
}

@observer
class SignUpForm extends React.Component {
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
      moveToLoginPage,
      confirmPassword,
      onChangeConfirmPassword,
      userNameError,
      passwordError,
      confirmPasswordError
    } = this.props;
    return (
      <SignUpPageContainer>
        <SignUpPageForm>
          <IbHubsLogoComponent src={SignUpPageAssets.ibHubsLogo}/>
          <SignUpHeading>{Strings.signUpHeading}</SignUpHeading>
          <LabelComponent>{Strings.userNameLabel}</LabelComponent>
          <InputField  onChangeEvent={onChangeUsername} placeholderText={Strings.userNamePlaceholder} onKeyPressEvent={onEnterKeyPress} inputType="text" value={username}  />
          <ErrorTextComponent>{userNameError}</ErrorTextComponent>
          <LabelComponent>{Strings.passWordLabel}</LabelComponent>
          <InputField  onChangeEvent={onChangePassword} placeholderText={Strings.passwordPlaceholder}  onKeyPressEvent={onEnterKeyPress} inputType="password" value={password}  />
          <ErrorTextComponent>{passwordError}</ErrorTextComponent>
          <LabelComponent>{Strings.confirmPasswordLabel}</LabelComponent>
          <InputField  onChangeEvent={onChangeConfirmPassword} placeholderText={Strings.confirmPassword} onKeyPressEvent={onEnterKeyPress} inputType="password" value={confirmPassword}  />
          <ErrorTextComponent>{confirmPasswordError}</ErrorTextComponent>
          <SubmitButton onSubmitForm={onSubmitForm} text={Strings.signUpButtonText}/>
          <AlreadyHaveAnAccount>{Strings.alreadyHaveAnAccount}  <LinkComponent onClick={moveToLoginPage}>{Strings.loginLinkText}</LinkComponent></AlreadyHaveAnAccount>
        </SignUpPageForm>
      </SignUpPageContainer>
    );
  }
}

export { SignUpForm };
