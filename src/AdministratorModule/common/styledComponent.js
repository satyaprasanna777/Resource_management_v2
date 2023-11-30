import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const HeaderComponent = styled.div `
    ${tw`
            w-screen flex items-center justify-between px-5 bg-white
    `};
    height:72px;
    border:1px solid #d7dfe9;
`;
const IbHubsHeaderLogoComponent = styled.img `
  width: 216px;
  height: 36px;
`;
const UserProfileComponent = styled.img `
  width:50px;
  height:50px;
  border-radius:100%;
`;
const AddButtonComponent = styled.button `
    ${tw`
            text-white p-2 mr-4
    `};
    background-color:${props=>props.bgColor};
    font-size:14px;
    height:40px;
    width:93px;
    border-radius:4px;
    
`;
const AddAndProfile = styled.div `
  ${tw`
           flex items-center
    `};
`;
const ToggleBarComponent = styled.div `
  ${tw`
             flex items-center justify-center px-5 self-center mt-8
    `};
  
`
const ToggleButtonComponent = styled.button `
    ${tw`
           text-white bg-red-500
    `};
    background-color: ${ props => props.text===props.clickStatus ? "#0b69ff" : "white" };
    font-size:14px;
    color:${ props => props.text===props.clickStatus ? "white" : "black" };
    width:200px;
    height:40px;
    border:1px solid #d7dfe9;
`;

const SearchBarComponent = styled.div `
${tw`
      flex items-center
    `};
  margin-left:10%;
  margin-top:2%;
  height:40px;
  width:50%;
  border-radius:3px;
  border:1px solid #d7dfe9;
  background-color:white;
  border-radius:3px;
`;
const SearchBarInputFieldComponent = styled.input `
    width:90%;
`
const SearchIconComponent = styled.img `
  width:17px;
  height:17px;
  margin:10px;
`;

const FilterBarComponent = styled.select `
    font-size:15px;
    
`;

const LabelComponent = styled.p `
  font-size:12px;
  color:#7e858e;
  margin:10px 0px;
`
const LabelWithInputField = styled.div `
`;
const InputFieldComponent = styled.input `
    width:320px;
    height:40px;
    border:1px solid #d7dfe9;
    padding:2px 8px;
`;
export {
  HeaderComponent,
  IbHubsHeaderLogoComponent,
  ToggleButtonComponent,
  UserProfileComponent,
  AddButtonComponent,
  AddAndProfile,
  ToggleBarComponent,
  SearchBarComponent,
  SearchBarInputFieldComponent,
  SearchIconComponent,
  FilterBarComponent,
  LabelComponent,
  LabelWithInputField,
  InputFieldComponent
};
