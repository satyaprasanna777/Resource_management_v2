import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const ItemStyledDiv = styled.div `
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
    
    
`;
const LinkComponent = styled.a `
    ${tw`text-blue-500`};
  
`;
const TextDiv = styled.div `
    ${tw`flex pl-12`};
    width:30%;
    
`;
const CheckBoxDiv = styled.div `
    width:10%;
    display:flex;
    justify-content:center;

`;
export {
    ItemStyledDiv,
    CheckBoxComponent,
    TextComponent,
    LinkComponent,
    TextDiv,
    CheckBoxDiv
};
