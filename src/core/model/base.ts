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
