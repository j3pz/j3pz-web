import React from 'react';
import { PanelGroup, Panel } from 'rsuite';
import { EquipSelection } from '../equip_selection/equip_selection';
import { $store } from '../../store';
import { StrengthenPicker } from '../equip_enhance/strengthen_picker';
import { EquipEmbed } from '../equip_embed/equip_embed';
import { StoneSetting } from '../stone_setting/stone_setting';
import { EnhanceSelection } from '../equip_enhance/enhance_selection';

function EquipSettings() {
    return (
        <PanelGroup accordion bordered style={{ maxWidth: 600 }}>
            <Panel header="装备选择" defaultExpanded>
                <EquipSelection store={$store} />
            </Panel>
            <Panel header="装备增强">
                <div className="equip-strengthen">
                    <StrengthenPicker store={$store} />
                    <EnhanceSelection store={$store} />
                </div>
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
