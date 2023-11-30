import React from 'react';
import Strings from '../i18n/Strings.json'
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
    InputFieldComponent,
    DropDownComponent,
    LabelWithDropDown,
    DropDownLabel
}
from './styledComponent';
import { ibHubsHeaderLogo, profileLogo, searchIcon } from '../Assets';
export function Header(props) {
    return (<HeaderComponent>
            <IbHubsHeaderLogoComponent src={ibHubsHeaderLogo}/>
            <AddAndProfile>
            {props.display?<AddButtonComponent onClick={props.onClickFunction} bgColor={props.addButtonBgColor}>{Strings.addResourceButtonText}</AddButtonComponent>:""}
            <UserProfileComponent src={profileLogo}/>
            </AddAndProfile>
    </HeaderComponent>);
}

export function ToggleBar(props) {
    return (
        <ToggleBarComponent>
            <ToggleButtonComponent onClick={props.onChangeFirstToggle}  text={Strings.resources} clickStatus={props.toggleStatus}>{Strings.resources}</ToggleButtonComponent>
            <ToggleButtonComponent onClick={props.onChangeSecondToggle} text={Strings.requests} clickStatus={props.toggleStatus}>{Strings.requests}</ToggleButtonComponent>
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
                    <InputFieldComponent onChange={props.onChangeFunction} defaultValue={props.value} disabled={props.disabled} type="text"/>
            </LabelWithInputField>;
}

export function DropDownWithLabel(props) {
    return <LabelWithDropDown>
                    <DropDownLabel>{props.labelText}</DropDownLabel>
                    <DropDownComponent>
                        <option hidden>{props.hiddenOption}</option>
                        {props.optionsList}
                    </DropDownComponent>
    </LabelWithDropDown>;
}
