import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    CheckboxGroup, Checkbox, SelectPicker, RangeSlider, Toggle,
} from 'rsuite';
import { transaction } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSearch, faSpinner } from '@fortawesome/pro-light-svg-icons';
import { StoreProps } from '../../store';
import { AttributeTag, ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { EquipService } from '../../service/equip_service';
import { KungFu, Position } from '../../model/base';
import { navLib } from '../equip_tab/equip_nav';
import { Equip } from '../../model/equip';
import './equip_selection.less';
import { SettingsService } from '../../service/settings_service';
import { SimpleEquip } from '../../model/simple_equip';
import { CollectionService } from '../../service/collection_service';
import { SearchEquip } from './search_equip';
import { EmbedService } from '../../service/embed_service';

interface EquipSelectionState {
    tags: AttributeTag[];
    minQuality: number;
    maxQuality: number;
    range: [number, number];
    selectOnly: 'pve' | 'pvp' | 'all';
    custom: boolean;
}

@observer
export class EquipSelection extends Component<StoreProps, EquipSelectionState> {
    private cache: Map<Position, SimpleEquip[]>;
    private lastKungFu: KungFu;

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            minQuality: 3000,
            maxQuality: 5000,
            range: [2040, 5000],
            selectOnly: 'all',
            custom: false,
        };
        this.cache = new Map();
    }

    componentDidMount() {
        SettingsService.getRange().then((res) => {
            const [min, , max] = res;
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
            transaction(() => {
                let finalEquip = equip;
                if (store.settings.autoStrengthen) {
                    finalEquip = finalEquip.setStrengthLevel(equip.strengthen);
                }
                if (store.settings.autoEmbed > 0) {
                    const level = store.settings.autoEmbed;
                    finalEquip = finalEquip.setEmbed(0, level)
                        .setEmbed(1, level)
                        .setEmbed(2, level);
                }
                store.equips[currentPosition] = finalEquip;
                CollectionService.updateCollection(store);
                EmbedService.update(store);
            });
        });
    };

    removeEquip = () => {
        const { store } = this.props;
        transaction(() => {
            store.equips[store.activeEquipNav] = undefined;
            CollectionService.updateCollection(store);
        });
    };

    getFilteredEquips = () => {
        const { store } = this.props;
        const { range, tags, selectOnly } = this.state;
        let hitCurrentEquip = false;
        const currentEquip = store.equips[store.activeEquipNav];
        const equips = (this.cache.get(store.activeEquipNav) ?? []).filter((equip) => {
            if (equip.id === currentEquip?.id) {
                hitCurrentEquip = true;
                return true;
            }
            if (equip.quality > range[1] || equip.quality < range[0]) return false;
            if (tags.length > 0 && tags.filter((t) => equip.tags.includes(t)).length < tags.length) return false;
            if (selectOnly === 'pve' && equip.tags.includes('huajing')) return false;
            if (selectOnly === 'pvp' && !equip.tags.includes('huajing')) return false;
            return true;
        });
        if (!hitCurrentEquip && currentEquip) {
            return equips.concat([SimpleEquip.fromJson(currentEquip)]);
        }
        return equips;
    };

    render() {
        const {
            tags, minQuality, maxQuality, range, selectOnly, custom,
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
                    {AttributeTag.filter((t) => t !== 'huajing')
                        .map((key) => <Checkbox value={key} key={key}>{ATTRIBUTE_SHORT_DESC[key]}</Checkbox>)}
                </CheckboxGroup>
                <div style={{ margin: 12 }} />
                <div>
                    <span>只看</span>
                    <div style={{ display: 'inline-block', padding: 8 }}>
                        <Toggle
                            checkedChildren="PVE"
                            unCheckedChildren="PVE"
                            checked={selectOnly === 'pve'}
                            onChange={(checked) => { this.setState({ selectOnly: checked ? 'pve' : 'all' }); }}
                        />
                    </div>
                    <div style={{ display: 'inline-block', padding: 8 }}>
                        <Toggle
                            checkedChildren="PVP"
                            unCheckedChildren="PVP"
                            checked={selectOnly === 'pvp'}
                            onChange={(checked) => { this.setState({ selectOnly: checked ? 'pvp' : 'all' }); }}
                        />
                    </div>
                </div>
                <div style={{ margin: 12 }} />
                {`品质筛选 ${range[0]} 品 - ${range[1]} 品`}
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
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    {' '}
                                    加载中...
                                </p>
                            );
                        }
                        if (equips.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <FontAwesomeIcon icon={faFileSearch} />
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
                                <i>
                                    {(item.tags ?? [])
                                        .filter((t) => t !== 'huajing')
                                        .map((tag) => ATTRIBUTE_SHORT_DESC[tag])
                                        .join(' ')}
                                </i>
                            </div>
                        </div>
                    )}
                />
                <div style={{ textAlign: 'right', paddingTop: 4, fontSize: 12 }}>
                    <div
                        onClick={() => { this.setState({ custom: true }); }}
                        style={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                        想要其他心法的装备? 点此搜索
                    </div>
                </div>
                <SearchEquip
                    show={custom}
                    onClose={() => { this.setState({ custom: false }); }}
                    category={navLib.get(store.activeEquipNav)!.category}
                    kungfu={store.kungfu}
                    onConfirm={(equip) => {
                        this.setEquip(equip.id);
                        this.setState({ custom: false });
                    }}
                />
            </div>
        );
    }
}
