import React from 'react';
import {
    TotalResourceDetailsComponent,
    ResourceDetailsComponent,
    ProfilePicAndNameDiv,
    NameAndIdDivision,
    ProfilePic,
    NameComponent,
    IdComponent,
    ItemsTextComponent,
    SearchBarAndSort,
    SearchAndItemsDiv,
    SelectDiv,
    GoBackButtonComponent,
    FooterComponent,
    AddItemAndDeleteItemsDiv,
    AddButton,
    DeleteButton,
    PaginationComponent,
    DecrementOffSetComponent,
    CurrentPageNumber,
    FinalPageNumber,
    IncrementOffSetComponent,
    PaginationChildrenDiv

}
from './styledComponent';
import Strings from '../../i18n/Strings.json';
import ListOfItemsComponent from '../ListOfItemsComponent';
import ListOfItemsOfUsers from '../ListOfItemsOfUsers'
import { FilterBar, Header, SearchBar } from '../../common'
class UserDetailsPage extends React.Component {
    onChangeFun = () => {

    }
    render() {
        const {
            user,
            goToPreviousPage,
            searchFunction,
            onHandleUserCheck,
            addButtonDisableButtonStatus,
            deleteButtonDisableStatus,
            itemsList,
            onAddItem,
            onDeleteItems,
            isDecrementOffSetButton,
            isIncrementOffSetButton,
            currentPageNumber,
            onDecrementOffSet,
            lastPageNumber,
            onIncrementOffSet,
            onUpdateItem

        } = this.props;
        const options = ['DEPARTMENT', 'JOB ROLE', 'RESOURCE NAME'];
        return (
            <TotalResourceDetailsComponent >
            <Header isAddButton={false}/>
            <GoBackButtonComponent onClick={goToPreviousPage}>{Strings.backToUsers}</GoBackButtonComponent>
            <ResourceDetailsComponent >
                <ProfilePicAndNameDiv>
                    <ProfilePic src={user.pic}/>
                    <NameAndIdDivision>
                        <NameComponent>{user.userName}</NameComponent>
                        <IdComponent>{user.department}</IdComponent>
                        <IdComponent>{user.jobRole}</IdComponent>
                    </NameAndIdDivision>
                </ProfilePicAndNameDiv>
            </ResourceDetailsComponent>
            <SearchAndItemsDiv>
                <ItemsTextComponent>
                    {Strings.itemsTextInResourceDetails}
                </ItemsTextComponent>
                <SearchBarAndSort>
                    <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={searchFunction}/>
                    <SelectDiv>
                        <option hidden>{Strings.sortText}</option>
                        <option value={Strings.asscendingText}>{Strings.asscendingText}</option>
                        <option value={Strings.descendingText}>{Strings.descendingText}</option>
                    </SelectDiv>
                    <SelectDiv>
                        <option hidden>{Strings.sortText}</option>
                        <option value={Strings.asscendingText}>{Strings.asscendingText}</option>
                        <option value={Strings.descendingText}>{Strings.descendingText}</option>
                    </SelectDiv>
                </SearchBarAndSort>
            </SearchAndItemsDiv>
            {<ListOfItemsOfUsers onUpdateItem={onUpdateItem} onHandleUserCheck={onHandleUserCheck}  listOfItems={itemsList}/>}
            <FooterComponent>
                <AddItemAndDeleteItemsDiv>
                    <AddButton disabled={addButtonDisableButtonStatus} onClick={()=>{onAddItem(user.id)}}>{Strings.resourceDetails.addButtonText}</AddButton>
                    <DeleteButton disabled={deleteButtonDisableStatus} onClick={()=>{onDeleteItems(user.id)}}>{Strings.resourceDetails.deleteButtonText}</DeleteButton>
                </AddItemAndDeleteItemsDiv>
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
            </FooterComponent>
            </TotalResourceDetailsComponent>);
    }

}
export default UserDetailsPage;
