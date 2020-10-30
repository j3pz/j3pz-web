import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { PrimaryAttribute } from '../../model/attribute';
import { GamingRole } from '../../model/base';
import { StoreProps } from '../../store';
import './editor_viewer.less';
import { ResultService } from '../../service/result_service';
import { Result } from '../../model/result';
import { ResultItem } from './result_item';

type ResultTuple = [keyof Result, keyof Result | null];

@observer
export class EditorViewer extends Component<StoreProps> {
    get basicAttributes(): ResultTuple[] {
        const { kungfuMeta, showAllAttributes } = this.props.store;
        if (!kungfuMeta) return [];
        const attributes: ResultTuple[] = [['score', null], [kungfuMeta.primaryAttribute, null]];
        if (showAllAttributes) {
            const others: ResultTuple[] = PrimaryAttribute.filter((a) => a !== kungfuMeta.primaryAttribute)
                .map((a) => [a, null]);
            attributes.push(...others);
        }
        return attributes;
    }

    get damageAttributes(): ResultTuple[] {
        const { kungfuMeta, showAllAttributes } = this.props.store;
        if (!kungfuMeta) return [];
        const attributes: ResultTuple[] = [];
        if (showAllAttributes || kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            attributes.push(['attack', 'baseAttack']);
        }
        if (showAllAttributes || kungfuMeta.role === GamingRole.HEALER) {
            attributes.push(['heal', null]);
        }
        if (showAllAttributes) {
            attributes.push(['hitRate', 'hit']);
        }
        if (showAllAttributes || kungfuMeta.role !== GamingRole.TANK) {
            // 会心
            attributes.push(['critRate', 'crit']);
            // 会心效果
            attributes.push(['critEffectRate', 'critEffect']);
        }
        // 急速
        attributes.push(['hasteRate', 'haste']);
        if (showAllAttributes || kungfuMeta.role === GamingRole.DAMAGE_DEALER) {
            // 破防
            attributes.push(['overcomeRate', 'overcome']);
        }
        if (showAllAttributes || kungfuMeta.role !== GamingRole.HEALER) {
            // 无双
            attributes.push(['strainRate', 'strain']);
            // 破招
            attributes.push(['surplus', null]);
        }
        return attributes;
    }

    get defenseAttributes(): ResultTuple[] {
        const { kungfuMeta, showAllAttributes } = this.props.store;
        if (!kungfuMeta) return [];
        const attributes: ResultTuple[] = [];
        // 气血
        attributes.push(['health', null]);
        // 内防
        attributes.push(['physicsShieldRate', 'physicsShield']);
        // 外防
        attributes.push(['magicShieldRate', 'magicShield']);

        if (showAllAttributes || kungfuMeta.role === GamingRole.TANK) {
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
        return attributes;
    }

    render() {
        const result = ResultService.calc(this.props.store);
        return (
            <div
                className="result-view"
            >
                <div className="label"><b>基础</b></div>
                {this.basicAttributes.map(([key, tips]) => <ResultItem key={key} attrib={key} tips={tips} result={result} />)}
                <div className="label"><b>伤害</b></div>
                {this.damageAttributes.map(([key, tips]) => <ResultItem key={key} attrib={key} tips={tips} result={result} />)}
                <div className="label"><b>生存</b></div>
                {this.defenseAttributes.map(([key, tips]) => <ResultItem key={key} attrib={key} tips={tips} result={result} />)}
            </div>
        );
    }
}
