import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const TotalListOfItemsComponent = styled.div `
    color:#7e858e;
    font-size:14px;
`;

const CheckBoxDivComponent = styled.div `
    width:13%;
`;
const CheckBoxComponent = styled.input `
    
`;
const ResourceNameDiv = styled.div `
    width:13%;
  
`;
const ItemNameDiv = styled.div `
    width:13%;
  
`;
const AccessLevelDiv = styled.div `
    width:19%;
    
`;
const DiscriptionDiv = styled.div `
    width:21%;
    
`;
const LinkDiv = styled.div `
    width:21%;
    color:#0b69ff;
   
`;
const TextComponent = styled.p `
`;

const ItemsHeader = styled.div `
    ${tw`flex p-3`};
    border:1px solid #d7dfe9;
    margin:0% 10%;
    font-weight:bold;
`;

const LinkComponent = styled.a `
    ${tw`text-blue-500`};
   
`;
const TextDiv = styled.div `
    ${tw`flex pl-12`};
    width:30%;
`;
const CheckBoxDiv = styled.div `
    width:13%;
    justify-content:flext-start;
`;
export {
    ItemsHeader,
    CheckBoxComponent,
    TextComponent,
    LinkComponent,
    TextDiv,
    CheckBoxDiv,
    TotalListOfItemsComponent,
    DiscriptionDiv,
    LinkDiv,
    AccessLevelDiv,
    ItemNameDiv,
    ResourceNameDiv,
    CheckBoxDivComponent

};
