import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Sidenav, Nav } from 'rsuite';
import { StoreProps } from '../store';
import { Category, Position, CATEGORY_DESC } from '../model/base';
import './equip_nav.less';

interface NavInfo {
    category: Category;
}

const navLib = new Map<Position, NavInfo>([
    [Position.HAT, { category: Category.HAT }],
    [Position.JACKET, { category: Category.JACKET }],
    [Position.BELT, { category: Category.BELT }],
    [Position.WRIST, { category: Category.WRIST }],
    [Position.BOTTOMS, { category: Category.BOTTOMS }],
    [Position.SHOES, { category: Category.SHOES }],
    [Position.NECKLACE, { category: Category.NECKLACE }],
    [Position.PENDANT, { category: Category.PENDANT }],
    [Position.RING1, { category: Category.RING }],
    [Position.RING2, { category: Category.RING }],
    [Position.SECONDARY_WEAPON, { category: Category.SECONDARY_WEAPON }],
    [Position.PRIMARY_WEAPON, { category: Category.PRIMARY_WEAPON }],
    [Position.TERTIARY_WEAPON, { category: Category.TERTIARY_WEAPON }],
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
                    style={{ height: '100%', overflow: 'auto' }}
                    onSelect={this.changeNav}
                    activeKey={store.activeEquipNav}
                >
                    <Sidenav.Body>
                        <Nav>
                            {Object.values(Position).map((key) => {
                                if (key === Position.TERTIARY_WEAPON) return null;
                                const { category } = navLib.get(key)!;
                                const name = CATEGORY_DESC[category];
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
