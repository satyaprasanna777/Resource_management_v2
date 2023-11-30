import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourcesComponent = styled.div `
    background-color:#fbfbfb;
`;
const PaginationComponent = styled.div `
    ${tw` flex border border-black-900`};
    position:absolute;
    right:30px;
    bottom:1px;
    
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
    TotalResourcesComponent,
    PaginationComponent,
    PaginationChildrenDiv,
    IncrementOffSetComponent,
    FinalPageNumber,
    CurrentPageNumber,
    DecrementOffSetComponent

};
