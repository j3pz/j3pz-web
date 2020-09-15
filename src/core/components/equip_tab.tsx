import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-grid-system';
import EquipNav from './equip_nav';
import $store from '../store';

@observer
export default class EquipTab extends Component {
    render() {
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <EquipNav store={$store} />
                <Container style={{ flex: 1 }}>
                    <Row>
                        <Col xs={12} sm={6}>Equip</Col>
                        <Col xs={12} sm={6}>Settings</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
