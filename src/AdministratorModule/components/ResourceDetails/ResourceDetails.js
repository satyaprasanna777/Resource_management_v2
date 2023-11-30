import React from 'react';
import { Header, SearchBar, FilterBar, InputFieldWithLabel } from '../../common';
import { themes } from '../../Themes';
import Strings from '../../i18n/Strings.json';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom'
import {
    TotalResourceDetailsComponent,
    ResourceDetailsComponent,
    ProfilePicAndNameDiv,
    NameAndIdDivision,
    ProfilePic,
    NameComponent,
    IdComponent,
    LinkComponent,
    DescriptionComponent,
    UpdateButtonComponent,
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
import ListOfItemsComponent from '../ListOfItemsComponent';
@observer
class ResourceDetails extends React.Component {
    render() {
        const {
            resource,
            itemsList,
            isDecrementOffSetButton,
            isIncrementOffSetButton,
            goToPreviousPage,
            currentPageNumber,
            lastPageNumber,
            updateResource,
            onDecrementOffSet,
            onIncrementOffSet,
            onDeleteItems,
            onAddItem,
            onUpdateItem,
            onHandleItemCheck,
            addButtonDisableButtonStatus,
            deleteButtonDisableStatus
        } = this.props;
        return (
            <TotalResourceDetailsComponent >
            <Header isAddButton={false}
                addButtonBgColor={themes.addResourceButtonBackGroundColor} 
                text={Strings.addResourceButtonText}/>
            <GoBackButtonComponent onClick={goToPreviousPage}>{Strings.goBackButtonText}</GoBackButtonComponent>
            <ResourceDetailsComponent >
                <ProfilePicAndNameDiv>
                    <ProfilePic src={resource.thumbnail}/>
                    <NameAndIdDivision>
                        <NameComponent>{resource.name}</NameComponent>
                        <IdComponent>{resource.id}</IdComponent>
                        <LinkComponent href={resource.link}>{resource.link}</LinkComponent>
                    </NameAndIdDivision>
                </ProfilePicAndNameDiv>
                <DescriptionComponent>{resource.discription}</DescriptionComponent>
                <UpdateButtonComponent onClick={updateResource}>{Strings.updateTextForButton}</UpdateButtonComponent>
            </ResourceDetailsComponent>
            <SearchAndItemsDiv>
                <ItemsTextComponent>
                    {Strings.itemsTextInResourceDetails}
                </ItemsTextComponent>
                <SearchBarAndSort>
                    <SearchBar placeholderText={Strings.searchBarPlaceholderText} onChangeFunction={resource.onHandleSearch}/>
                    <SelectDiv>
                        <option hidden>{Strings.sortText}</option>
                        <option value={Strings.asscendingText}>{Strings.asscendingText}</option>
                        <option value={Strings.descendingText}>{Strings.descendingText}</option>
                    </SelectDiv>
                </SearchBarAndSort>
            </SearchAndItemsDiv>
            {<ListOfItemsComponent onHandleItemCheck={onHandleItemCheck} onUpdateItem={onUpdateItem} listOfItems={itemsList}/>}
            <FooterComponent>
                <AddItemAndDeleteItemsDiv>
                    <AddButton disabled={addButtonDisableButtonStatus} onClick={()=>{onAddItem(resource.id)}}>{Strings.resourceDetails.addButtonText}</AddButton>
                    <DeleteButton disabled={deleteButtonDisableStatus} onClick={()=>{onDeleteItems(resource.id)}}>{Strings.resourceDetails.deleteButtonText}</DeleteButton>
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
export default withRouter(ResourceDetails);
