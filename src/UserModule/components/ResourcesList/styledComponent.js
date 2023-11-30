import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourceListComponent = styled.div `
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    margin:0% 10%;
    margin-top:32px;
`;
const TotalHeaderComponent = styled.div `
    ${tw`flex`};
    width:100%;
    border:1px solid #d7dfe9;
    background-color:#fbfbfb;
    padding:1.5% 5%;
    color:#7e858e;
    font-size:12px;
    font-weight:bold;
`;

const ResourceNameComponent = styled.p `
    width:25%;

`;

const ItemNameComponent = styled.p `
    width:25%;
`;

const AccessLevelComponent = styled.p `
    width:25%;
`;

const LinkComponent = styled.p `
    width:25%;
`
export {
    TotalResourceListComponent,
    ResourceNameComponent,
    ItemNameComponent,
    AccessLevelComponent,
    LinkComponent,
    TotalHeaderComponent
};
