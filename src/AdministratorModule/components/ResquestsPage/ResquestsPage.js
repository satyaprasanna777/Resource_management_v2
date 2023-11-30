import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import RequestsList from '../RequestsList';
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
@inject('requestsStore')
@observer
class ResquestsPage extends React.Component {
    @observable isItemSelected = false;
    render() {
        const {
            onChangeFirstToggle,
            onChangeSecondToggle,
            onChangeThirdToggle,
            toggleStatus,
            onChangeSearch,
            requestsList,
            onHandleCheck,
            rejectButtonStatus,
            onAcceptRequests,
            onRejectRequests
        } = this.props;
        console.log(requestsList, "in requestsPage");
        let array = ["ACCESS LEVEL", "DUE DATETIME", "RESOURCE NAME"];
        let options = array.map(optionValue => <option value={optionValue}>{optionValue}</option>);
        let sortArray = ["ASCENDING", "DESCENDING"];
        let sortOptions = sortArray.map(optionValue => <option value={optionValue}>{optionValue}</option>);
        const {
            currentPageNumber,
            getPreviousPageItems,
            getNextPageItems,
            totalNumberOfPages
        } = this.props.requestsStore.paginationStore;
        const nextPageButtonDisableStatus = totalNumberOfPages === currentPageNumber;
        const previousPageButtonDisableStatus = currentPageNumber === 1;
        return (<TotalRequestsPage>
                <Header isAddButton={false}
                addButtonBgColor={themes.addResourceButtonBackGroundColor} 
                text={Strings.addResourceButtonText}/>
            <ToggleBar
            onChangeFirstToggle={onChangeFirstToggle} 
            onChangeSecondToggle={onChangeSecondToggle}
            onChangeThirdToggle={onChangeThirdToggle} 
            toggleStatus={toggleStatus}/>
            <PendingRequestes>{Strings.pendingRequest}</PendingRequestes>
            <SearchBarAndFiltersDiv>
                <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={onChangeSearch} />
                {!rejectButtonStatus?<FilterAndSortDiv>
                    <FilterBar options={options} hiddenOption="Filter"/>
                    <FilterBar options={sortOptions} hiddenOption="Sort"/>
                </FilterAndSortDiv>:
                <FilterAndSortDiv>
                    <AddButton onClickFunction={onAcceptRequests} addButtonBgColor={themes.acceptRequestsButtonBackGroundColor} text={Strings.acceptButtonText}/>
                    <AddButton  onClickFunction={onRejectRequests} addButtonBgColor={themes.rejectRequestsButtonBackGroundColor} text={Strings.rejectButtonText}/>
                </FilterAndSortDiv>}
            </SearchBarAndFiltersDiv>
            <RequestsList  onHandleCheck ={onHandleCheck} listOfRequests={requestsList} />
            <PaginationComponent>
                    <PaginationChildrenDiv>
                        <DecrementOffSetComponent disabled={previousPageButtonDisableStatus}  onClick={getPreviousPageItems}>{Strings.resourceDetails.previousPage}</DecrementOffSetComponent>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <CurrentPageNumber>{currentPageNumber}</CurrentPageNumber>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <FinalPageNumber>{totalNumberOfPages}</FinalPageNumber>
                    </PaginationChildrenDiv>
                    <PaginationChildrenDiv>
                        <IncrementOffSetComponent disabled={nextPageButtonDisableStatus} onClick={getNextPageItems}>{Strings.resourceDetails.lastPage}</IncrementOffSetComponent>
                    </PaginationChildrenDiv>
                </PaginationComponent>
        </TotalRequestsPage>);
    }

}
export default withRouter(ResquestsPage);
