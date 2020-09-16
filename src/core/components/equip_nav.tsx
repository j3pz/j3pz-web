import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Sidenav, Nav } from 'rsuite';
import { StoreProps } from '../store';
import { Category, Position } from '../model/base';
import './equip_nav.less';

interface NavInfo {
    name: string;
    category: Category;
}

const navLib = new Map<Position, NavInfo>([
    [Position.HAT, { name: '帽子', category: Category.HAT }],
    [Position.JACKET, { name: '上衣', category: Category.JACKET }],
    [Position.BELT, { name: '腰带', category: Category.BELT }],
    [Position.WRIST, { name: '护腕', category: Category.WRIST }],
    [Position.BOTTOMS, { name: '下装', category: Category.BOTTOMS }],
    [Position.SHOES, { name: '鞋子', category: Category.SHOES }],
    [Position.NECKLACE, { name: '项链', category: Category.NECKLACE }],
    [Position.PENDANT, { name: '腰坠', category: Category.PENDANT }],
    [Position.RING1, { name: '戒指', category: Category.RING }],
    [Position.RING2, { name: '戒指', category: Category.RING }],
    [Position.SECONDARY_WEAPON, { name: '暗器', category: Category.SECONDARY_WEAPON }],
    [Position.PRIMARY_WEAPON, { name: '武器', category: Category.PRIMARY_WEAPON }],
    [Position.TERTIARY_WEAPON, { name: '重剑', category: Category.TERTIARY_WEAPON }],
]);

@observer
export default class EquipNav extends Component<StoreProps> {
    changeNav = (key: Position) => {
        const { store } = this.props;
        store.activeEquipNav = key;
    };

    render() {
        const { store } = this.props;
        return (
            <div style={{ width: store.equipNavExpanded ? 240 : 64, height: '100%' }}>
                <Sidenav
                    appearance="inverse"
                    style={{ height: '100%', overflow: 'auto' }}
                    onSelect={this.changeNav}
                    activeKey={store.activeEquipNav}
                >
                    <Sidenav.Body>
                        <Nav>
                            {Object.values(Position).map((key) => {
                                if (key === Position.TERTIARY_WEAPON) return null;
                                const { name, category } = navLib.get(key)!;
                                return (
                                    <Nav.Item
                                        key={key}
                                        eventKey={key}
                                    >
                                        <img
                                            className="equip-icon"
                                            src={`https://images.j3pz.com/imgs/icons/placeholder_${category}.png`}
                                            alt={name}
                                        />
                                        <div className="equip-type">{name}</div>
                                        <div className="equip-name">{name}</div>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}
