import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Button, FlexboxGrid, List, Modal, Tag, TagGroup,
} from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSearch, faTimes } from '@fortawesome/pro-light-svg-icons';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { StoreProps } from '../../store';
import { KungFu } from '../../model/base';
import { StoneService } from '../../service/stone_service';
import { Stone } from '../../model/stone';
import { SimpleStoneAttribute } from '../../model/stone_attribute';
import './stone_setting.less';
import { Attribute, AttributeDecorator } from '../../model/attribute';

interface StoneSettingState {
    tags: SimpleStoneAttribute[];
    disabledTags: string[];
    selectedTags: SimpleStoneAttribute[];
    stones: Stone[];
    modal: boolean;
}

@observer
export class StoneSetting extends Component<StoreProps, StoneSettingState> {
    private currentKungfu: KungFu;

    constructor(props) {
        super(props);
        this.currentKungfu = props.store.kungfu;
        this.state = {
            tags: [],
            selectedTags: [],
            disabledTags: [],
            stones: [],
            modal: false,
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

    listStones = (tags: SimpleStoneAttribute[]) => {
        if (tags.length === 0) {
            this.setState({ stones: [], disabledTags: [], selectedTags: [] });
            return;
        }
        const [attributes, decorators] = tags.reduce((acc, tag) => {
            acc[0].push(tag.key);
            acc[1].push(tag.decorator);
            return acc;
        }, [[], []] as [Attribute[], AttributeDecorator[]]);
        StoneService.listStones(attributes, decorators).then((availableStones) => {
            const availableAttributes = new Set(this.state.tags.map((t) => t.identity()));
            const stones = availableStones.map((s) => {
                s.attributes.attributes.forEach((a) => {
                    availableAttributes.delete(`${a.key}-${a.decorator}`);
                });
                return s.attributes;
            });

            this.setState({ stones, disabledTags: [...availableAttributes], selectedTags: tags });
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
            this.setState({ modal: false });
        });
    };

    updateTags() {
        StoneService.listTags(this.currentKungfu).then((tags) => {
            this.setState({
                tags: tags.map((t) => SimpleStoneAttribute.fromJson(t.attributes)),
            });
        });
    }

    handleTagSelect(tag: SimpleStoneAttribute) {
        const { selectedTags } = this.state;
        const tags = [...selectedTags];
        const idx = tags.findIndex((t) => t.identity() === tag.identity());
        if (idx >= 0) {
            tags.splice(idx, 1);
        } else {
            tags.push(tag);
        }

        this.listStones(tags);
    }

    render() {
        const { store } = this.props;
        const {
            tags, stones, disabledTags, selectedTags, modal,
        } = this.state;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip?.category !== 'primaryWeapon' && currentEquip?.category !== 'tertiaryWeapon') {
            return null;
        }
        return (
            <>
                <div className="label stone-setting">五彩石镶嵌</div>
                <Modal
                    show={modal}
                    style={{
                        height: '100%',
                        margin: '0 auto',
                    }}
                    onHide={() => { this.setState(({ modal: false })); }}
                    size="lg"
                    dialogStyle={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Modal.Header>
                        <Modal.Title>五彩石选择</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FlexboxGrid style={{ height: 500 }}>
                            <FlexboxGridItem colspan={12}>
                                <div className="label">选择想要的属性(无需按顺序选择)</div>
                                <TagGroup>
                                    {tags.map((t) => (
                                        <Tag
                                            onClick={() => this.handleTagSelect(t)}
                                            style={{ cursor: 'pointer' }}
                                            className={disabledTags.includes(t.identity()) ? 'tag-disabled' : ''}
                                            color={selectedTags.includes(t) ? 'red' : 'blue'}
                                        >
                                            {t.name}
                                        </Tag>
                                    ))}
                                </TagGroup>
                            </FlexboxGridItem>
                            <FlexboxGridItem colspan={12} style={{ height: '100%', overflow: 'auto' }}>
                                <div className="label">可用五彩石, 鼠标点击对应五彩石可进行选择</div>
                                <List>
                                    {stones.length === 0 ? (
                                        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                            <FontAwesomeIcon icon={faFileSearch} />
                                            {' '}
                                            没有符合条件的五彩石
                                        </p>
                                    ) : Object.entries(stones.reduce((acc, cur) => {
                                        const name = cur.name.replace(/\((.)\)/, '');
                                        if (acc[name]) {
                                            acc[name].push(cur);
                                        } else {
                                            acc[name] = [cur];
                                        }
                                        return acc;
                                    }, {} as { [k: string]: Stone[]})).map(([name, items]) => (
                                        <List.Item>
                                            <FlexboxGrid className="equip-select-item" key={name}>
                                                <FlexboxGridItem colspan={16}>
                                                    <div>
                                                        <b>{name}</b>
                                                    </div>
                                                    <div>
                                                        <i>{items[0].attributes.map((a) => a.name).join(' ')}</i>
                                                    </div>
                                                </FlexboxGridItem>
                                                <FlexboxGridItem>
                                                    {items.map((stone) => (
                                                        <img
                                                            src={`https://icons.j3pz.com/${stone.icon}.png`}
                                                            alt={stone.name}
                                                            title={stone.name}
                                                            onClick={() => this.selectStone(stone.id)}
                                                            style={{
                                                                width: 28, height: 28, borderRadius: 4, cursor: 'pointer', margin: 2,
                                                            }}
                                                        />
                                                    ))}
                                                </FlexboxGridItem>
                                            </FlexboxGrid>
                                        </List.Item>
                                    ))}
                                </List>
                            </FlexboxGridItem>
                        </FlexboxGrid>
                    </Modal.Body>
                </Modal>
                <Button onClick={() => this.setState({ modal: true })} appearance="ghost">更换五彩石</Button>
                <Button onClick={this.removeStone} style={{ marginLeft: 4 }} appearance="primary">
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </>
        );
    }
}
