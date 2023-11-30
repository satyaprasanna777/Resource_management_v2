import React from 'react';
import Strings from '../../i18n/Strings.json'
import {
    TotalResourceCardComponent,
    ResourceNameComponent,
    ItemNameComponent,
    AccessLevelComponent,
    LinkComponent
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
        return (
            <TotalResourceCardComponent>
            <ResourceNameComponent>{resource.resourceName}</ResourceNameComponent>
            <ItemNameComponent>{resource.itemName}</ItemNameComponent>
            <AccessLevelComponent>{resource.accessLevel}</AccessLevelComponent>
            <LinkComponent href={resource.link}>{resource.link}</LinkComponent>
        </TotalResourceCardComponent>
        );

    }
}
export default withRouter(ResourceCard);
