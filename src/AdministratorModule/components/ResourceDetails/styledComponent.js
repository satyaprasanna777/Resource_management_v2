import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourceDetailsComponent = styled.div `
     background-color:#fbfbfb;
`;
const ResourceDetailsComponent = styled.div `
    margin-left:10%;
    margin-right:10%;
`;
const ProfilePicAndNameDiv = styled.div `
     ${tw`flex items-center`};
`;
const NameAndIdDivision = styled.div `
   margin: 2px 8px;
`;

const ProfilePic = styled.img `
    height:50px;
    width:50px;
    margin-top:2px;
    margin-right:3px;
   
`;
const NameComponent = styled.p `
    font-size:28px;
    color:#171f46;
    margin-bottom:-4px;
`;
const IdComponent = styled.p `
    font-size:16px;
    color:#7e858e;
    margin-bottom:-2px;
`;
const LinkComponent = styled.a `
    ${tw` `};
    color:#0b69ff;
    font-size:14px;
    margin-top:-3px;
`
const DescriptionComponent = styled.div `
    max-width:450px;
    font-size:14px;
    color:#7e858e;
    margin-top:2px;
`;
const UpdateButtonComponent = styled.button `
    color:white;
     ${tw` p-2`};
     width:93px;
     height:40px;
     border-radius:4px;
        margin-top:45px;
        margin-bottom:35px;
     background-color:#0b69ff;
     
`;
const ItemsTextComponent = styled.p `
font-size:24px;
color:#171f46;
`;
const SearchBarAndSort = styled.div `
    justify-content:space-center;
    display:flex;
    align-items:center;
    margin-right:-27%;
    margin-top:-1%;
    width:100%;
    
`;
const SearchAndItemsDiv = styled.div `
    ${tw` flex `};
    align-items:center;
    justify-content:space-between;
    width:80%;
    margin-left: 10%;
    margin-right:10%;
    margin-top:1%;
    margin-bottom:3%;
    overflow:hidden;

`;

const ListOfItemsDiv = styled.div `;
`;

const SelectDiv = styled.select `
    height:20px;
    margin-bottom:-18px;
    margin-left:10px;
`;
const GoBackButtonComponent = styled.button `
    color:gray;
    font-size:17px;
    margin-left:10%;
    margin-top:1.7%;
    margin-bottom:1%;
`;

const FooterComponent = styled.div `
     ${tw`flex justify-between`};
     margin:2% 10%;
`;
const AddItemAndDeleteItemsDiv = styled.div `
    ${tw`flex items-center justify-center`};
`;
const AddButton = styled.button `
    padding:8px;
    background-color:${props=>props.disabled?'lightgray':'#2dca73'};
    font-size:14px;
    color:white;
    border-radius:4px;
    font-weight:bold;
    margin:2px;
 `;
const DeleteButton = styled.button `
    padding:8px;
    background-color:${props=>props.disabled?'lightgray':'#ff0b37'};
    font-size:14px;
    color:white;
    border-radius:4px;
    font-weight:bold;
    margin:2px;
  `;
const PaginationComponent = styled.div `
    ${tw` flex border border-black-900`};
`;
const DecrementOffSetComponent = styled.button `
    
`;
const CurrentPageNumber = styled.p `
     
`;
const FinalPageNumber = styled.p `
     
`;
const IncrementOffSetComponent = styled.button `
     
`;
const PaginationChildrenDiv = styled.div `
    ${tw`flex items-center justify-center`};
     border:1px solid gray;
     font-size:14px;
     margin:1px;
     height:30px;
     width:30px;
`
export {
    TotalResourceDetailsComponent,
    ResourceDetailsComponent,
    ProfilePicAndNameDiv,
    NameAndIdDivision,
    ProfilePic,
    NameComponent,
    IdComponent,
    LinkComponent,
    DescriptionComponent,
    UpdateButtonComponent,
    ItemsTextComponent,
    SearchBarAndSort,
    SearchAndItemsDiv,
    ListOfItemsDiv,
    SelectDiv,
    GoBackButtonComponent,
    FooterComponent,
    AddItemAndDeleteItemsDiv,
    AddButton,
    DeleteButton,
    PaginationComponent,
    DecrementOffSetComponent,
    CurrentPageNumber,
    FinalPageNumber,
    IncrementOffSetComponent,
    PaginationChildrenDiv
};
