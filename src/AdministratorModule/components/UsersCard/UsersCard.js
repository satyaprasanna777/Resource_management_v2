import React from 'react';
import Strings from '../../i18n/Strings.json'
import {
    TotalRequestCardComponent,
    ParagraphComponent,
    UserNameAndProfile,
    ProfileComponent,
    ProfileNameComponent,
    JobRoleComponent
}
from './styledComponent';
class UsersCard extends React.Component {
    render() {
        const { user, gotoUserDetailsPage } = this.props;
        const testId = user.id === 2 ? "resource-card" : null;
            return (
                <TotalRequestCardComponent data-testid={testId} onClick={()=>{gotoUserDetailsPage(user.id)}}>
                <UserNameAndProfile>
                    <ProfileComponent src={user.pic}/>
                    <ProfileNameComponent>{user.userName}</ProfileNameComponent>
                </UserNameAndProfile>
                <ParagraphComponent>{user.department}</ParagraphComponent>
                <JobRoleComponent>{user.jobRole}</JobRoleComponent>
            </TotalRequestCardComponent>
            );

    }
}
export default UsersCard;
