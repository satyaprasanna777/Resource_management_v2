import React from 'react';
import {
    TotalResourceDetailsComponent,
    ResourceDetailsComponent,
    DetailsComponent,
    LeftHalfDivision,
    RightHalfDivision,
    ResourceImage,
    ContentField,
    LabelComponent,
    DescriptionComponent,
    ChangePhotoDivComponent,
    ItemImageComponent,
    IconComponent,
    ChangePhotoButtonComponent,
    AddResourceButtonComponent,
    LinkComponent,
    GoBackButtonComponent
}
from './styledComponent.js';
import { Header, InputFieldWithLabel } from '../../common';
import { themes } from '../../Themes';
import Strings from '../../i18n/Strings.json';
import { uploadIcon, addResouceImage, resourceThumbnailLogo } from '../../Assets';
import { observable } from 'mobx'
import { observer } from 'mobx-react';

@observer
class CommonAddItemComponent extends React.Component {
    render() {
        const {
            onChangeItemName,
            onChangeResourceName,
            headingText,
            submitButtonText,
            onChangeLink,
            onChangeDiscription,
            resourceName,
            link,
            itemName,
            discription,
            onAddItem,
            goToPreviousPage,
            itemIdStatus,
            itemId
        } = this.props;
        return (
            <TotalResourceDetailsComponent>
                <Header isAddButton={false}
                addButtonBgColor={themes.addResourceButtonBackGroundColor} 
                text={Strings.addResourceButtonText}/>
                <DetailsComponent>
                    <LeftHalfDivision>
                            <GoBackButtonComponent onClick={goToPreviousPage}>{Strings.addResource.goBackButtonText}</GoBackButtonComponent>
                            <ContentField>
                                <ResourceDetailsComponent>{headingText}</ResourceDetailsComponent>
                                <InputFieldWithLabel onChangeFunction={onChangeItemName} value={itemName}  labelText={Strings.addItem.itemNameLabelText}></InputFieldWithLabel>
                                <LabelComponent>{Strings.addResource.linkTextForLabel}</LabelComponent>
                                <LinkComponent onChange={onChangeLink} value={link} placeholder={Strings.addResource.linkTextForLabel} labelText={Strings.addResource.linkTextForLabel}></LinkComponent>
                                <InputFieldWithLabel onChangeFunction={onChangeResourceName} placeholder={Strings.addItem.resourceNameLabelText} value={resourceName} labelText={Strings.addItem.resourceNameLabelText}></InputFieldWithLabel>
                                {itemIdStatus?<InputFieldWithLabel disabled={true}  onChangeFunction={()=>{}} value={itemId} labelText={Strings.updateItem.itemIdTextForLabel}></InputFieldWithLabel>:""}
                                <LabelComponent>{Strings.addItem.discriptionTextForLabel}</LabelComponent>
                                <DescriptionComponent onChange={onChangeDiscription} placeholder={Strings.addItem.discriptionTextForLabel} value={discription}></DescriptionComponent>
                                <AddResourceButtonComponent onClick={onAddItem}>{submitButtonText}</AddResourceButtonComponent>
                            </ContentField>
                    </LeftHalfDivision>
                    <RightHalfDivision>
                        <ResourceImage src={addResouceImage}/>
                    </RightHalfDivision>
                </DetailsComponent>
            </TotalResourceDetailsComponent>
        );
    }
}
export default CommonAddItemComponent;
