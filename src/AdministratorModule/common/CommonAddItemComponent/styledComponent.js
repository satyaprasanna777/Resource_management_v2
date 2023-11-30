import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const TotalResourceDetailsComponent = styled.div `
    background-color:#fbfbfb;
`;
const ResourceDetailsComponent = styled.p `
    font-size:32px;
    color:#171f46;
`;
const DetailsComponent = styled.div `
    ${tw`flex`};
`;
const LeftHalfDivision = styled.div `
     ${tw`w-6/12 flex flex-col items-center justify-center`};
`;
const RightHalfDivision = styled.div `
    ${tw`w-6/12`};
`;
const ResourceImage = styled.img `
`;
const ContentField = styled.p `
    ${tw`flex flex-col`};
`;
const LabelComponent = styled.p `
    font-size:12px;
    color:#7e858e;
    margin:6px 0px;
`;
const DescriptionComponent = styled.textarea `
    height:80px;
    width:312px;
    font-size:14px;
    color:#171f46;
    border:1px solid #d7dfe9;
    padding:15px;

`;
const LinkComponent = styled.input `
    font-size:14px;
    height:40px;
    color:#0b69ff;
    border:1px solid #d7dfe9;
`;

const ChangePhotoDivComponent = styled.div `
        ${tw`flex items-center my-6`};
`;
const ItemImageComponent = styled.img `
    height:44px;
    width:44px;
    margin:4px;
`;
const IconComponent = styled.img `
    width:16px;
    height:16px;
    transform:rotate(180deg);
    margin:4px;
`;
const ChangePhotoButtonComponent = styled.button `
    font-size:14px;
    color:#7e858e;
    margin:4px;
    align-self:center;
`;
const AddResourceButtonComponent = styled.button `
    background-color:#0b69ff;
    color:white;
    border-radius: 4px;
    ${tw`p-2  self-center mt-8`};

`;
const GoBackButtonComponent = styled.button `
    position:absolute;
    top:90px;
    left:5%;
    font-size:14px;
    color:#7e858e;
`;

export {
    TotalResourceDetailsComponent,
    ResourceDetailsComponent,
    DetailsComponent,
    LeftHalfDivision,
    RightHalfDivision,
    ResourceImage,
    ContentField,
    LabelComponent,
    DescriptionComponent,
    ChangePhotoDivComponent,
    ItemImageComponent,
    IconComponent,
    ChangePhotoButtonComponent,
    AddResourceButtonComponent,
    LinkComponent,
    GoBackButtonComponent
}
