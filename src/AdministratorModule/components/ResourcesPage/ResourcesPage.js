import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx'
import { Header, SearchBar, AddButton, ToggleBar } from '../../common';
import {
    TotalResourcesComponent,
    PaginationComponent,
    PaginationChildrenDiv,
    IncrementOffSetComponent,
    FinalPageNumber,
    CurrentPageNumber,
    DecrementOffSetComponent
}
from './styledComponent';
import ResourcesList from '../ResourcesList';
import Strings from '../../i18n/Strings.json';
import { inject } from 'mobx-react';
import { themes } from '../../Themes';
@inject('resourcesStore')
@observer
class ResourcesPage extends React.Component {
    render() {
        const {
            onChangeFirstToggle,
            onChangeSecondToggle,
            onChangeThirdToggle,
            toggleStatus,
            resourcesList,
            searchResources,
            addResource,
            addResourceToResourcesList,
            gotoResourceDetailsPage
        } = this.props;
        const { currentPageNumber, isDecrementOffSetButton, onDecrementOffSet, lastPageNumber, isIncrementOffSetButton, onIncrementOffSet } = this.props.resourcesStore;
        return (<TotalResourcesComponent>
            <Header display={true} onClickFunction={addResourceToResourcesList} addButtonBgColor={themes.addResourceButtonBackGroundColor} text={Strings.addResourceButtonText}/>
            <ToggleBar
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle} 
            toggleStatus={toggleStatus}/>
            <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={searchResources}/>
            <ResourcesList gotoResourceDetailsPage={gotoResourceDetailsPage} resourcesList={resourcesList}  />
        </TotalResourcesComponent>);
    }

}
export default withRouter(ResourcesPage);
// <PaginationComponent>
//                     <PaginationChildrenDiv>
//                         <DecrementOffSetComponent disabled={isDecrementOffSetButton}  onClick={onDecrementOffSet}>{Strings.resourceDetails.previousPage}</DecrementOffSetComponent>
//                     </PaginationChildrenDiv>
//                     <PaginationChildrenDiv>
//                         <CurrentPageNumber>{currentPageNumber}</CurrentPageNumber>
//                     </PaginationChildrenDiv>
//                     <PaginationChildrenDiv>
//                         <FinalPageNumber>{lastPageNumber}</FinalPageNumber>
//                     </PaginationChildrenDiv>
//                     <PaginationChildrenDiv>
//                         <IncrementOffSetComponent disabled={isIncrementOffSetButton} onClick={onIncrementOffSet}>{Strings.resourceDetails.lastPage}</IncrementOffSetComponent>
//                     </PaginationChildrenDiv>
//                 </PaginationComponent>
