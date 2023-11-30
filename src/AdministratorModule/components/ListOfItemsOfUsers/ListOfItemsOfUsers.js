import React from 'react';
import { observer } from 'mobx-react';
import UserItemComponent from '../UserItemComponent';
import { observable } from 'mobx';
import Strings from '../../i18n/Strings.json';
import {
    ItemsHeader,
    TextComponent,
    LinkComponent,
    CheckBoxDiv,
    TotalListOfItemsComponent,
    DiscriptionDiv,
    LinkDiv,
    AccessLevelDiv,
    ItemNameDiv,
    ResourceNameDiv,
}
from './styledComponent'
@observer
class ListOfItemsOfUsers extends React.Component {
    @observable listOfItems
    render() {
        const { listOfItems, onHandleUserCheck, onUpdateItem } = this.props;
        return (<TotalListOfItemsComponent>
                        <ItemsHeader>
                            <CheckBoxDiv></CheckBoxDiv>
                            <ResourceNameDiv>
                            <TextComponent>{Strings.resource}</TextComponent>
                            </ResourceNameDiv>
                            <ItemNameDiv>
                            <TextComponent>{Strings.item}</TextComponent>
                            </ItemNameDiv>
                            <AccessLevelDiv>
                            <TextComponent>{Strings.accessLevel}</TextComponent>
                            </AccessLevelDiv>
                            <DiscriptionDiv>
                            <TextComponent>{Strings.discriptionTextForLabel}</TextComponent>
                            </DiscriptionDiv>
                            <LinkDiv>
                            <LinkComponent>{Strings.linkTextForLabel}</LinkComponent>
                            </LinkDiv>
                        </ItemsHeader>
                        {listOfItems && listOfItems.map(eachItem=><UserItemComponent onUpdateItem={onUpdateItem} onHandleUserCheck={onHandleUserCheck} key={Math.random()} item={eachItem}/>)}
                </TotalListOfItemsComponent>);
    }
}
export default ListOfItemsOfUsers;
