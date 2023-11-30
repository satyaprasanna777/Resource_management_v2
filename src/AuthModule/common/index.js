import React from 'react';
import { SignInUserNameField, SignInButtonComponent } from '../components/SignInPage/SignInForm/styledComponents';
export function InputField(props) {
    return <SignInUserNameField errorMessage={props.errorMessage} onChange={props.onChangeEvent} placeholder={props.placeholderText} onKeyPress={props.onKeyPressEvent} type={props.inputType} value={props.value} />;
}
export function SubmitButton(props) {
    return <SignInButtonComponent onClick={props.onSubmitForm}>{props.text}</SignInButtonComponent>
}
