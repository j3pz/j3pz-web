import lit from '../../utils/literal';

export type PrimaryAttribute = 'vitality' | 'spunk' | 'spirit' | 'strength' | 'agility';
export const PrimaryAttribute: PrimaryAttribute[] = ['vitality', 'spunk', 'spirit', 'strength', 'agility'];
export type SecondaryAttribute =
    'physicsShield' | 'magicShield' | 'dodge' | 'parryBase' | 'parryValue' | 'toughness' |
    'attack' | 'heal' | 'crit' | 'critEffect' | 'overcome' |
    'hit' | 'strain' | 'haste' | 'threat' | 'huajing' |
    // 直接增加百分比的属性
    'dodgePercentage' | 'toughnessPercentage' |
    'critPercentage' | 'critEffectPercentage' | 'overcomePercentage' |
    'hitPercentage' | 'strainPercentage' | 'huajingPercentage';
export const SecondaryAttribute: SecondaryAttribute[] = [
    'physicsShield', 'magicShield', 'dodge', 'parryBase', 'parryValue', 'toughness',
    'attack', 'heal', 'crit', 'critEffect', 'overcome',
    'hit', 'strain', 'haste', 'threat', 'huajing',
];
export type MinorAttribute = 'basicMagicShield' | 'basicPhysicsShield' | 'attackSpeed' | 'damageBase' | 'damageRange';
export type ExtraAttribute = 'health' | 'healthRecover' | 'mana' | 'manaRecover' | 'damageOffset';

export type Attribute = PrimaryAttribute | SecondaryAttribute | MinorAttribute | ExtraAttribute;
export type AttributeTag =
    'physicsShield' | 'magicShield' | 'dodge' | 'parryBase' | 'toughness' |
    'crit' | 'overcome' | 'hit' | 'strain' | 'haste';

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

export const ATTRIBUTE_DESC = {
    // PrimaryAttribute
    vitality: '体质+',
    spunk: '元气+',
    spirit: '根骨+',
    strength: '力道+',
    agility: '身法+',
    // SecondaryAttribute
    physicsShield: '外功防御等级提高',
    magicShield: '内功防御等级提高',
    dodge: '闪避等级提高',
    parryBase: '招架等级提高',
    parryValue: '拆招等级提高',
    toughness: '御劲等级提高',
    attack: '攻击提高',
    heal: '治疗成效提高',
    crit: '会心等级提高',
    critEffect: '会心效果提高',
    overcome: '破防等级提高',
    hit: '命中等级提高',
    strain: '无双等级提高',
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
    // damageOffset: '',
};
