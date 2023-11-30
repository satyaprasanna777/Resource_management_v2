import React from 'react';
import Strings from '../i18n/Strings.json'
import { clearUserSession } from '../utils/StorageUtils.js';
import {
    HeaderComponent,
    IbHubsHeaderLogoComponent,
    UserProfileComponent,
    AddButtonComponent,
    AddAndProfile,
    ToggleBarComponent,
    ToggleButtonComponent,
    SearchBarComponent,
    SearchBarInputFieldComponent,
    SearchIconComponent,
    FilterBarComponent,
    LabelComponent,
    LabelWithInputField,
    InputFieldComponent
}
from './styledComponent';
import { ibHubsHeaderLogo, profileLogo, searchIcon } from '../Assets';
export function Header(props) {
    return (<HeaderComponent>
            <IbHubsHeaderLogoComponent src={ibHubsHeaderLogo}/>
            <AddAndProfile>
            {props.display?<AddButtonComponent onClick={props.onClickFunction} bgColor={props.addButtonBgColor}>{Strings.addResourceButtonText}</AddButtonComponent>:""}
            <UserProfileComponent src={profileLogo}/>
            <button type="button" onClick={()=>{clearUserSession()}}>Sign Out</button>
            </AddAndProfile>
    </HeaderComponent>);
}

export function ToggleBar(props) {
    return (
        <ToggleBarComponent>
            <ToggleButtonComponent onClick={props.onChangeFirstToggle}  text={Strings.resources} clickStatus={props.toggleStatus}>{Strings.resources}</ToggleButtonComponent>
            <ToggleButtonComponent onClick={props.onChangeSecondToggle} text={Strings.requests} clickStatus={props.toggleStatus}>{Strings.requests}</ToggleButtonComponent>
            <ToggleButtonComponent onClick={props.onChangeThirdToggle} text={Strings.users} clickStatus={props.toggleStatus}>{Strings.users}</ToggleButtonComponent>
        </ToggleBarComponent>
    );
}

export function ToggleButton(props) {
    return (
        <ToggleButtonComponent onClick={props.onClickFunction} text={props.text} clickStatus={props.clickStatus}>{props.text}</ToggleButtonComponent>
    );
}

export function SearchBar(props) {
    return (
        <SearchBarComponent>
            <SearchIconComponent src={searchIcon}/>
            <SearchBarInputFieldComponent onChange={props.onChangeFunction} placeholder={props.placeholderText}/>
        </SearchBarComponent>
    );
}


export function FilterBar(props) {
    return <FilterBarComponent>
            <option hidden>{props.hiddenOption}</option>
            {props.options}
        </FilterBarComponent>;
}

export function AddButton(props) {
    return <AddButtonComponent onClick={props.onClickFunction} bgColor={props.addButtonBgColor}>{props.text}</AddButtonComponent>;
}

export function InputFieldWithLabel(props) {
    return <LabelWithInputField>
                    <LabelComponent>{props.labelText}</LabelComponent>
                    <InputFieldComponent placeholder={props.labelText} onChange={props.onChangeFunction} defaultValue={props.value} disabled={props.disabled} type="text"/>
            </LabelWithInputField>
}
