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
class AddResourceCommonComponent extends React.Component {
    render() {
        const {
            onChangeName,
            headingText,
            submitButtonText,
            imageUploadStatus,
            onChangeLink,
            onChangeDiscription,
            resourceName,
            link,
            discription,
            onAddResource,
            goToPreviousPage
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
                                <InputFieldWithLabel onChangeFunction={onChangeName} value={resourceName} labelText={Strings.addResource.nameTextForLabel}></InputFieldWithLabel>
                                <LabelComponent>{Strings.addResource.linkTextForLabel}</LabelComponent>
                                <LinkComponent onChange={onChangeLink} placeholder={Strings.addResource.linkTextForLabel} value={link} labelText={Strings.addResource.linkTextForLabel}></LinkComponent>
                                <LabelComponent>{Strings.addResource.discriptionTextForLabel}</LabelComponent>
                                <DescriptionComponent onChange={onChangeDiscription} placeholder={Strings.addItem.discriptionTextForLabel} value={discription}></DescriptionComponent>
                                {imageUploadStatus?<ChangePhotoDivComponent>
                                    <ItemImageComponent src={resourceThumbnailLogo}/>
                                    <IconComponent src={uploadIcon}/>
                                    <ChangePhotoButtonComponent disabled={true}>{Strings.changePhoto}</ChangePhotoButtonComponent>
                                </ChangePhotoDivComponent>:""}
                                <AddResourceButtonComponent onClick={onAddResource}>{submitButtonText}</AddResourceButtonComponent>
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
export default AddResourceCommonComponent;
