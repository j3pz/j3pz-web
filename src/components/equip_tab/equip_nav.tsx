import React, { Component, CSSProperties } from 'react';
import { observer } from 'mobx-react';
import { Sidenav, Nav, Whisper } from 'rsuite';
import { StoreProps } from '../../store';
import {
    Category, Position, CATEGORY_DESC, KungFu,
} from '../../model/base';
import './equip_nav.less';
import { EquipView } from '../equip_view/equip_view';
import { Equip } from '../../model/equip';

interface NavInfo {
    category: Category;
}

export const navLib = new Map<Position, NavInfo>([
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

interface EquipOverlayProps {
    style: CSSProperties;
    equip?: Equip;
}

const EquipOverlay = React.forwardRef<HTMLDivElement, EquipOverlayProps>(({ style, equip, ...rest }: EquipOverlayProps, ref) => {
    const styles: CSSProperties = {
        ...style,
        padding: 0,
        minWidth: 300,
        borderRadius: 4,
        position: 'absolute',
        boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)',
    };
    return (
        <div {...rest} style={styles} ref={ref}>
            { equip ? <EquipView equip={equip} /> : null}
        </div>
    );
});


@observer
export class EquipNav extends Component<StoreProps> {
    changeNav = (key: Position) => {
        const { store } = this.props;
        store.activeEquipNav = key;
    };

    render() {
        const { store } = this.props;
        return (
            <div style={{ width: store.equipNavExpanded ? 240 : 64, height: '100%' }}>
                <Sidenav
                    style={{ height: '100%', overflow: 'auto', borderRight: '1px solid #CCCCCC' }}
                    onSelect={this.changeNav}
                    activeKey={store.activeEquipNav}
                    appearance="subtle"
                >
                    <Sidenav.Body>
                        <Nav>
                            {Object.values(Position).map((key) => {
                                if (key === Position.TERTIARY_WEAPON
                                    && store.kungfu !== KungFu.山居剑意
                                    && store.kungfu !== KungFu.问水诀
                                ) {
                                    return null;
                                }
                                const { category } = navLib.get(key)!;
                                const name = CATEGORY_DESC[category];
                                const equip = store.equips[key];
                                return (
                                    <Nav.Item eventKey={key} key={key}>
                                        <Whisper
                                            delayHide={1}
                                            trigger="hover"
                                            speaker={(props, ref) => {
                                                const { left, top } = props;
                                                return <EquipOverlay style={{ left, top }} equip={equip} ref={ref} />;
                                            }}
                                            placement="auto"
                                        >
                                            <img
                                                className="equip-icon"
                                                src={equip?.icon
                                                    ? `https://icons.j3pz.com/${equip.icon}.png`
                                                    : `https://images.j3pz.com/imgs/icons/placeholder_${category}.png`}
                                                alt={equip?.name ?? name}
                                            />
                                        </Whisper>
                                        <div className={equip?.id ? 'equip-type' : 'equip-full'}>{name}</div>
                                        { equip?.id && <div className="equip-name">{equip.name}</div> }
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
