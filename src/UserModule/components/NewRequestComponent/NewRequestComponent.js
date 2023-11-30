import React from 'react';
import Strings from '../../i18n/Strings.json'
import { Header, DropDownWithLabel } from '../../common';
import {
    TotalNewRquestPageComponent,
    RequestsPageComponent,
    LeftHalfComponent,
    RightHalfComponent,
    CenterComponent,
    DropDownFieldDiv
}
from './styledComponent';
class NewRequestComponent extends React.Component {
    render() {
        return <TotalNewRquestPageComponent>
            <Header display={false}/>
            <RequestsPageComponent>
                <LeftHalfComponent>
                <DropDownFieldDiv>
                    <DropDownWithLabel 
                    labelText={Strings.newRequest.resourceLabel} 
                    hiddenOption={Strings.newRequest.selectLabel}
                    optionsList={["Gmail","GitHub"]}/>
                </DropDownFieldDiv>
                <DropDownFieldDiv>
                    <DropDownWithLabel 
                    labelText={Strings.newRequest.itemLabel} 
                    hiddenOption={Strings.newRequest.selectLabel}
                    optionsList={["Gmail","GitHub"]}
                    />
                </DropDownFieldDiv>
                <DropDownFieldDiv>
                <DropDownWithLabel 
                labelText={Strings.newRequest.accessLevelLabel} 
                hiddenOption={Strings.newRequest.selectLabel}
                optionsList={["Gmail","GitHub"]}
                />
                </DropDownFieldDiv>
                </LeftHalfComponent>
                 <CenterComponent>
                
                </CenterComponent>
                <RightHalfComponent>
                
                </RightHalfComponent>
            </RequestsPageComponent>
        </TotalNewRquestPageComponent>;
    }
}
export default NewRequestComponent;
