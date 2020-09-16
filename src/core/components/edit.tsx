import React, { Component } from 'react';
import { Nav, FlexboxGrid } from 'rsuite';
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
                <FlexboxGrid style={{ height: '100%' }}>
                    <FlexboxGrid.Item colspan={18} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Nav activeKey={store.tab} appearance="subtle" onSelect={this.switchTab} style={{ textAlign: 'right' }}>
                            <Nav.Item eventKey={AppTab.EQUIP}>装备调整</Nav.Item>
                            <Nav.Item eventKey={AppTab.CASE}>方案调整</Nav.Item>
                        </Nav>
                        { store.tab === AppTab.EQUIP && <EquipTab />}
                        { store.tab === AppTab.CASE && <CaseTab />}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ borderLeft: '1px solid #CCCCCC', height: '100%' }} colspan={6}>
                        <Nav appearance="subtle">
                            <Nav.Item icon={<i className="fal fa-undo" />} />
                            <Nav.Item icon={<i className="fal fa-redo" />} />
                            <Nav.Item icon={<i className="fal fa-save" />} />
                            <Nav.Item icon={<i className="fal fa-folder-open" />} />
                            <Nav.Item icon={<i className="fal fa-share-alt" />} />
                        </Nav>
                        result
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </main>
        );
    }
}