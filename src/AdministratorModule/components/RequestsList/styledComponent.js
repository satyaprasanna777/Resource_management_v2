import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalRequestListComponent = styled.div `
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    margin:0% 9%;
    margin-top:32px;
    background-color:#fbfbfb;
    font-size:12px;
    color:#7e858e;
`;
const TotalRequestCardComponent = styled.div `
    ${tw`flex mx-5 items-center `};
    font-size:14px;
    color:#7e858e;
    width:100%;
    border:1px solid #d7dfe9;
    padding:7px 0px;
    margin-left:0%;
    font-weight:bold;
`;
const CheckBoxComponent = styled.div `
    width:16.6666%;
    display:flex;
    justify-content:flex-start;
    margin-left:-7%;
`;
const ParagraphComponent = styled.p `
    width:16.6666%;
`;
const UserNameAndProfile = styled.div `
     ${tw`flex items-center justify-start`};
     width:16.6666%;
`;
const ProfileComponent = styled.img `
    width:40px;
    width:40px;
`;
export { TotalRequestListComponent, TotalRequestCardComponent, CheckBoxComponent, ParagraphComponent, ProfileComponent, UserNameAndProfile };
