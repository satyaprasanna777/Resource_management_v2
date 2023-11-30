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
@inject('userResourceItemsStore')
@observer
class UserResourceItemsPage extends React.Component {
    render() {
        const {
            onChangeFirstToggle,
            onChangeSecondToggle,
            toggleStatus,
            resourcesList,
            searchResources,
            addResourceToResourcesList,
            gotoResourceDetailsPage
        } = this.props;
        const { currentPageNumber, isDecrementOffSetButton, onDecrementOffSet, lastPageNumber, isIncrementOffSetButton, onIncrementOffSet } = this.props.userResourceItemsStore;
        return (<TotalResourcesComponent>
            <Header display={false} onClickFunction={addResourceToResourcesList} addButtonBgColor={themes.addResourceButtonBackGroundColor} text={Strings.addResourceButtonText}/>
            <ToggleBar
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            toggleStatus={toggleStatus}/>
            <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={searchResources}/>
            <ResourcesList gotoResourceDetailsPage={gotoResourceDetailsPage} resourcesList={resourcesList}  />
            <PaginationComponent>
                    <PaginationChildrenDiv>
                        <DecrementOffSetComponent disabled={isDecrementOffSetButton}  onClick={onDecrementOffSet}>{Strings.resourceDetails.previousPage}</DecrementOffSetComponent>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <CurrentPageNumber>{currentPageNumber}</CurrentPageNumber>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <FinalPageNumber>{lastPageNumber}</FinalPageNumber>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <IncrementOffSetComponent disabled={isIncrementOffSetButton} onClick={onIncrementOffSet}>{Strings.resourceDetails.lastPage}</IncrementOffSetComponent>
                    </PaginationChildrenDiv>
                </PaginationComponent>
        </TotalResourcesComponent>);
    }

}
export default withRouter(UserResourceItemsPage);
