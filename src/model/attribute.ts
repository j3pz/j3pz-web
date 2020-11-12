import { lit } from '../utils/literal';

export type PrimaryAttribute = 'vitality' | 'spunk' | 'spirit' | 'strength' | 'agility';
export const PrimaryAttribute: PrimaryAttribute[] = ['vitality', 'spunk', 'spirit', 'strength', 'agility'];
export type SecondaryAttribute =
    'physicsShield' | 'magicShield' | 'dodge' | 'parryBase' | 'parryValue' | 'toughness' |
    'attack' | 'heal' | 'crit' | 'critEffect' | 'overcome' |
    'hit' | 'surplus' | 'strain' | 'haste' | 'threat' | 'huajing' |
    // 直接增加百分比的属性
    'dodgePercentage' | 'toughnessPercentage' |
    'critPercentage' | 'critEffectPercentage' | 'overcomePercentage' |
    'hitPercentage' | 'strainPercentage' | 'huajingPercentage';
export const SecondaryAttribute: SecondaryAttribute[] = [
    'physicsShield', 'magicShield', 'dodge', 'parryBase', 'parryValue', 'toughness',
    'attack', 'heal', 'crit', 'critEffect', 'overcome',
    'hit', 'surplus', 'strain', 'haste', 'threat', 'huajing',
];
export type MinorAttribute = 'basicMagicShield' | 'basicPhysicsShield' | 'attackSpeed' | 'damageBase' | 'damageRange';
export const MinorAttribute: MinorAttribute[] = ['basicMagicShield', 'basicPhysicsShield', 'attackSpeed', 'damageBase', 'damageRange'];
export type ExtraAttribute = 'health' | 'healthRecover' | 'mana' | 'manaRecover' | 'damageOffset';

export type Attribute = PrimaryAttribute | SecondaryAttribute | MinorAttribute | ExtraAttribute;
export type AttributeTag =
    'physicsShield' | 'magicShield' | 'dodge' | 'parryBase' | 'toughness' | 'heal' |
    'crit' | 'overcome' | 'surplus' | 'strain' | 'haste' | 'huajing';
export const AttributeTag: AttributeTag[] = [
    'physicsShield', 'magicShield', 'dodge', 'parryBase', 'toughness', 'heal',
    'crit', 'overcome', 'surplus', 'strain', 'haste', 'huajing',
];

export const AttributeDecorator = {
    PHYSICS: lit('PHYSICS'),
    MAGIC: lit('MAGIC'),
    ALL: lit('ALL'),
    NONE: lit('NONE'),
    NEUTRAL: lit('NEUTRAL'),
    SOLAR: lit('SOLAR'),
    LUNAR: lit('LUNAR'),
    POISON: lit('POISON'),
    SOLAR_LUNAR: lit('SOLAR_LUNAR'),
};
export type AttributeDecorator = (typeof AttributeDecorator)[keyof typeof AttributeDecorator];
export type DecoratorTuple = [Attribute, AttributeDecorator];
export type DecoratableAttribute = 'attack' | 'crit' | 'critEffect' | 'hit' | 'overcome';
export const DecoratableAttribute = ['attack', 'crit', 'critEffect', 'hit', 'overcome'];

export const DECORATOR_DESC: { [k in AttributeDecorator]: string } = {
    [AttributeDecorator.PHYSICS]: '外功',
    [AttributeDecorator.MAGIC]: '内功',
    [AttributeDecorator.ALL]: '全',
    [AttributeDecorator.NONE]: '',
    [AttributeDecorator.NEUTRAL]: '混元性内功',
    [AttributeDecorator.SOLAR]: '阳性内功',
    [AttributeDecorator.LUNAR]: '阴性内功',
    [AttributeDecorator.POISON]: '毒性内功',
    [AttributeDecorator.SOLAR_LUNAR]: '阴阳内功',
};

export const ATTRIBUTE_DESC = {
    // PrimaryAttribute
    vitality: '体质+',
    spunk: '元气+',
    spirit: '根骨+',
    strength: '力道+',
    agility: '身法+',
    vitalityPercent: '体质+',
    spunkPercent: '元气+',
    spiritPercent: '根骨+',
    strengthPercent: '力道+',
    agilityPercent: '身法+',
    'vitality|spunk|spirit|strength|agility': '全属性提高',
    // SecondaryAttribute
    physicsShield: '外功防御等级提高',
    magicShield: '内功防御等级提高',
    dodge: '闪避等级提高',
    parryBase: '招架等级提高',
    parryValue: '拆招等级提高',
    toughness: '御劲等级提高',
    attack: '攻击提高',
    heal: '治疗成效提高',
    healCoefficient: '治疗成效提高',
    crit: '会心等级提高',
    critEffect: '会心效果提高',
    overcome: '破防等级提高',
    hit: '命中等级提高',
    strain: '无双等级提高',
    surplus: '破招等级提高',
    haste: '加速等级提高',
    threat: '招式产生的威胁提高',
    huajing: '化劲等级提高',
    // MinorAttribute
    basicPhysicsShield: '外功防御等级提高',
    basicMagicShield: '内功防御等级提高',
    // ExtraAttribute
    health: '额外提高气血上限',
    healthRecover: '每秒回复气血',
    mana: '最大内力上限提高',
    manaRecover: '每秒内力恢复提升',
    manaCost: '减少内力消耗',
    // damageOffset: '',
    damageBase: '武器伤害提高',
};
export const ATTRIBUTE_SHORT_DESC = {
    // PrimaryAttribute
    vitality: '体质',
    spunk: '元气',
    spirit: '根骨',
    strength: '力道',
    agility: '身法',
    // SecondaryAttribute
    physicsShield: '外防',
    magicShield: '内防',
    dodge: '闪避',
    parryBase: '招架',
    parryValue: '拆招',
    toughness: '御劲',
    attack: '攻击',
    heal: '治疗',
    crit: '会心',
    critEffect: '会效',
    overcome: '破防',
    hit: '命中',
    strain: '无双',
    surplus: '破招',
    haste: '加速',
    threat: '威胁',
    huajing: '化劲',
    // MinorAttribute
    basicPhysicsShield: '外防',
    basicMagicShield: '内防',
    // ExtraAttribute
    health: '气血',
    healthRecover: '气血恢复',
    mana: '内力',
    manaRecover: '内力恢复',
    // damageOffset: '',
    score: '装分',
};

export const EXTRA_ATTRIBUTE_DESC = {
    baseAttack: '基础攻击',
    baseHeal: '基础治疗',
    hit: '命中等级',
    hitRate: '命中率',
    crit: '会心等级',
    critRate: '会心率',
    critEffect: '会心效果等级',
    critEffectRate: '会心效果',
    haste: '加速等级',
    hasteRate: '加速率',
    overcome: '破防等级',
    overcomeRate: '破防率',
    strain: '无双等级',
    strainRate: '无双率',
    physicsShield: '外防等级',
    physicsShieldRate: '外防率',
    magicShield: '内防等级',
    magicShieldRate: '内防率',
    dodge: '闪避等级',
    dodgeRate: '闪避率',
    parryBase: '招架等级',
    parryBaseRate: '招架率',
    toughness: '御劲等级',
    toughnessRate: '御劲率',
    huajing: '化劲等级',
    huajingRate: '化劲率',
};
