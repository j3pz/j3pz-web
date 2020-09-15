import lit from '../../utils/literal';

export const Category = {
    HAT: lit('hat'),
    JACKET: lit('jacket'),
    BELT: lit('belt'),
    WRIST: lit('wrist'),
    BOTTOMS: lit('bottoms'),
    SHOES: lit('shoes'),
    NECKLACE: lit('necklace'),
    PENDANT: lit('pendant'),
    RING: lit('ring'),
    SECONDARY_WEAPON: lit('secondaryWeapon'),
    PRIMARY_WEAPON: lit('primaryWeapon'),
    TERTIARY_WEAPON: lit('tertiaryWeapon'),
};
export type Category = (typeof Category)[keyof typeof Category];

export const Position = {
    HAT: lit('hat'),
    JACKET: lit('jacket'),
    BELT: lit('belt'),
    WRIST: lit('wrist'),
    BOTTOMS: lit('bottoms'),
    SHOES: lit('shoes'),
    NECKLACE: lit('necklace'),
    PENDANT: lit('pendant'),
    RING1: lit('ring_1'),
    RING2: lit('ring_2'),
    SECONDARY_WEAPON: lit('secondaryWeapon'),
    PRIMARY_WEAPON: lit('primaryWeapon'),
    TERTIARY_WEAPON: lit('tertiaryWeapon'),
};
export type Position = (typeof Position)[keyof typeof Position];
