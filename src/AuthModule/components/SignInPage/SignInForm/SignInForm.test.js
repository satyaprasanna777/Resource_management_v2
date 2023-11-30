/*global expect*/
import React from "react";
import { render } from "@testing-library/react";
import { SignInForm } from ".";
describe("SignIn Form", () => {
    it("Should display userName", () => {
        const userName = "vijay";
        const { getByPlaceholderText } = render(
            <SignInForm username={userName} onChangeUsername={()=>{}}/>
        );
        const userNameField = getByPlaceholderText("Username");
        expect(userNameField.value).toBe(userName);
    });
    it("should read entered password", () => {
        const userPassword = "vhm";
        const { getByPlaceholderText } = render(
            <SignInForm password={userPassword} onChangePassword={()=>{}}/>
        );
        const passwordField = getByPlaceholderText('Password');
        expect(passwordField.value).toBe(userPassword);
    });
});
