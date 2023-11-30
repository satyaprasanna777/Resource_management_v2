import { SignInButton, UserName, Password } from './SignInForm';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from "@storybook/addon-knobs";
import '../../../../styles/tailwind.css';
export default {
    title: "SignInFormSignInButton",
    component: SignInButton
};

export const SignInButtonComponent = () => <SignInButton onClick={action('button-click')} onKeyPress={action('button-click')} />;
export const UserNameInputComponent = () => <UserName onChange={action('button-onChangeg')} value={"raja"} />
export const PasswordInputComponent = () => <Password onChange={action('button-onChangeg')} value={"password"} />
