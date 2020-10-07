import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { SelectPicker, TagPicker } from 'rsuite';
import { StoreProps } from '../store';
import { KungFu } from '../model/base';
import { StoneService } from '../service/stone_service';
import { Stone } from '../model/stone';
import { SimpleStoneAttribute } from '../model/stone_attribute';
import './stone_setting.less';
import { Attribute, AttributeDecorator } from '../model/attribute';

interface StoneSettingState {
    tags: SimpleStoneAttribute[];
    stones: Stone[];
}

@observer
export class StoneSetting extends Component<StoreProps, StoneSettingState> {
    private currentKungfu: KungFu;

    constructor(props) {
        super(props);
        this.currentKungfu = props.store.kungfu;
        this.state = {
            tags: [],
            stones: [],
        };
    }

    componentDidMount() {
        this.updateTags();
    }

    UNSAFE_componentWillReceiveProps(nextProps: StoreProps) {
        if (nextProps.store.kungfu !== this.currentKungfu) {
            this.currentKungfu = nextProps.store.kungfu;
            this.updateTags();
        }
    }

    listStones = (values: string[]) => {
        if (values.length === 0) {
            this.setState({ stones: [] });
            return;
        }
        const [attributes, decorators] = values.reduce((acc, value) => {
            const [attribute, decorator] = value.split('-');
            acc[0].push(attribute as Attribute);
            acc[1].push(decorator as AttributeDecorator);
            return acc;
        }, [[], []] as [Attribute[], AttributeDecorator[]]);
        StoneService.listStones(attributes, decorators).then((stones) => {
            this.setState({ stones: stones.map((s) => s.attributes) });
        });
    };

    removeStone = () => {
        const { store } = this.props;
        store.stones[store.activeEquipNav] = null;
    };

    selectStone = (id: number) => {
        StoneService.getStone(id).then((stone) => {
            const { store } = this.props;
            store.stones[store.activeEquipNav] = Stone.fromJson(stone.attributes);
        });
    };

    updateTags() {
        StoneService.listTags(this.currentKungfu).then((tags) => {
            this.setState({
                tags: tags.map((t) => ({
                    ...t.attributes,
                    label: `${t.attributes.key}-${t.attributes.decorator}`,
                })),
            });
        });
    }

    render() {
        const { store } = this.props;
        const { tags, stones } = this.state;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip?.category !== 'primaryWeapon' && currentEquip?.category !== 'tertiaryWeapon') {
            return null;
        }
        return (
            <>
                <div className="label stone-setting">五彩石镶嵌</div>
                <TagPicker
                    size="lg"
                    style={{ minHeight: 42, marginBottom: 12 }}
                    data={tags}
                    block
                    labelKey="name"
                    valueKey="label"
                    placement="topStart"
                    placeholder="选择五彩石属性"
                    searchable={false}
                    onSelect={this.listStones}
                    onClean={() => this.listStones([])}
                    tagProps={{ closable: false }}
                />
                <SelectPicker
                    size="lg"
                    data={stones}
                    labelKey="name"
                    valueKey="id"
                    block
                    searchable={false}
                    placement="topStart"
                    placeholder="选择五彩石"
                    onSelect={this.selectStone}
                    onClean={this.removeStone}
                    renderMenu={(menu) => {
                        if (stones.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <i className="fal fa-file-search" />
                                    {' '}
                                    没有符合条件的五彩石
                                </p>
                            );
                        }
                        return menu;
                    }}
                />
            </>
        );
    }
}
