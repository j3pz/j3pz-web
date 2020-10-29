import { TextConfig } from 'konva/types/shapes/Text';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Layer, Stage, Text, Rect, Group,
} from 'react-konva';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import {
    GamingRole, Position, School, schoolAbbrMap,
} from '../../model/base';
import { Result } from '../../model/result';
import { Stone } from '../../model/stone';
import { ResultService } from '../../service/result_service';
import { StoreProps } from '../../store';
import { schoolIcons } from '../../utils/school_icon';
import { CanvasImage } from '../canvas_image/canvas_image';

type ResultTuple = [keyof Result, keyof Result | null];

@observer
export class ShareImage extends Component<StoreProps> {
    private stage;

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

    saveImage() {
        const { caseInfo } = this.props.store;
        const uri = this.stage.toDataURL();
        const link = document.createElement('a');
        link.download = `j3pz_${caseInfo.name}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        const {
            kungfuMeta, kungfu, caseInfo, user, equips, stones, talents,
        } = this.props.store;
        const attributes = this.getDisplayAttributes();

        const result = ResultService.calc(this.props.store);
        return (
            <div>
                <Stage width={928} height={522} ref={(node) => { this.stage = node; }}>
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
                            x={764}
                            y={24}
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
                            height={kungfuMeta!.role === GamingRole.DAMAGE_DEALER ? 302 : 232}
                            fill="white"
                            opacity={0.3}
                            shadowColor="white"
                            shadowOpacity={0.12}
                            shadowBlur={8}
                        />
                    </Layer>

                    <Layer name="talents">
                        {talents.map((talent, i) => (
                            <Group key={`talent-${talent.id}`}>
                                <CanvasImage
                                    src={`https://icons.j3pz.com/${talent.icon}.png`}
                                    x={14 + (i % 6) * 54 + 12}
                                    y={420 + Math.floor(i / 6) * 52}
                                    cornerRadius={4}
                                    width={30}
                                    height={30}
                                />
                                <Text
                                    text={talent.name}
                                    fontSize={12}
                                    x={14 + (i % 6) * 54}
                                    width={54}
                                    fill="#FFFFFF"
                                    y={420 + Math.floor(i / 6) * 52 + 32}
                                    align="center"
                                />
                            </Group>
                        ))}
                    </Layer>

                    <Layer name="equips">
                        {Object.values(Position).map((pos, i) => {
                            const equip = equips[pos];
                            let isWeapon = false;
                            let index = i;

                            if (pos === Position.TERTIARY_WEAPON && kungfuMeta!.school !== School.藏剑) {
                                return null;
                            }
                            if (pos === Position.TERTIARY_WEAPON || pos === Position.PRIMARY_WEAPON) {
                                isWeapon = true;
                                index += 1;
                            }

                            const x = 380 + (index % 2) * 270;
                            const y = 104 + Math.floor(index / 2) * 56;

                            return (
                                <Group key={`equip-${equip?.id ?? 'empty'}-${index}`}>
                                    <Rect
                                        x={x}
                                        y={y}
                                        strokeWidth={1}
                                        stroke="#FFFFFF"
                                        opacity={0.3}
                                        cornerRadius={4}
                                        height={isWeapon ? 68 : 48}
                                        width={250}
                                    />

                                    <CanvasImage
                                        src={equip
                                            ? `https://icons.j3pz.com/${equip.icon}.png`
                                            : 'https://images.j3pz.com/imgs/stones/empty-slot.jpg'}
                                        width={40}
                                        height={40}
                                        cornerRadius={4}
                                        x={x + 4}
                                        y={y + 4}
                                    />

                                    <Text
                                        text={equip ? `${equip.name}(${equip.strengthLevel})` : '未选装备'}
                                        fontSize={16}
                                        fontStyle="bold"
                                        fill="#FFFFFF"
                                        x={x + 52}
                                        y={y + 4}
                                    />

                                    {equip && equip.embedding.filter((ops) => ops.index < equip.embed.count).map((ops, j, all) => (
                                        <CanvasImage
                                            key={`equip-${equip.id}-embedding-${ops.index}`}
                                            src={ops.level > 0
                                                ? `https://images.j3pz.com/imgs/stones/0-${ops.level}.jpg`
                                                : 'https://images.j3pz.com/imgs/stones/empty-slot.jpg'}
                                            width={18}
                                            height={18}
                                            cornerRadius={2}
                                            x={x + 248 - (all.length - j) * 20}
                                            y={y + 6}
                                        />
                                    ))}

                                    {equip?.enhance && (
                                        <Text
                                            text={equip.enhance.name}
                                            x={x + 52}
                                            y={y + 28}
                                            fontSize={14}
                                            fill="#EDDC87"
                                        />
                                    )}

                                    {equip && isWeapon && (
                                        <Text
                                            text={(stones[pos] as Stone)?.name ?? ''}
                                            x={x + 52}
                                            y={y + 48}
                                            fontSize={14}
                                            fill="#52A7EE"
                                        />
                                    )}
                                </Group>
                            );
                        })}
                    </Layer>

                    <Layer name="texts">
                        <Text
                            text={caseInfo.name.length > 15 ? `${caseInfo.name.slice(0, 14)}...` : caseInfo.name}
                            fontFamily="STKaiti, 华文楷体, sans-serif"
                            fill="#FFFFFF"
                            fontSize={40}
                            x={108}
                            width={600}
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
                                fill: '#EDDC87',
                                text: ATTRIBUTE_SHORT_DESC[tipAttribute ?? ''] ?? ATTRIBUTE_SHORT_DESC[attribute],
                                fontFamily: '"Microsoft YaHei", 微软雅黑, Roboto, sans-serif',
                                fontSize: 22,
                                x: ((360 - 32) / 4) * (i % 4) + 16,
                                y: 124 + Math.floor(i / 4) * 70,
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
