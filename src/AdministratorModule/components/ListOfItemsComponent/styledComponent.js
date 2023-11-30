import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const TotalListOfItemsComponent = styled.div `
    
`;

const ItemsHeader = styled.div `
    ${tw`flex p-3`};
    border:1px solid #d7dfe9;
    margin:0% 10%;
`;

const CheckBoxComponent = styled.input `
    
`;
const TextComponent = styled.p `
    font-size:14px;
    color:#7e858e;
    overflow:hidden;
    margin-right:8px;
    font-weight:bold;
    
`;
const LinkComponent = styled.a `
    ${tw`text-blue-500`};
    color:#7e858e;
    font-weight:bold;
   
`;
const TextDiv = styled.div `
    ${tw`flex pl-12`};
    width:30%;
`;
const CheckBoxDiv = styled.div `
    width:10%;
    justify-content:flext-start;
`;
export {
    ItemsHeader,
    CheckBoxComponent,
    TextComponent,
    LinkComponent,
    TextDiv,
    CheckBoxDiv,
    TotalListOfItemsComponent
};
