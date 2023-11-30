import React from 'react';
import ResourceCard from '../ResourceCard';
import {
    TotalResourceListComponent,
    ResourceNameComponent,
    ItemNameComponent,
    AccessLevelComponent,
    LinkComponent,
    TotalHeaderComponent
}
from './styledComponent.js'
class ResourcesList extends React.Component {
    render() {
        const { resourcesList, gotoResourceDetailsPage } = this.props;
        return (
            <TotalResourceListComponent>
                <TotalHeaderComponent>
                    <ResourceNameComponent>RESOURCE NAME</ResourceNameComponent>
                    <ItemNameComponent>ITEM NAME</ItemNameComponent>
                    <AccessLevelComponent>ACCESS LEVEL</AccessLevelComponent>
                    <LinkComponent>LINK</LinkComponent>
                </TotalHeaderComponent>
                {resourcesList && resourcesList.map(eachResource=><ResourceCard  gotoResourceDetailsPage={gotoResourceDetailsPage} key={Math.random()} resource={eachResource}/>)}
            </TotalResourceListComponent>
        );
    }
};
export default ResourcesList;
