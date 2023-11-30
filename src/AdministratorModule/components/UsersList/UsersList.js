import React from 'react';
import UsersCard from '../UsersCard';
import Strings from '../../i18n/Strings.json'
import {
    TotalUsersListComponent,
    UsersHeader,
    PersonNameComponent,
    DepartmentComponent,
    JobRoleComponent
}
from './styledComponent.js';
class UsersList extends React.Component {
    render() {
        const { usersList, gotoUserDetailsPage } = this.props;
        return (
            <TotalUsersListComponent>
                <UsersHeader>
                    <PersonNameComponent>{Strings.usersList.personNameText}</PersonNameComponent>
                    <DepartmentComponent>{Strings.usersList.departmentText}</DepartmentComponent>
                    <JobRoleComponent>{Strings.usersList.jobRoleText}</JobRoleComponent>
                </UsersHeader>
                {usersList.map(eachUser=><UsersCard gotoUserDetailsPage={gotoUserDetailsPage} key={eachUser.id} user={eachUser}/>)}
            </TotalUsersListComponent>
        );
    }
}
export default UsersList;
