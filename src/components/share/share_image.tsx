import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToBottom } from '@fortawesome/pro-regular-svg-icons';
import { TextConfig } from 'konva/types/shapes/Text';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Layer, Stage, Text, Rect, Group,
} from 'react-konva';
import { IconButton, Modal } from 'rsuite';
import { AttributeTag, ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
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
            attributes.push(['heal', 'baseHeal']);
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
            attributes.push(['surplus', null]);
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
        // attributes.push(['score', null]);

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
            <>
                <Modal.Body>
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
                                width={70}
                                height={24}
                                x={6}
                                y={492}
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
                            {talents.map((talent, i) => (
                                <Group key={`talent-${talent.id}`}>
                                    <CanvasImage
                                        src={`https://icons.j3pz.com/${talent.icon}.png`}
                                        x={16 + (i % 6) * 66 + 12}
                                        y={370 + Math.floor(i / 6) * 52}
                                        cornerRadius={4}
                                        width={30}
                                        height={30}
                                    />
                                    <Text
                                        text={talent.name}
                                        fontSize={12}
                                        x={16 + (i % 6) * 66}
                                        width={54}
                                        fill="#FFFFFF"
                                        y={370 + Math.floor(i / 6) * 52 + 32}
                                        align="center"
                                    />
                                </Group>
                            ))}
                            {Object.values(Position).map((pos, i) => {
                                const equip = equips[pos];
                                let isWeapon = false;
                                const index = i;

                                if (pos === Position.TERTIARY_WEAPON && kungfuMeta!.school !== School.藏剑) {
                                    return null;
                                }
                                if (pos === Position.TERTIARY_WEAPON || pos === Position.PRIMARY_WEAPON) {
                                    isWeapon = true;
                                }

                                const x = 436;
                                let y = 12 + index * (kungfuMeta!.school === School.藏剑 ? 36 : 38);
                                if (pos === Position.TERTIARY_WEAPON) {
                                    y += 14;
                                }


                                const tags = AttributeTag.filter((key) => equip?.[key] > 0)
                                    .filter((t, j, list) => t !== 'heal' || (t === 'heal' && list.length === 1));

                                return (
                                    <Group key={`equip-${equip?.id ?? 'empty'}-${index}`}>
                                        <Rect
                                            x={x}
                                            y={y}
                                            strokeWidth={1}
                                            stroke="#FFFFFF"
                                            opacity={0.3}
                                            cornerRadius={4}
                                            height={isWeapon ? 46 : 32}
                                            width={480}
                                        />

                                        <CanvasImage
                                            src={equip
                                                ? `https://icons.j3pz.com/${equip.icon}.png`
                                                : 'https://images.j3pz.com/imgs/stones/empty-slot.jpg'}
                                            width={28}
                                            height={28}
                                            cornerRadius={2}
                                            x={x + 2}
                                            y={y + 2}
                                        />

                                        <Text
                                            text={equip ? `${equip.name}(${equip.strengthLevel})` : '未选装备'}
                                            fontSize={12}
                                            fontStyle="bold"
                                            fill="#FFFFFF"
                                            x={x + 32}
                                            y={y + 4}
                                        />
                                        {equip && (
                                            <Text
                                                text={`${equip.quality} ${tags.map((t) => ATTRIBUTE_SHORT_DESC[t]).join(' ')}`}
                                                fontSize={10}
                                                fill="#FFFFFF"
                                                fonsStyle="light"
                                                x={x + 32}
                                                y={y + 19}
                                            />
                                        )}

                                        {equip && equip.embedding.filter((ops) => ops.index < equip.embed.count).map((ops, j) => (
                                            <CanvasImage
                                                key={`equip-${equip.id}-embedding-${ops.index}`}
                                                src={ops.level > 0
                                                    ? `https://images.j3pz.com/imgs/stones/0-${ops.level}.jpg`
                                                    : 'https://images.j3pz.com/imgs/stones/empty-slot.jpg'}
                                                width={16}
                                                height={16}
                                                cornerRadius={2}
                                                x={x + 150 + j * 18}
                                                y={y + 6}
                                            />
                                        ))}

                                        {equip?.enhance && (
                                            <Text
                                                text={equip.enhance.name}
                                                x={x + 220}
                                                y={y + 4}
                                                fontSize={12}
                                                fill="#52A7EE"
                                            />
                                        )}

                                        {(equip?.source.length ?? 0) > 0 && (
                                            <Text
                                                text={equip!.sourceDescription.split('\n').join(',')}
                                                x={x + 220}
                                                y={y + 18}
                                                width={275}
                                                fontSize={12}
                                                fill="#FFFFFF"
                                                ellipsis
                                                wrap="none"
                                            />
                                        )}

                                        {equip && isWeapon && (
                                            <Text
                                                text={(stones[pos] as Stone)?.name ?? ''}
                                                x={x + 220}
                                                y={y + 32}
                                                fontSize={12}
                                                fill="#EDDC87"
                                            />
                                        )}
                                    </Group>
                                );
                            })}
                            <Text
                                text={caseInfo.name}
                                fontFamily="STKaiti, 华文楷体, sans-serif"
                                fill="#FFFFFF"
                                align="center"
                                fontSize={32}
                                x={118}
                                width={300}
                                y={24}
                                ellipsis
                                wrap="none"
                            />
                            <Text
                                text={`by ${user?.name ?? '配装器用户'}`}
                                fontFamily="STKaiti, 华文楷体, sans-serif"
                                fill="#FFFFFF"
                                align="center"
                                fontSize={16}
                                width={300}
                                x={118}
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
                            <Text
                                text="奇穴"
                                x={18}
                                fill="#FFFFFF"
                                align="center"
                                width={52}
                                y={346}
                                fontSize={14}
                            />
                            {attributes.map(([attribute, tipAttribute], i) => {
                                const titleProps: TextConfig = {
                                    fill: '#EDDC87',
                                    text: ATTRIBUTE_SHORT_DESC[tipAttribute ?? ''] ?? ATTRIBUTE_SHORT_DESC[attribute],
                                    fontFamily: '"Microsoft YaHei", 微软雅黑, Roboto, sans-serif',
                                    fontSize: 16,
                                    x: ((420 - 32) / 5) * (i % 5) + 16,
                                    y: 124 + Math.floor(i / 5) * 60,
                                    width: (420 - 32) / 5,
                                    height: 32,
                                    verticalAlign: 'middle',
                                    align: 'center',
                                    shadowBlur: 4,
                                    shadowOpacity: 0.7,
                                };
                                const numberProps: TextConfig = {
                                    ...titleProps,
                                    text: `${result[attribute] ?? 0}${tipAttribute && result[tipAttribute] ? `\n(${result[tipAttribute]})` : ''}`,
                                    fill: '#FFFFFF',
                                    y: titleProps.y! + 24,
                                    fontSize: 12,
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
                </Modal.Body>
                <Modal.Footer>
                    <IconButton
                        onClick={() => { this.saveImage(); }}
                        appearance="primary"
                        icon={<FontAwesomeIcon icon={faArrowToBottom} className="rs-icon" />}
                        placement="right"
                    >
                        下载图片
                    </IconButton>
                </Modal.Footer>
            </>
        );
    }
}
