import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-grid-system';
import EquipNav from './equip_nav';
import $store from '../store';
import EquipView from './equip_view';
import Equip from '../model/equip';

@observer
export default class EquipTab extends Component {
    render() {
        const equip = new Equip();
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <EquipNav store={$store} />
                <Container style={{ flex: 1, paddingTop: 12 }}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <EquipView equip={equip} />
                        </Col>
                        <Col xs={12} sm={6}>Settings</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
