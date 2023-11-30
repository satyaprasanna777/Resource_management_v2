import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalUsersListComponent = styled.div `
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    margin:0% 9%;
    margin-top:32px;
    background-color:#fbfbfb;
`;
const UsersHeader = styled.div `
    ${tw`flex px-16 py-4`};
    border: solid 1px #d7dfe9;
    width:100%;
    margin-left:0% 10%;
`;
const PersonNameComponent = styled.p `
    font-size:12px;
    color:#171f46;
    font-weight:bold;
    width:45%;
`;
const DepartmentComponent = styled.p `
    font-size:12px;
    color:#171f46;
    font-weight:bold;
    width:45%;
`;
const JobRoleComponent = styled.p `
    font-size:12px;
    color:#171f46;
    font-weight:bold;
    width:10%;
`;
export {
    TotalUsersListComponent,
    UsersHeader,
    PersonNameComponent,
    DepartmentComponent,
    JobRoleComponent
};
