import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'react-grid-system';
import EquipNav from './equip_nav';
import $store from '../store';
import EquipView from './equip_view';
import Equip from '../model/equip';

@observer
export default class EquipTab extends Component {
    render() {
        const equip = Equip.fromJson({
            id: 37599,
            name: '点墨',
            icon: 11076,
            category: 'primaryWeapon',
            quality: 2330,
            school: '万花',
            primaryAttribute: 'spunk',
            score: 5032,
            vitality: 697,
            spirit: 0,
            strength: 0,
            agility: 0,
            spunk: 255,
            basicPhysicsShield: 0,
            basicMagicShield: 0,
            damageBase: 180,
            damageRange: 120,
            attackSpeed: 16,
            physicsShield: 0,
            magicShield: 0,
            dodge: 0,
            parryBase: 0,
            parryValue: 0,
            toughness: 0,
            attack: 1055,
            heal: 0,
            crit: 1084,
            critEffect: 0,
            overcome: 0,
            haste: 0,
            hit: 0,
            strain: 516,
            huajing: 0,
            threat: 0,
            embed: '3D24D23D01',
            strengthen: 4,
            deprecated: false,
            effect: {
                id: 245,
                attribute: null,
                decorator: null,
                value: null,
                trigger: 'Usage',
                description: '装备：命中后有一定几率获得雷·灭气效果。不可与该类其他气劲并存。',
            },
            set: null,
            source: [
                {
                    id: 733,
                    comment: null,
                    type: 'raid',
                    boss: {
                        id: 597,
                        name: '伊玛目',
                        map: {
                            id: 84,
                            name: '挑战冰火岛·荒血路',
                        },
                    },
                },
            ],
            represent: null,
        });
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <EquipNav store={$store} />
                <Container style={{ flex: 1 }}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <EquipView equip={equip} />
                        </Col>
                        <Col xs={12} sm={6}>Settings</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
