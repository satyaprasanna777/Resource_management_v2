import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourceCardComponent = styled.div `
    ${tw`flex `};
    width:100%;
    border:1px solid #d7dfe9;
    background-color:#fbfbfb;
    padding:1.5% 5%;
    color:#7e858e;
`;

const ResourceNameComponent = styled.p `
    width:25%
`;

const ItemNameComponent = styled.p `
    width:25%
`;

const AccessLevelComponent = styled.p `
    width:25%
`;

const LinkComponent = styled.a `
    width:25%;
    color:#0b69ff;
`

export {
    TotalResourceCardComponent,
    ResourceNameComponent,
    ItemNameComponent,
    AccessLevelComponent,
    LinkComponent,
};
