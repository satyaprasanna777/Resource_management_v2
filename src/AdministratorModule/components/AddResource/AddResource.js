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
class AddResource extends React.Component {
    render() {
        const { onChangeName, onChangeLink, onChangeDiscription, resourceName, link, discription, onAddResource, goToPreviousPage } = this.props;
        return (
            <TotalResourceDetailsComponent>
                <Header isAddButton={false}
                addButtonBgColor={themes.addResourceButtonBackGroundColor} 
                text={Strings.addResourceButtonText}/>
                <DetailsComponent>
                    <LeftHalfDivision>
                            <GoBackButtonComponent onClick={goToPreviousPage}>{Strings.addResource.goBackButtonText}</GoBackButtonComponent>
                            <ContentField>
                                <ResourceDetailsComponent>{Strings.addResource.headingText}</ResourceDetailsComponent>
                                <InputFieldWithLabel onChangeFunction={onChangeName} value={resourceName} labelText={Strings.addResource.nameTextForLabel}></InputFieldWithLabel>
                                <LabelComponent>{Strings.addResource.linkTextForLabel}</LabelComponent>
                                <LinkComponent onChange={onChangeLink} value={link} labelText={Strings.addResource.linkTextForLabel}></LinkComponent>
                                <LabelComponent>{Strings.addResource.discriptionTextForLabel}</LabelComponent>
                                <DescriptionComponent onChange={onChangeDiscription} value={discription}></DescriptionComponent>
                                <ChangePhotoDivComponent>
                                    <ItemImageComponent src={resourceThumbnailLogo}/>
                                    <IconComponent src={uploadIcon}/>
                                    <ChangePhotoButtonComponent disabled={true}>{Strings.changePhoto}</ChangePhotoButtonComponent>
                                </ChangePhotoDivComponent>
                                <AddResourceButtonComponent onClick={onAddResource}>{Strings.createButtonText}</AddResourceButtonComponent>
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
export default AddResource;
