import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-grid-system';
import EquipNav, { navLib } from './equip_nav';
import $store, { StoreProps } from '../store';
import EquipView from './equip_view';
import Equip from '../model/equip';
import EquipSettings from './equip_settings';

@observer
export default class EquipTab extends Component<StoreProps> {
    render() {
        const { store } = this.props;
        const equip = store.equips[store.activeEquipNav] ?? new Equip(navLib.get(store.activeEquipNav)!.category);
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <EquipNav store={$store} />
                <Container style={{ flex: 1, paddingTop: 12 }}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <EquipView equip={equip} />
                        </Col>
                        <Col xs={12} sm={6}><EquipSettings /></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
