import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import UsersList from '../UsersList';
import { Header, ToggleBar, SearchBar, AddButton, FilterBar } from '../../common';
import {
    TotalRequestsPage,
    PendingRequestes,
    FilterAndSortDiv,
    SearchBarAndFiltersDiv,
    PaginationComponent,
    PaginationChildrenDiv,
    IncrementOffSetComponent,
    FinalPageNumber,
    CurrentPageNumber,
    DecrementOffSetComponent
}
from './styledComponent';
import Strings from '../../i18n/Strings.json';
import { inject } from 'mobx-react';
import { themes } from '../../Themes';
@inject('usersStore')
@observer
class UsersPage extends React.Component {
    @observable isItemSelected = false;
    render() {
        const {
            onChangeFirstToggle,
            onChangeSecondToggle,
            onChangeThirdToggle,
            toggleStatus,
            onChangeSearch,
            usersList,
            gotoUserDetailsPage
        } = this.props;
        const { currentPageNumber, isDecrementOffSetButton, onDecrementOffSet, lastPageNumber, isIncrementOffSetButton, onIncrementOffSet } = this.props.usersStore;
        let array = ["ACCESS LEVEL", "DUE DATETIME", "RESOURCE NAME"];
        let options = array.map(optionValue => <option value={optionValue}>{optionValue}</option>);
        let sortArray = ["ASCENDING", "DESCENDING"];
        let sortOptions = sortArray.map(optionValue => <option value={optionValue}>{optionValue}</option>);
        return (<TotalRequestsPage>
                <Header isAddButton={false}
                addButtonBgColor={themes.addResourceButtonBackGroundColor} 
                text={Strings.addResourceButtonText}/>
            <ToggleBar
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle} 
            toggleStatus={toggleStatus}/>
            <SearchBarAndFiltersDiv>
                <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={onChangeSearch} />
                {!this.isItemSelected?<FilterAndSortDiv>
                    <FilterBar options={options} hiddenOption="Filter"/>
                    <FilterBar options={sortOptions} hiddenOption="Sort"/>
                </FilterAndSortDiv>:
                <FilterAndSortDiv>
                    <AddButton addButtonBgColor={themes.acceptRequestsButtonBackGroundColor} text={Strings.acceptButtonText}/>
                    <AddButton  addButtonBgColor={themes.rejectRequestsButtonBackGroundColor} text={Strings.rejectButtonText}/>
                </FilterAndSortDiv>}
            </SearchBarAndFiltersDiv>
            <UsersList gotoUserDetailsPage={gotoUserDetailsPage} usersList={usersList} />
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
        </TotalRequestsPage>);
    }

}
export default withRouter(UsersPage);
