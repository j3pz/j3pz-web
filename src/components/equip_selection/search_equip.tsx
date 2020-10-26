import { faSearch, faSpinner } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
    Button, HelpBlock, Input, InputGroup, Modal, Popover, Whisper,
} from 'rsuite';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { Category, KungFu } from '../../model/base';
import { Equip } from '../../model/equip';
import { SimpleEquip } from '../../model/simple_equip';
import { EquipService } from '../../service/equip_service';
import { EquipView } from '../equip_view/equip_view';

interface SearchEquipProps {
    show: boolean;
    category: Category;
    kungfu: KungFu;
    onClose?: () => void;
    onConfirm?: (equip: SimpleEquip) => void;
}

interface SearchEquipState {
    keyword: string;
    equips: SimpleEquip[];
    hoveringEquip: Equip | null;
}

export class SearchEquip extends Component<SearchEquipProps, SearchEquipState> {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            equips: [],
            hoveringEquip: null,
        };
    }
    onConfirm = () => {
        const { onClose = () => {} } = this.props;
        onClose();
    };

    onSearch = () => {
        const { keyword } = this.state;
        const { category, kungfu } = this.props;
        EquipService.searchEquip(keyword, category, kungfu).then((res) => {
            this.setState({ equips: res.filter((_, i) => i < 9).map((_) => SimpleEquip.fromJson(_.attributes)) });
        });
    };

    select(equip: SimpleEquip) {
        const { onConfirm = () => {} } = this.props;
        onConfirm(equip);
    }

    hoverEquip(equip: SimpleEquip) {
        if (equip.id === this.state.hoveringEquip?.id) return;
        EquipService.getEquip(equip.id).then((res) => {
            this.setState({ hoveringEquip: Equip.fromJson(res.attributes) });
        });
    }

    render() {
        const { show, onClose = () => {} } = this.props;
        const { equips, keyword, hoveringEquip } = this.state;
        return (
            <Modal
                show={show}
                onHide={onClose}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>搜索其他装备</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    当前心法适合装备不适合你的需求？你可以选择任意装备进行搭配。在下方输入装备名进行搜索吧。
                    <InputGroup size="lg" style={{ marginTop: 12 }}>
                        <Input placeholder="装备名称" value={keyword} onChange={(value) => this.setState({ keyword: value })} />
                        <InputGroup.Addon>
                            <FontAwesomeIcon icon={faSearch} style={{ cursor: 'pointer' }} onClick={this.onSearch} />
                        </InputGroup.Addon>
                    </InputGroup>
                    <HelpBlock>最多显示九件装备</HelpBlock>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {equips.map((equip) => (
                            <Whisper
                                trigger={['focus', 'hover']}
                                speaker={(
                                    <Popover style={{ padding: 0, minWidth: 300 }}>
                                        {hoveringEquip && <EquipView equip={hoveringEquip} />}
                                        {!hoveringEquip && (
                                        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                            <FontAwesomeIcon icon={faSpinner} spin />
                                            {' '}
                                            加载中...
                                        </p>
                                        )}
                                    </Popover>
                                )}
                                onFocus={() => this.hoverEquip(equip)}
                                onMouseOver={() => this.hoverEquip(equip)}
                            >
                                <div
                                    className="equip-custom-item"
                                    onClick={() => this.select(equip)}
                                >
                                    <img src={`https://icons.j3pz.com/${equip.icon}.png`} alt={`${equip.name}`} />
                                    <div>
                                        <b>{equip.name}</b>
                                        <span>{equip.tags.map((tag) => ATTRIBUTE_SHORT_DESC[tag]).join(' ')}</span>
                                    </div>
                                </div>
                            </Whisper>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} appearance="subtle">
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
