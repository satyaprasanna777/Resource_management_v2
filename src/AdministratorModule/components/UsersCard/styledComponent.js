import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalRequestCardComponent = styled.div `
    ${tw`flex px-16 py-2 justify-between`};
    border: solid 1px #d7dfe9;
    width:100%;
    margin-left:0% 10%;
    font-size:14px;
    color:#7e858e;
    
`;
const ParagraphComponent = styled.p `
        width:45%;
       
`;
const JobRoleComponent = styled.p `
        width:10%;
     
`;
const ProfileNameComponent = styled.p `
    margin:5px;
`;
const UserNameAndProfile = styled.div `
     ${tw`flex items-center self-center justify-start`};
     width:45%;
`;
const ProfileComponent = styled.img `
    width:50px;
    width:50px;
`;
export { TotalRequestCardComponent, ParagraphComponent, JobRoleComponent, ProfileComponent, UserNameAndProfile, ProfileNameComponent };
