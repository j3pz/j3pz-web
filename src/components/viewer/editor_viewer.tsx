import Konva from 'konva';
import { TextConfig } from 'konva/types/shapes/Text';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Layer, Stage, Text, Rect, Group,
} from 'react-konva';
import { DecoratorTuple, AttributeDecorator, ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { GamingRole, schoolAbbrMap } from '../../model/base';
import { StoreProps } from '../../store';
import { schoolIcons } from '../../utils/school_icon';
import { CanvasImage } from '../canvas_image/canvas_image';
import './editor_viewer.less';

interface EditorViewerState {
    width: number;
    height: number;
}

@observer
export class EditorViewer extends Component<StoreProps, EditorViewerState> {
    private container: HTMLDivElement;
    private image: HTMLImageElement;

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.checkSize();
        window.addEventListener('resize', this.checkSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkSize);
    }

    private checkSize = () => {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        this.setState({ width, height });
    };

    private getDisplayAttributes(): DecoratorTuple[] {
        const { kungfuMeta } = this.props.store;
        if (!kungfuMeta) return [];
        const attributes: DecoratorTuple[] = [];
        // 气血
        attributes.push(['health', AttributeDecorator.NONE]);
        // 基础属性
        attributes.push([kungfuMeta.primaryAttribute, AttributeDecorator.NONE]);
        // 攻击/治疗
        if (kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'attack') ?? ['attack', AttributeDecorator.ALL]);
        } else if (kungfuMeta.role === GamingRole.HEALER) {
            attributes.push(['heal', AttributeDecorator.NONE]);
        }

        if (kungfuMeta.role !== GamingRole.TANK) {
            // 会心
            attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'crit') ?? ['crit', AttributeDecorator.ALL]);
            // 会心效果
            attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'critEffect') ?? ['critEffect', AttributeDecorator.ALL]);
        }

        if (kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            // 破防
            attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'overcome') ?? ['overcome', AttributeDecorator.ALL]);
            // 破防
            attributes.push(['surplus', AttributeDecorator.NONE]);
        }

        // 命中
        // attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'hit') ?? ['hit', AttributeDecorator.ALL]);
        // 急速
        attributes.push(['haste', AttributeDecorator.NONE]);
        // 无双
        attributes.push(['strain', AttributeDecorator.NONE]);
        // 内防
        attributes.push(['physicsShield', AttributeDecorator.NONE]);
        // 外防
        attributes.push(['magicShield', AttributeDecorator.NONE]);

        if (kungfuMeta.role === GamingRole.TANK) {
            // 闪避
            attributes.push(['dodge', AttributeDecorator.NONE]);
            // 招架
            attributes.push(['parryBase', AttributeDecorator.NONE]);
            // 拆招
            attributes.push(['parryValue', AttributeDecorator.NONE]);
        }
        // 御劲
        attributes.push(['toughness', AttributeDecorator.NONE]);
        // 化劲
        attributes.push(['huajing', AttributeDecorator.NONE]);

        return attributes;
    }

    render() {
        const attributes = this.getDisplayAttributes();
        const { width, height } = this.state;
        const { kungfuMeta, kungfu } = this.props.store;
        return (
            <div
                className="result-view"
                ref={(node) => {
                    this.container = node!;
                }}
            >
                <Stage width={width} height={height}>
                    <Layer name="background">
                        <Rect
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            fill="black"
                        />
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolAbbrMap[kungfuMeta!.school]}/bg.jpg`}
                            x={0}
                            y={0}
                            width={720}
                            height={1080}
                            scale={{ x: width / 720, y: width / 720 }}
                            crop={{
                                x: 640, y: 0, width: 720, height: 1080,
                            }}
                        />
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolAbbrMap[kungfuMeta!.school]}/jn.png`}
                            x={width / 2 - 173 * 0.375}
                            y={24}
                            scale={{ x: 0.75, y: 0.75 }}
                            width={173}
                            height={175}
                            filters={[Konva.Filters.Grayscale]}
                        />
                        <CanvasImage
                            src={`https://images.j3pz.com/imgs/school/${schoolIcons[kungfu]}.png`}
                            x={width / 2 - 80 * 0.375 + 1}
                            y={59}
                            scale={{ x: 0.75, y: 0.75 }}
                            width={80}
                            height={80}
                            filters={[Konva.Filters.Grayscale]}
                        />
                        <Text
                            text={kungfu}
                            x={width / 2 - 90 * 0.5}
                            y={132}
                            letterSpacing={kungfu.length > 4 ? -3 : 0}
                            fontFamily="STKaiti, 华文楷体, sans-serif"
                            fontSize={18}
                            align="center"
                            width={90}
                        />
                        <Rect
                            x={16}
                            y={180}
                            width={width - 16 * 2}
                            height={kungfuMeta!.role === GamingRole.DAMAGE_DEALER ? 342 : 262}
                            fill="white"
                            opacity={0.3}
                            shadowColor="white"
                            shadowOpacity={0.12}
                            shadowBlur={8}
                        />
                    </Layer>
                    <Layer name="texts">
                        {attributes.map(([attribute], i) => {
                            const titleProps: TextConfig = {
                                fill: '#D6913D',
                                text: ATTRIBUTE_SHORT_DESC[attribute],
                                fontFamily: '"Microsoft YaHei", 微软雅黑, Roboto, sans-serif',
                                fontSize: 24,
                                x: ((width - 32) / 4) * (i % 4) + 16,
                                y: 196 + Math.floor(i / 4) * 80,
                                width: (width - 32) / 4,
                                height: 32,
                                verticalAlign: 'middle',
                                align: 'center',
                                shadowBlur: 4,
                                shadowOpacity: 0.7,
                            };
                            const numberProps: TextConfig = {
                                ...titleProps,
                                text: '0',
                                fill: '#FFFFFF',
                                y: titleProps.y! + 36,
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
