import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Message from '@vkontakte/icons/dist/24/message';
import './Footer.css'

class About extends Component {

    render() {
        const osname = UI.platform();

        return (
            <UI.Panel id={this.props.id}>
                <UI.PanelHeader
                    left={<UI.HeaderButton onClick={this.props.go} data-to={this.props.back}>{osname === UI.IOS ?
                        <Icon28ChevronBack/> : <Icon24Back/>}</UI.HeaderButton>}
                >
                    О программе
                </UI.PanelHeader>
                <UI.Group title="Беcклассовая IP адресация">
                        <UI.List>
                            <UI.Cell multiline>
                                Беcклассовая адресация (Classless InterDomain Routing, англ. CIDR) - метод IP-адресации,
                                позволяющий гибко управлять пространством IP-адресов, не используя жёсткие рамки
                                классовой адресации. Использование этого метода позволяет экономно использовать конечный
                                ресурс IP-адресов.</UI.Cell>
                            <UI.Cell multiline>
                                Беcклассовая адресация основывается на переменной длине маски подсети
                                (Variable Length Subnet Mask - VLSM), в то время, как в классовой адресации длина маски
                                строго фиксирована 0, 1, 2 или 3 установленными байтами. Вот пример записи IP-адреса с
                                применением беcклассовой адресации: 10.1.2.33/27.
                            </UI.Cell>
                            <UI.Cell multiline>
                                Маски подсети являются основой метода бесклассовой маршрутизации (CIDR). При этом
                                подходе маску подсети записывают вместе с IP-адресом в формате IP-адрес/количество
                                единичных бит в маске. Число после слэша означает количество единичных разрядов в
                                маске подсети.
                            </UI.Cell>
                            <UI.Cell multiline>
                                Рассмотрим пример записи диапазона IP-адресов в виде 10.96.0.0/11. В этом случае маска
                                подсети будет иметь двоичный вид 11111111 11100000 00000000 00000000, или то же самое
                                в десятичном виде: 255.224.0.0. 11 разрядов IP-адреса отводятся под номер сети, а
                                остальные 32 - 11 = 21 разряд полного адреса - под локальный адрес в этой сети. Итого,
                                10.96.0.0/11 означает диапазон адресов от 10.96.0.1 до 10.127.255.255.
                            </UI.Cell>
                        </UI.List>
                </UI.Group>
                <UI.Group title="Исходный код">
                    <UI.Div>
                        Исходный код доступен на <UI.Link href="https://github.com/gromr1/react-vk-netcalc">GitHub</UI.Link>.
                    </UI.Div>
                </UI.Group>

                <UI.Div className="footer">
                    <UI.Button level="3" component="a"
                               href="https://vk.me/gainanovrus" before={<Icon24Message/>}>Написать автору</UI.Button>
                </UI.Div>
            </UI.Panel>
        );
    }
}

export default About;