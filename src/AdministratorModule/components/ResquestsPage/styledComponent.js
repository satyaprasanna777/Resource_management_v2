import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const TotalRequestsPage = styled.div `
    background-color:#fbfbfb;
`;
const PendingRequestes = styled.p `
    ${tw` mt-8`};
    color:#171f46;
    font-size:24px;
    margin-left:9%;
`;
const SearchBarAndFiltersDiv = styled.div `
    ${tw`flex justify-between items-center`};
    margin-right:10%;
`;
const FilterAndSortDiv = styled.div `
    ${tw`flex  justify-center items-center`};
`
const PaginationComponent = styled.div `
    ${tw` flex border border-black-900`};
    position:absolute;
    right:10%;
    bottom:15px;
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
    TotalRequestsPage,
    PendingRequestes,
    SearchBarAndFiltersDiv,
    FilterAndSortDiv,
    PaginationComponent,
    PaginationChildrenDiv,
    IncrementOffSetComponent,
    FinalPageNumber,
    CurrentPageNumber,
    DecrementOffSetComponent

};
