import React from 'react';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { Result } from '../../model/result';
import './editor_viewer.less';

interface ResultItemProps {
    attrib: keyof Result;
    tips: keyof Result | null;
    result: Result;
}

const TIPS_DESC = {
    baseAttack: '基础攻击',
    baseHeal: '基础治疗',
    hit: '命中等级',
    crit: '会心等级',
    critEffect: '会心效果等级',
    haste: '加速等级',
    overcome: '破防等级',
    strain: '无双等级',
    physicsShield: '外防等级',
    magicShield: '内防等级',
    dodge: '闪避等级',
    parryBase: '招架等级',
    toughness: '御劲等级',
    huajing: '化劲等级',
};

export function ResultItem({ attrib, tips, result }: ResultItemProps) {
    return (
        <li className="result-item">
            {ATTRIBUTE_SHORT_DESC[attrib] ?? ATTRIBUTE_SHORT_DESC[tips ?? '']}
            <span>{result[attrib]}</span>
            {tips && <span>{`(${TIPS_DESC[tips]} ${result[tips]})`}</span>}
        </li>
    );
}
