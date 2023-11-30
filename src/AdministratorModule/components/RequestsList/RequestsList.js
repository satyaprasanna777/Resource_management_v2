import React from 'react';
import RequestCard from '../RequestCard';
import {
    TotalRequestListComponent,
    TotalRequestCardComponent,
    CheckBoxComponent,
    ParagraphComponent,

}
from './styledComponent.js'
import Strings from '../../i18n/Strings.json'
class RequestsList extends React.Component {
    render() {
        const { listOfRequests, onHandleCheck } = this.props;
        return (
            <TotalRequestListComponent>
                <TotalRequestCardComponent>
                <CheckBoxComponent></CheckBoxComponent>
                <ParagraphComponent>{Strings.personName}</ParagraphComponent>
                <ParagraphComponent>{Strings.resource}</ParagraphComponent>
                <ParagraphComponent>{Strings.item}</ParagraphComponent>
                <ParagraphComponent>{Strings.accessLevel}</ParagraphComponent>
                <ParagraphComponent>{Strings.dueDateTime}</ParagraphComponent>
            </TotalRequestCardComponent>
                {listOfRequests.map(eachRequest=><RequestCard onHandleCheck={onHandleCheck} request={eachRequest}/>)}
            </TotalRequestListComponent>
        );
    }
}
export default RequestsList;
