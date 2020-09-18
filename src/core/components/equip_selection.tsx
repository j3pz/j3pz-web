import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    CheckboxGroup, Checkbox, SelectPicker, Icon, RangeSlider,
} from 'rsuite';
import { StoreProps } from '../store';
import { AttributeTag, ATTRIBUTE_SHORT_DESC } from '../model/attribute';
import EquipService from '../service/equip_service';
import { KungFu, Position } from '../model/base';
import { navLib } from './equip_nav';
import { Equip, SimpleEquip } from '../model/equip';
import SettingsService from '../service/settings_service';

interface EquipSelectionState {
    tags: AttributeTag[];
    minQuality: number;
    maxQuality: number;
    range: [number, number];
}

@observer
export default class EquipSelection extends Component<StoreProps, EquipSelectionState> {
    private cache: Map<Position, SimpleEquip[]>;

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            minQuality: 3000,
            maxQuality: 5000,
            range: [4000, 5000],
        };
        this.cache = new Map();
    }

    componentDidMount() {
        SettingsService.getRange().then((res) => {
            const [min, , max] = res.data;
            this.setState({ minQuality: min, maxQuality: max });
        });
    }


    handleUpdate = () => {
        const { store } = this.props;
        const currentPosition = store.activeEquipNav;
        if (this.cache.has(currentPosition)) {
            return;
        }
        EquipService.listEquip(navLib.get(store.activeEquipNav)!.category, KungFu.花间游).then((res) => {
            const list = res.data.map((_) => SimpleEquip.fromJson(_.attributes));
            this.cache.set(currentPosition, list);
            this.forceUpdate();
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

    removeEquip = () => {
        const { store } = this.props;
        store.equips[store.activeEquipNav] = undefined;
    };

    render() {
        const {
            tags, minQuality, maxQuality, range,
        } = this.state;
        const { store } = this.props;
        const equips = this.cache.get(store.activeEquipNav) ?? [];
        return (
            <div style={{ maxWidth: 400 }}>
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
                <div style={{ margin: 12 }} />
                <RangeSlider value={range} min={minQuality} max={maxQuality} />
                <div style={{ margin: 12 }} />
                <SelectPicker
                    data={equips}
                    block
                    size="lg"
                    onOpen={this.handleUpdate}
                    onSelect={this.setEquip}
                    onClean={this.removeEquip}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Select..."
                    value={store.equips[store.activeEquipNav]?.id}
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
            </div>
        );
    }
}
