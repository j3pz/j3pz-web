import { TextConfig } from 'konva/types/shapes/Text';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Layer, Stage, Text, Rect, Group,
} from 'react-konva';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { GamingRole, schoolAbbrMap } from '../../model/base';
import { Result } from '../../model/result';
import { ResultService } from '../../service/result_service';
import { StoreProps } from '../../store';
import { schoolIcons } from '../../utils/school_icon';
import { CanvasImage } from '../canvas_image/canvas_image';

type ResultTuple = [keyof Result, keyof Result | null];

@observer
export class ShareImage extends Component<StoreProps> {
    private getDisplayAttributes(): ResultTuple[] {
        const { kungfuMeta } = this.props.store;
        if (!kungfuMeta) return [];
        const attributes: ResultTuple[] = [];
        // 气血
        attributes.push(['health', null]);
        // 基础属性
        attributes.push([kungfuMeta.primaryAttribute, null]);
        // 攻击/治疗
        if (kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            attributes.push(['attack', 'baseAttack']);
        } else if (kungfuMeta.role === GamingRole.HEALER) {
            attributes.push(['heal', null]);
        }

        if (kungfuMeta.role !== GamingRole.TANK) {
            // 会心
            attributes.push(['critRate', 'crit']);
            // 会心效果
            attributes.push(['critEffectRate', 'critEffect']);
        }

        if (kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            // 破防
            attributes.push(['overcomeRate', 'overcome']);
            // 破防
            attributes.push(['surplus', 'surplusDamage']);
        }

        // 急速
        attributes.push(['hasteRate', 'haste']);
        if (kungfuMeta.role !== GamingRole.HEALER) {
            // 无双
            attributes.push(['strainRate', 'strain']);
        }
        // 内防
        attributes.push(['physicsShieldRate', 'physicsShield']);
        // 外防
        attributes.push(['magicShieldRate', 'magicShield']);

        if (kungfuMeta.role === GamingRole.TANK) {
            // 闪避
            attributes.push(['dodgeRate', 'dodge']);
            // 招架
            attributes.push(['parryBaseRate', 'parryBase']);
            // 拆招
            attributes.push(['parryValue', null]);
        }
        // 御劲
        attributes.push(['toughnessRate', 'toughness']);
        // 化劲
        attributes.push(['huajingRate', 'huajing']);
        // 装分
        attributes.push(['score', null]);

        return attributes;
    }

    render() {
        const {
            kungfuMeta, kungfu, caseInfo, user, equips,
        } = this.props.store;
        const attributes = this.getDisplayAttributes();

        const result = ResultService.calc(this.props.store);
        return (
            <div>
                <Stage width={928} height={522}>
                    <Layer name="background">
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolAbbrMap[kungfuMeta!.school]}/bg.jpg`}
                            x={0}
                            y={0}
                            width={928}
                            height={522}
                        />
                        <CanvasImage
                            src="https://images.j3pz.com/imgs/share_print.png"
                            width={140}
                            height={48}
                            x={8}
                            y={472}
                        />
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolAbbrMap[kungfuMeta!.school]}/jn.png`}
                            x={12}
                            y={12}
                            width={87.5}
                            height={87.5}
                        />
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolIcons[kungfu]}.png`}
                            x={36}
                            y={35.7}
                            width={40}
                            height={40}
                        />
                        <Rect
                            x={16}
                            y={112}
                            width={360 - 16 * 2}
                            height={kungfuMeta!.role === GamingRole.DAMAGE_DEALER ? 342 : 262}
                            fill="white"
                            opacity={0.3}
                            shadowColor="white"
                            shadowOpacity={0.12}
                            shadowBlur={8}
                        />
                    </Layer>

                    <Layer name="equips">
                        {Object.values(equips).map((equip, i) => (
                            <Group>
                                <Rect
                                    x={380 + (i % 2) * 250}
                                    y={24 + Math.floor(i / 2) * 64}
                                    strokeWidth={1}
                                    stroke="#FFFFFF"
                                    height={48}
                                    width={240}
                                />
                            </Group>
                        ))}
                    </Layer>

                    <Layer name="texts">
                        <Text
                            text={caseInfo.name.slice(0, 6)}
                            fontFamily="STKaiti, 华文楷体, sans-serif"
                            fill="#FFFFFF"
                            fontSize={40}
                            x={108}
                            width={240}
                            y={24}
                        />
                        <Text
                            text={`@${user?.name ?? '配装器用户'}`}
                            fontFamily="STKaiti, 华文楷体, sans-serif"
                            fill="#FFFFFF"
                            fontSize={24}
                            x={110}
                            y={70}
                        />
                        <Text
                            text={`${result.score}`}
                            x={30}
                            align="center"
                            width={52}
                            y={83.5}
                            fontSize={16}
                        />
                        {attributes.map(([attribute, tipAttribute], i) => {
                            const titleProps: TextConfig = {
                                fill: '#FFFF00',
                                text: ATTRIBUTE_SHORT_DESC[tipAttribute ?? ''] ?? ATTRIBUTE_SHORT_DESC[attribute],
                                fontFamily: '"Microsoft YaHei", 微软雅黑, Roboto, sans-serif',
                                fontSize: 24,
                                x: ((360 - 32) / 4) * (i % 4) + 16,
                                y: 124 + Math.floor(i / 4) * 80,
                                width: (360 - 32) / 4,
                                height: 32,
                                verticalAlign: 'middle',
                                align: 'center',
                                shadowBlur: 4,
                                shadowOpacity: 0.7,
                            };
                            const numberProps: TextConfig = {
                                ...titleProps,
                                text: `${result[attribute] ?? 0}`,
                                fill: '#FFFFFF',
                                y: titleProps.y! + 36,
                                fontSize: 18,
                            };

                            return (
                                <Group key={`attribute-${attribute}`}>
                                    <Text {...titleProps} />
                                    <Text {...numberProps} />
                                </Group>
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
        );
    }
}
