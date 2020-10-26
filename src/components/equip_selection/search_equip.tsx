import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
    Button, HelpBlock, Input, InputGroup, Modal,
} from 'rsuite';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { Category, KungFu } from '../../model/base';
import { SimpleEquip } from '../../model/simple_equip';
import { EquipService } from '../../service/equip_service';

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
}

export class SearchEquip extends Component<SearchEquipProps, SearchEquipState> {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            equips: [],
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

    render() {
        const { show, onClose = () => {} } = this.props;
        const { equips, keyword } = this.state;
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
                            <div className="equip-custom-item" onClick={() => this.select(equip)}>
                                <img src={`https://icons.j3pz.com/${equip.icon}.png`} alt={`${equip.name}`} />
                                <div>
                                    <b>{equip.name}</b>
                                    <span>{equip.tags.map((tag) => ATTRIBUTE_SHORT_DESC[tag]).join(' ')}</span>
                                </div>
                            </div>
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
