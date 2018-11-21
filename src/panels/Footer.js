import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './Footer.css'
// import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon24About from '@vkontakte/icons/dist/24/about';


function Footer(props) {
    return (
        <UI.Div className="footer">
            <UI.Button level="3" component="a" onClick={props.go} before={<Icon24About/>}
                       data-to="about">О программе</UI.Button>
        </UI.Div>
    );
}

export default Footer;