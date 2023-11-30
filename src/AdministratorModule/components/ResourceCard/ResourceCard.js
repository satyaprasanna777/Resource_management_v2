import React from 'react';
import Strings from '../../i18n/Strings.json'
import {
    TotalResourceCardComponent,
    ThumbnailAndNameField,
    ThumbnailAndNameComponent,
    TitleComponent,
    TitleAndSubTitleComponent,
    SubTitleComponent,
    LinkComponent,
    DescriptionComponent
}
from './styledComponent';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@observer
class ResourceCard extends React.Component {
    @observable itemsList;
    @observable resource
    render() {
        const { resource, gotoResourceDetailsPage } = this.props;
        const testId = resource.id === 2 ? "resource-card" : null;
        return (
            <TotalResourceCardComponent data-testid={testId} onClick={()=>{gotoResourceDetailsPage(resource.id)}}>
            <ThumbnailAndNameField>
                <ThumbnailAndNameComponent src={resource.thumbnail}></ThumbnailAndNameComponent>
                <TitleAndSubTitleComponent>
                    <TitleComponent>{resource.name}</TitleComponent>
                    <SubTitleComponent>{Strings.cloudServices}</SubTitleComponent>
                </TitleAndSubTitleComponent>
            </ThumbnailAndNameField>
            <LinkComponent href={resource.link}>{resource.link}</LinkComponent>
            <DescriptionComponent>{resource.discription}</DescriptionComponent>
        </TotalResourceCardComponent>
        );

    }
}
export default withRouter(ResourceCard);
