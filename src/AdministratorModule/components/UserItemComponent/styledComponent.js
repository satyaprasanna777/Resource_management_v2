import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalItemCardComponent = styled.div `
    display:flex;
    color:#7e858e;
    font-size:14px;
    border:1px solid #d7dfe9;
    padding:1%;
    width:80%;
    margin-left:10%;
    margin-right:80%;
`;
const CheckBoxDivComponent = styled.div `
    display:flex;
    justify-content:center;
    width:13%;
   
    
`;
const CheckBoxComponent = styled.input `
    
`;
const ResourceNameDiv = styled.div `
    width:13%;
    border:1 px solid blue;
  
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
const LinkComponent = styled.a `
`
export {
    TotalItemCardComponent,
    CheckBoxDivComponent,
    CheckBoxComponent,
    ResourceNameDiv,
    AccessLevelDiv,
    TextComponent,
    LinkDiv,
    DiscriptionDiv,
    ItemNameDiv,
    LinkComponent
};
