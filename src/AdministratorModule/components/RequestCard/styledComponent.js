import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalRequestCardComponent = styled.div `
    ${tw`flex mx-5 items-center `};
    font-size:14px;
    color:#7e858e;
    width:100%;
    border:1px solid #d7dfe9;
    padding:7px 0px;
    margin-left:0%;
`;
const CheckboxDiv = styled.div `
    width:10%;
    display:flex;
    justify-content:center;
`
const CheckBoxComponent = styled.input `
    display:flex;
    justify-content:flex-start;
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
    height:40px;
    border-radius:100%;
    margin:5px;
`;
export { TotalRequestCardComponent, CheckboxDiv, CheckBoxComponent, ParagraphComponent, ProfileComponent, UserNameAndProfile };
