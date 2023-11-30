import React from 'react';
import { observer } from 'mobx-react';
import ItemComponent from '../ItemComponent';
import { observable } from 'mobx';
import Strings from '../../i18n/Strings.json';
import {
    ItemsHeader,
    CheckBoxComponent,
    TextComponent,
    LinkComponent,
    TextDiv,
    CheckBoxDiv,
    TotalListOfItemsComponent
}
from './styledComponent'
@observer
class ListOfItemsComponent extends React.Component {
    @observable listOfItems
    render() {
        const { listOfItems, onHandleItemCheck, onUpdateItem } = this.props;
        return (<TotalListOfItemsComponent>
                        <ItemsHeader>
                            <CheckBoxDiv></CheckBoxDiv>
                            <TextDiv>
                            <TextComponent>{Strings.titleText}</TextComponent>
                            </TextDiv>
                            <TextDiv>
                            <TextComponent>{Strings.discriptionTextForLabel}</TextComponent>
                            </TextDiv>
                            <TextDiv>
                            <LinkComponent>{Strings.linkTextForLabel}</LinkComponent>
                            </TextDiv>
                        </ItemsHeader>
                        {listOfItems && listOfItems.map(eachItem=><ItemComponent onUpdateItem={onUpdateItem} onHandleItemCheck={onHandleItemCheck} key={Math.random()} item={eachItem}/>)}
                </TotalListOfItemsComponent>);
    }
}
export default ListOfItemsComponent;
