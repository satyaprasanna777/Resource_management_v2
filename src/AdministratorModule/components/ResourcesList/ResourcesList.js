import React from 'react';
import ResourceCard from '../ResourceCard';
import { TotalResourceListComponent } from './styledComponent.js'
class ResourcesList extends React.Component {
    render() {
        const { resourcesList, gotoResourceDetailsPage } = this.props;
        return (
            <TotalResourceListComponent>
                {resourcesList && resourcesList.map(eachResource=><ResourceCard  gotoResourceDetailsPage={gotoResourceDetailsPage} key={Math.random()} resource={eachResource}/>)}
            </TotalResourceListComponent>
        );
    }
};
export default ResourcesList;
