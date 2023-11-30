import React from 'react';
import Strings from '../../i18n/Strings.json';
import { profileLogo } from '../../Assets'
import {
    TotalRequestCardComponent,
    CheckBoxComponent,
    ParagraphComponent,
    UserNameAndProfile,
    ProfileComponent,
    CheckboxDiv
}
from './styledComponent';
class RequestCard extends React.Component {
    render() {
        const { request, onHandleCheck } = this.props;
        const testId = request.id === 2 ? "request-card" : null;
        return (
            <TotalRequestCardComponent >
                <CheckboxDiv>
                <CheckBoxComponent data-testid={testId} onChange={()=>{onHandleCheck(request.id)}} type="checkbox"></CheckBoxComponent>
                </CheckboxDiv>
                <UserNameAndProfile>
                    <ProfileComponent src={profileLogo}/>
                    <ParagraphComponent>{request.userName}</ParagraphComponent>
                </UserNameAndProfile>
                <ParagraphComponent>{request.resourceName}</ParagraphComponent>
                <ParagraphComponent>{request.itemName}</ParagraphComponent>
                <ParagraphComponent>{request.accessLevel}</ParagraphComponent>
                <ParagraphComponent>{request.dueDateTime}</ParagraphComponent>
            </TotalRequestCardComponent>
        );

    }
}
export default RequestCard;
