import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-grid-system';
import { EquipNav, navLib } from './equip_nav';
import { $store, StoreProps } from '../../store';
import { EquipView } from '../equip_view/equip_view';
import { Equip } from '../../model/equip';
import { EquipSettings } from './equip_settings';
import { PlatformUtil } from '../../utils/platform_utils';

@observer
export class EquipTab extends Component<StoreProps> {
    render() {
        const { store } = this.props;
        const equip = store.equips[store.activeEquipNav] ?? new Equip(navLib.get(store.activeEquipNav)!.category);
        const isMobile = PlatformUtil.isMobile();
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <EquipNav store={$store} />
                <Container
                    style={{
                        flex: 1,
                        paddingTop: 12,
                        overflow: 'auto',
                        paddingBottom: isMobile ? 24 : 0,
                        marginLeft: store.equipNavExpanded && isMobile ? -176 : 'auto',
                    }}
                >
                    <Row>
                        <Col sm={12} md={6}>
                            <EquipView equip={equip} stone={store.stones[store.activeEquipNav]} />
                        </Col>
                        <Col sm={12} md={6}>
                            <EquipSettings />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
