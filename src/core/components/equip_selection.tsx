import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    CheckboxGroup, Checkbox, SelectPicker, Icon,
} from 'rsuite';
import { StoreProps } from '../store';
import { AttributeTag, ATTRIBUTE_SHORT_DESC } from '../model/attribute';
import EquipService from '../service/equip_service';
import { KungFu } from '../model/base';
import { navLib } from './equip_nav';
import Equip from '../model/equip';

interface EquipSelectionState {
    tags: AttributeTag[];
    equips: Equip[];
}

@observer
export default class EquipSelection extends Component<StoreProps, EquipSelectionState> {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            equips: [],
        };
    }

    handleUpdate = () => {
        const { store } = this.props;
        EquipService.listEquip(navLib.get(store.activeEquipNav)!.category, KungFu.花间游).then((res) => {
            this.setState({ equips: res.data.map((_) => _.attributes) });
        });
    };

    setEquip = (value: number) => {
        const { store } = this.props;
        const currentPosition = store.activeEquipNav;
        EquipService.getEquip(value).then((res) => {
            const equip = Equip.fromJson(res.data.attributes);
            store.equips[currentPosition] = equip;
        });
    };

    render() {
        const { tags, equips } = this.state;
        return (
            <>
                <CheckboxGroup
                    inline
                    name="filters"
                    value={tags}
                    onChange={(value) => {
                        this.setState({ tags: value });
                    }}
                >
                    {AttributeTag.map((key) => <Checkbox value={key}>{ATTRIBUTE_SHORT_DESC[key]}</Checkbox>)}
                </CheckboxGroup>
                <SelectPicker
                    data={equips}
                    block
                    size="lg"
                    onOpen={this.handleUpdate}
                    onSelect={this.setEquip}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Select..."
                    renderMenu={(menu) => {
                        if (equips.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <Icon icon="spinner" spin />
                                    {' '}
                                    加载中...
                                </p>
                            );
                        }
                        return menu;
                    }}
                    renderMenuItem={(label, item) => (
                        <div>
                            <b>{label}</b>
                            {
                                // @ts-ignore
                                item.quality
                            }
                        </div>
                    )}
                />
            </>
        );
    }
}
