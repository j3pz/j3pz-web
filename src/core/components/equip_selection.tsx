import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    CheckboxGroup, Checkbox, SelectPicker, RangeSlider,
} from 'rsuite';
import { StoreProps } from '../store';
import { AttributeTag, ATTRIBUTE_SHORT_DESC } from '../model/attribute';
import EquipService from '../service/equip_service';
import { KungFu, Position } from '../model/base';
import { navLib } from './equip_nav';
import { Equip, SimpleEquip } from '../model/equip';
import './equip_selection.less';
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
    private lastKungFu: KungFu;

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
        const currentKungfu = store.kungfu;
        if (this.cache.has(currentPosition) && currentKungfu === this.lastKungFu) {
            return;
        }
        EquipService.listEquip(navLib.get(store.activeEquipNav)!.category, currentKungfu).then((res) => {
            const list = res.map((_) => SimpleEquip.fromJson(_.attributes));
            this.cache.set(currentPosition, list);
            this.lastKungFu = currentKungfu;
            this.forceUpdate();
        });
    };

    handleRange = ([min, max]) => {
        this.setState({ range: [min, max] });
    };

    setEquip = (value: number) => {
        const { store } = this.props;
        const currentPosition = store.activeEquipNav;
        EquipService.getEquip(value).then((res) => {
            const equip = Equip.fromJson(res.attributes);
            store.equips[currentPosition] = equip;
        });
    };

    removeEquip = () => {
        const { store } = this.props;
        store.equips[store.activeEquipNav] = undefined;
    };

    getFilteredEquips = () => {
        const { store } = this.props;
        const { range, tags } = this.state;
        const equips = this.cache.get(store.activeEquipNav) ?? [];
        return equips.filter((equip) => {
            if (equip.quality > range[1] || equip.quality < range[0]) return false;
            if (tags.length > 0 && tags.filter((t) => equip.tags.includes(t)).length === 0) return false;
            return true;
        });
    };

    render() {
        const {
            tags, minQuality, maxQuality, range,
        } = this.state;
        const { store } = this.props;
        const raw = this.cache.get(store.activeEquipNav) ?? [];
        const equips = this.getFilteredEquips();
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
                    {AttributeTag.map((key) => <Checkbox value={key} key={key}>{ATTRIBUTE_SHORT_DESC[key]}</Checkbox>)}
                </CheckboxGroup>
                <div style={{ margin: 12 }} />
                品质筛选
                {' '}
                {range[0]}
                {' '}
                品 -
                {range[1]}
                {' '}
                品
                <RangeSlider
                    value={range}
                    min={minQuality}
                    max={maxQuality}
                    style={{ marginTop: 12 }}
                    step={10}
                    onChange={this.handleRange}
                />
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
                    searchable={false}
                    placeholder="选取装备..."
                    virtualized={false}
                    value={store.equips[store.activeEquipNav]?.id}
                    renderMenu={(menu) => {
                        if (raw.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <i className="fal fa-spinner fa-spin" />
                                    {' '}
                                    加载中...
                                </p>
                            );
                        } if (equips.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <i className="fal fa-file-search" />
                                    {' '}
                                    没有装备符合筛选条件
                                </p>
                            );
                        }
                        return menu;
                    }}
                    // @ts-ignore
                    renderMenuItem={(label, item: SimpleEquip) => (
                        <div className="equip-select-item" key={item.id}>
                            <div>
                                <b>{label}</b>
                                <span>{`${item.quality}品`}</span>
                            </div>
                            <div>
                                <i>{item.tags.map((tag) => ATTRIBUTE_SHORT_DESC[tag]).join(' ')}</i>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}
