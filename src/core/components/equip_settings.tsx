import React from 'react';
import { PanelGroup, Panel } from 'rsuite';
import { EquipSelection } from './equip_selection';
import { $store } from '../store';
import { EquipEnhance } from './equip_enhance';
import { EquipEmbed } from './equip_embed';
import { StoneSetting } from './stone_setting';

function EquipSettings() {
    return (
        <PanelGroup accordion bordered style={{ maxWidth: 600 }}>
            <Panel header="装备选择" defaultExpanded>
                <EquipSelection store={$store} />
            </Panel>
            <Panel header="装备增强">
                <EquipEnhance store={$store} />
            </Panel>
            <Panel header="装备镶嵌">
                <div className="equip-embed">
                    <EquipEmbed store={$store} />
                    <StoneSetting store={$store} />
                </div>
            </Panel>
        </PanelGroup>
    );
}

export { EquipSettings };
