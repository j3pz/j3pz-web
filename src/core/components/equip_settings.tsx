import React from 'react';
import { PanelGroup, Panel } from 'rsuite';
import EquipSelection from './equip_selection';
import $store from '../store';

function EquipSettings() {
    return (
        <PanelGroup accordion bordered style={{ maxWidth: 600 }}>
            <Panel header="装备选择" defaultExpanded>
                <EquipSelection store={$store} />
            </Panel>
            {/* <Panel header="Panel 2">
            </Panel>
            <Panel header="Panel 3">
            </Panel> */}
        </PanelGroup>
    );
}

export default EquipSettings;
