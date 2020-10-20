import { Attribute, AttributeDecorator, DecoratorTuple } from '../model/attribute';
import { EditState } from '../store';

const PRE_DEFINED_EMBED_VALUES = {
    defense: [6, 12, 18, 24, 30, 36, 48, 62],
    primaryAttribute: [2, 5, 8, 10, 13, 16, 21, 27],
    magicAttack: [6, 12, 19, 25, 32, 38, 51, 66],
    physicsAttack: [5, 10, 16, 21, 27, 32, 43, 55],
    secondaryAttribute: [12, 24, 36, 48, 60, 72, 96, 124],
    healthMana: [60, 120, 180, 241, 301, 361, 482, 623],
    recover: [4, 8, 12, 16, 21, 25, 33, 43],
};

const VALUE_MAP: { [k in Attribute]?: number[] } = {
    // PrimaryAttribute
    vitality: PRE_DEFINED_EMBED_VALUES.defense,
    spunk: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    spirit: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    strength: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    agility: PRE_DEFINED_EMBED_VALUES.primaryAttribute,
    // SecondaryAttribute
    physicsShield: PRE_DEFINED_EMBED_VALUES.defense,
    magicShield: PRE_DEFINED_EMBED_VALUES.defense,
    dodge: PRE_DEFINED_EMBED_VALUES.defense,
    parryBase: PRE_DEFINED_EMBED_VALUES.defense,
    parryValue: [34, 69, 104, 139, 174, 208, 278, 359],
    toughness: PRE_DEFINED_EMBED_VALUES.defense,
    heal: [5, 11, 17, 23, 29, 35, 46, 60],
    crit: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    critEffect: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    overcome: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    hit: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    strain: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    surplus: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    haste: PRE_DEFINED_EMBED_VALUES.secondaryAttribute,
    threat: [0.9, 1.8, 2.6, 3.5, 4.4, 5.3, 7.1, 9.2],
    huajing: PRE_DEFINED_EMBED_VALUES.defense,
    // ExtraAttribute
    health: PRE_DEFINED_EMBED_VALUES.healthMana,
    healthRecover: PRE_DEFINED_EMBED_VALUES.recover,
    mana: PRE_DEFINED_EMBED_VALUES.healthMana,
    manaRecover: PRE_DEFINED_EMBED_VALUES.recover,
};

export class EmbedService {
    static totalLevel = 0;
    static totalCount = 0;

    static update(store: EditState) {
        let totalCount = 0;
        let totalLevel = 0;
        Object.values(store.equips).forEach((equip) => {
            (equip?.embedding ?? []).forEach((ops) => {
                if (ops?.level > 0) {
                    totalCount += 1;
                    totalLevel += ops.level;
                }
            });
        });
        this.totalCount = totalCount;
        this.totalLevel = totalLevel;
    }

    static getPlusValueByLevel([attribute, decorator]: DecoratorTuple, level: number) {
        if (level > 0) {
            if (attribute === 'attack') {
                return decorator === AttributeDecorator.PHYSICS
                    ? PRE_DEFINED_EMBED_VALUES.physicsAttack[level - 1]
                    : PRE_DEFINED_EMBED_VALUES.magicAttack[level - 1];
            }
            return VALUE_MAP[attribute]?.[level - 1] ?? 0;
        }
        return 0;
    }
}
