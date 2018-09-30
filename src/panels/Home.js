import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Group, Button, Div, PanelHeader} from '@vkontakte/vkui';


const Home = props => (
    <Panel id={props.id}>
        <PanelHeader>IP Calculator</PanelHeader>
        <Group>
            <Div>
                <Button size="xl" level="2" onClick={props.go} data-to="persik">
                    Calculate
                </Button>
            </Div>
        </Group>
    </Panel>
);

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
