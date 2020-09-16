import { Category, School } from './base';

export default class Equip {
    public id: number;

    public name: string;

    public icon: number;

    public category: Category;

    public quality: number;

    public school: School;

    public primaryAttribute: string;

    public score: number;

    public vitality: number;

    public spirit: number;

    public strength: number;

    public agility: number;

    public spunk: number;

    public basicPhysicsShield: number;

    public basicMagicShield: number;

    public damageBase: number;

    public damageRange: number;

    public attackSpeed: number;

    public physicsShield: number;

    public magicShield: number;

    public dodge: number;

    public parryBase: number;

    public parryValue: number;

    public toughness: number;

    public attack: number;

    public heal: number;

    public crit: number;

    public critEffect: number;

    public overcome: number;

    public haste: number;

    public hit: number;

    public strain: number;

    public huajing: number;

    public threat: number;

    // public effect: Effect;

    // public set: EquipSet;

    public embed: string;

    public strengthen: number;

    // public source: Source[];

    // public represent: Represent;

    public deprecated: boolean;

    static fromJson(): Equip {
        return new Equip();
    }
}
