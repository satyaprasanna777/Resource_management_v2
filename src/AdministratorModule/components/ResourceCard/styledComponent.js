import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourceCardComponent = styled.div `
    width:31%;
    min-width:250px;
    height:180px;
    margin-bottom:2%;
    border:1px solid #d7dfe9;
    background-color:white;
    padding:1%;
`;

const ThumbnailAndNameField = styled.div `;
    display:flex;
    align-items:center;
 `;
const ThumbnailAndNameComponent = styled.img `
        height:44px;
        width:44px;
        border-radius:2px;
        background-color:white;
        object-fit: contain;
        margin:2px;
`;
const TitleComponent = styled.p `
    font-weight:bold;
    margin:12px;
    margin-bottom:6px;
`;

const TitleAndSubTitleComponent = styled.div `
    margin-left:4px;
    margin-bottom:9px;
`;
const SubTitleComponent = styled.p `
    font-size:14px;
    color:gray;
    margin-top:-5px;
    margin-left:5px;
`
const LinkComponent = styled.a `
    color:#0b69ff;
    font-size:14px;
    margin:10px 0px;
`;

const DescriptionComponent = styled.p `
    font-size:14px;
    color:#7e858e;
    margin:1px 0px;
`;
export {
    TotalResourceCardComponent,
    ThumbnailAndNameField,
    ThumbnailAndNameComponent,
    TitleAndSubTitleComponent,
    TitleComponent,
    SubTitleComponent,
    LinkComponent,
    DescriptionComponent
};
