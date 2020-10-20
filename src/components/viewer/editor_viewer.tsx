import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { DecoratorTuple, AttributeDecorator } from '../../model/attribute';
import { GamingRole } from '../../model/base';
import { StoreProps } from '../../store';

@observer
export class EditorViewer extends Component<StoreProps> {
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
        attributes.push(kungfuMeta.decorator.find((d) => d[0] === 'hit') ?? ['hit', AttributeDecorator.ALL]);
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
        return (
            <div>
                {/* <div>属性列表</div>
                {attributes.map(([attribute]) => (
                    <div>
                        {ATTRIBUTE_SHORT_DESC[attribute]}
                    </div>
                ))} */}
            </div>
        );
    }
}
