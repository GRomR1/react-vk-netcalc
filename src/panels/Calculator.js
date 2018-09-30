import React from 'react';
import {View, HeaderButton, Panel, Group, Button, PanelHeader, FormLayout, Div, Select, Input} from '@vkontakte/vkui';
import {InfoRow, List, Cell, platform, colors, IOS} from '@vkontakte/vkui';
import validator from 'validator';
import './Calculator.css';

import '@vkontakte/vkui/dist/vkui.css';
import './Persik.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import IPv4_Address from '../misc/ip_calculations'

const osname = platform();

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 'calculator',
            address: '192.168.0.1',
            valid: true,
            netmask: '24',
            result: {
                'netmask': '',
                'network': '',
                'broadcast': '',
                'hosts': '',
                'hostMin': '',
                'hostMax': ''
            }
        };
        this.go = this.go.bind(this);
        this.IPv4_Address = IPv4_Address;
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNetmaskChange = this.handleNetmaskChange.bind(this);
    }

    handleAddressChange(event) {
        const value = event.target.value;
        console.log("handleAddressChange " + value);
        console.log(validator.isIP(value));

        this.setState({
            address: value,
            valid: validator.isIP(value)
        });
    }

    handleNetmaskChange(event) {
        const value = event.target.value;
        console.log("handleNetmaskChange " + value);

        this.setState({
            netmask: value
        });
    }

    go(e) {
        console.log("go " + e.currentTarget.dataset.to);
        if(this.state.valid === true) {
            let res = IPv4_Address(
                this.state.address,
                this.state.netmask
            );
            console.log(res);
            this.setState({
                activePanel: e.currentTarget.dataset.to,
                result: res
            })
        }
    }

    render() {
        return (
            <View activePanel={this.state.activePanel}>
                <Panel id='calculator'>
                    <PanelHeader>IP Calculator</PanelHeader>
                        <Group description=
                                   "Калькулятор сети производит расчет адреса сети, широковещательного адреса,
                                        количество хостов и диапазон допустимых адресов в сети.
                                        Для того, чтобы рассчитать эти данные, укажите IP-адрес хоста и маску сети.">
                        </Group>
                    <Group>
                        <FormLayout>
                            <Input top="IP Address:"
                                   type="text"
                                   name="address"
                                   value={this.state.address}
                                   onChange={this.handleAddressChange}/>
                            <Select top="Netmask:"
                                    value={this.state.netmask}
                                    onChange={this.handleNetmaskChange}>
                                <option value="0">0 - 0.0.0.0</option>
                                <option value="1">1 - 128.0.0.0</option>
                                <option value="2">2 - 192.0.0.0</option>
                                <option value="3">3 - 224.0.0.0</option>
                                <option value="4">4 - 240.0.0.0</option>
                                <option value="5">5 - 248.0.0.0</option>
                                <option value="6">6 - 252.0.0.0</option>
                                <option value="7">7 - 254.0.0.0</option>
                                <option value="8">8 - 255.0.0.0</option>
                                <option value="9">9 - 255.128.0.0</option>
                                <option value="10">10 - 255.192.0.0</option>
                                <option value="11">11 - 255.224.0.0</option>
                                <option value="12">12 - 255.240.0.0</option>
                                <option value="13">13 - 255.248.0.0</option>
                                <option value="14">14 - 255.252.0.0</option>
                                <option value="15">15 - 255.254.0.0</option>
                                <option value="16">16 - 255.255.0.0</option>
                                <option value="17">17 - 255.255.128.0</option>
                                <option value="18">18 - 255.255.192.0</option>
                                <option value="19">19 - 255.255.224.0</option>
                                <option value="20">20- 255.255.240.0</option>
                                <option value="21">21 - 255.255.248.0</option>
                                <option value="22">22 - 255.255.252.0</option>
                                <option value="23">23 - 255.255.254.0</option>
                                <option value="24">24 - 255.255.255.0</option>
                                <option value="25">25 - 255.255.255.128</option>
                                <option value="26">26 - 255.255.255.192</option>
                                <option value="27">27 - 255.255.255.224</option>
                                <option value="28">28 - 255.255.255.240</option>
                                <option value="29">29 - 255.255.255.248</option>
                                <option value="30">30 - 255.255.255.252</option>
                                <option value="31">31 - 255.255.255.254</option>
                                <option value="32">32 - 255.255.255.255</option>
                            </Select>
                            <Div
                                style={{
                                    backgroundColor: this.state.valid === true ?
                                        colors['green'] :
                                        colors['red_error']
                                }}>
                                Address {this.state.valid === true ? 'valid' : 'invalid'}
                            </Div>
                        </FormLayout>
                        <Div>
                            <Button size="xl" level="2" onClick={this.go} data-to="calculator_result">
                                Calculate
                            </Button>
                        </Div>
                    </Group>
                </Panel>


                <Panel id='calculator_result'>
                    <PanelHeader
                        left={<HeaderButton onClick={this.go} data-to="calculator">
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>}
                    >
                        Result
                    </PanelHeader>
                    <Group>
                        <Div>
                            <InfoRow title="IP Address">
                                {this.state.address}
                            </InfoRow>

                            <InfoRow title="Netmask">
                                {this.state.result.netmask} = {this.state.netmask}
                            </InfoRow>
                        </Div>
                    </Group>
                    <Group>
                        <List>
                            <Cell>
                                <InfoRow title="Network">
                                    {this.state.result.network} / {this.state.netmask}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow title="Broadcast">
                                    {this.state.result.broadcast}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow title="HostMin">
                                    {this.state.result.hosts > 0? this.state.result.hostMin: 'N/A'}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow title="HostMax">
                                    {this.state.result.hosts > 0? this.state.result.hostMax: 'N/A'}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow title="Hosts">
                                    {this.state.result.hosts > 0? this.state.result.hosts: 'N/A'}
                                </InfoRow>
                            </Cell>
                        </List>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default Calculator;
