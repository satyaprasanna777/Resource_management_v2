import styled from '@emotion/styled';
import tw from 'tailwind.macro';
const SignInPageContainer = styled.div `
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    background-color:#f1f7ff;
`;
const SignInPageForm = styled.div `
    display:flex;
    flex-direction:column;
    height:687px;
    width:536px;
    background-color:white;
    margin-top:168px;
    margin-bottom:169px;
`;
const SignInHeading = styled.p `
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
  text-align:center;;

`;
const LabelComponent = styled.p `
    font-size:12px;
    color:#7e858e;
    margin-left:108px;
    margin-top:56px;
    margin-top:24px;
    margin-bottom:8px;
`;
const SignInUserNameField = styled.input `
    border:1px solid #7e858e;
    height:40px;
    width:320px;
    border-radius:2px;
    align-self:center;
    font-size:14px;
    padding:16px;
`
const SignInPasswordField = styled.input `
    border:1px solid #7e858e;
    margin-bottom:12px;
    height:40px;
    width:320px;
    border-radius:2px;
    align-self:center;
    padding:16px;
`
const SignInButtonComponent = styled.button `
width: 320px;
  height: 40px;
  border-radius: 4px;
  background-color:#0b69ff; 
  align-self:center;
  margin-top:20px;
  color:white;
  margin-bottom:32px;
  font-size:14px;
  font-weight:bold;
`
const SimpleSpanComponent = styled.span `

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
    margin-bottom:12px;
`;
const AlreadyHaveAnAccount = styled.p `
    font-size:14px;
    align-self:center;
    color:#171f46;
`;
const LinkComponent = styled.a `
    color:#0b69ff;
`;
const ErrorTextComponent = styled.span `
    color:#ff0b37;
    font-size:16px;
    margin-left:108px;
`;
export {
    SignInPageContainer,
    SignInPageForm,
    SignInHeading,
    IbHubsLogoComponent,
    SignInUserNameField,
    SignInPasswordField,
    SignInButtonComponent,
    SimpleSpanComponent,
    EnterDetailsAlertComponent,
    LabelComponent,
    AlreadyHaveAnAccount,
    ErrorTextComponent,
    LinkComponent
}
