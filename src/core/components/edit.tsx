import React, { Component } from 'react';
import { Nav } from 'rsuite';
import { observer } from 'mobx-react';
import { StoreProps, AppTab } from '../store';
import EquipTab from './equip_tab';
import CaseTab from './case_tab';

@observer
export default class CoreEdit extends Component<StoreProps> {
    switchTab = (key: AppTab) => {
        const { store } = this.props;
        store.tab = key;
    };

    render() {
        const { store } = this.props;
        return (
            <main
                style={{
                    paddingTop: 56,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Nav activeKey={store.tab} appearance="subtle" onSelect={this.switchTab}>
                    <Nav.Item eventKey={AppTab.EQUIP}>装备调整</Nav.Item>
                    <Nav.Item eventKey={AppTab.CASE}>方案调整</Nav.Item>
                </Nav>
                { store.tab === AppTab.EQUIP && <EquipTab />}
                { store.tab === AppTab.CASE && <CaseTab />}
            </main>
        );
    }
}
