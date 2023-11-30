import React from 'react'
import {
    TotalItemCardComponent,
    CheckBoxDivComponent,
    CheckBoxComponent,
    ResourceNameDiv,
    AccessLevelDiv,
    TextComponent,
    LinkDiv,
    DiscriptionDiv,
    ItemNameDiv,
    LinkComponent
}
from './styledComponent'
class UserItemComponent extends React.Component {
    render() {
        const { item, onHandleUserCheck } = this.props;
        return (
            <TotalItemCardComponent>
                    <CheckBoxDivComponent>
                        <CheckBoxComponent onChange={()=>{onHandleUserCheck(item)}} type="checkbox"/>
                    </CheckBoxDivComponent>
                    <ResourceNameDiv>
                        <TextComponent>{item.resourceName}</TextComponent>
                    </ResourceNameDiv>
                    <ItemNameDiv>
                        <TextComponent>{item.itemName}</TextComponent>
                    </ItemNameDiv>
                    <AccessLevelDiv>
                        <TextComponent>{item.accessLevel}</TextComponent>
                    </AccessLevelDiv>
                    <DiscriptionDiv>
                        <TextComponent>{item.discription}</TextComponent>
                    </DiscriptionDiv>
                    <LinkDiv>
                        <LinkComponent href={item.link}>{item.link}</LinkComponent>
                    </LinkDiv>
            </TotalItemCardComponent>
        );
    }
}
export default UserItemComponent;
