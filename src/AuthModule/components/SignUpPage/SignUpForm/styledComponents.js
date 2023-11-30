import styled from '@emotion/styled';
import tw from 'tailwind.macro'
const SignUpPageContainer = styled.div `
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    background-color:#f1f7ff;
`
const SignUpPageForm = styled.div `
    display:flex;
    flex-direction:column;
    height:687px;
    width:536px;
    background-color:white;
    margin-top:168px;
    margin-bottom:169px;
`
const SignUpHeading = styled.h2 `
    width: 347px;
  height: 40px;
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color:#171f46;
  align-self:center;

`
const LabelComponent = styled.p `
    font-size:12px;
    color:#7e858e;
    margin-left:108px;
    margin-top:56px;
    margin-top:24px;
    margin-bottom:8px;
`;
const ErrorTextComponent = styled.span `
    color:#ff0b37;
    font-size:16px;
    margin-left:108px;

`
const EnterDetailsAlertComponent = styled.span `
    ${tw`
            text-red-700 mt-2 w-48 text-sm
    `}
`;
const IbHubsLogoComponent = styled.img `
    height:90px;
    width:90px;
    align-self:center;
    margin-top:48px;
`;
const AlreadyHaveAnAccount = styled.p `
    font-size:14px;
    align-self:center;
    color:#171f46;
`;
const LinkComponent = styled.a `
    color:#0b69ff;
`;
export {
    SignUpPageContainer,
    SignUpPageForm,
    SignUpHeading,
    IbHubsLogoComponent,
    ErrorTextComponent,
    EnterDetailsAlertComponent,
    LabelComponent,
    AlreadyHaveAnAccount,
    LinkComponent
}
