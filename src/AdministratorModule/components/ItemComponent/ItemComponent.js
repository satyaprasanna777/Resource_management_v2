import React from 'react';
import { observer } from 'mobx-react';
import {
    ItemStyledDiv,
    CheckBoxComponent,
    TextComponent,
    LinkComponent,
    TextDiv,
    CheckBoxDiv
}
from './styledComponent';
@observer
class ItemComponent extends React.Component {
    render() {
        const { item, onHandleItemCheck, onUpdateItem } = this.props;
        const testId = item.id === 2 ? "item-id" : null
        return (<ItemStyledDiv data-testid={testId}>
                <CheckBoxDiv>
                    <CheckBoxComponent  onChange={()=>{onHandleItemCheck(item)}} type="checkbox"/>
                </CheckBoxDiv>
                <TextDiv onClick={()=>{onUpdateItem(item.id)}}>
                <TextComponent>{item.name}</TextComponent>
                </TextDiv>
                <TextDiv onClick={()=>{onUpdateItem(item.id)}}>
                <TextComponent>{item.discription}</TextComponent>
                </TextDiv>
                <TextDiv onClick={()=>{onUpdateItem(item.id)}}>
                <LinkComponent href={item.link}>{item.link}</LinkComponent>
                </TextDiv>
        </ItemStyledDiv>);
    }
}
export default ItemComponent;
