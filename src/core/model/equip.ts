import { Type, plainToClass } from 'class-transformer';
import { AttributeDecorator, AttributeTag, SecondaryAttribute } from './attribute';
import { Category, School } from './base';
import { Effect } from './effect';
import { EmbedInfo, EmbedOps } from './embed';
import Represent from './represent';

export class SimpleEquip {
    public id: number;
    public name: string;
    public icon: number;
    public quality: number;
    public tags: AttributeTag[];

    static fromJson(json: Object): SimpleEquip {
        const equip = plainToClass(SimpleEquip, json);
        return equip;
    }
}

export class Equip {
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
    @Type(() => Effect)
    public effect: Effect;
    // public set: EquipSet;
    @Type(() => EmbedInfo)
    public embed: EmbedInfo;
    public strengthen: number;
    // public source: Source[];
    public represent: Represent;
    public decorators: { [k in SecondaryAttribute]: AttributeDecorator };

    public deprecated: boolean;

    public embedding: EmbedOps[];
    public strengthened = 0;

    constructor(category?: Category) {
        if (category) this.category = category;
    }

    static fromJson(json: Object): Equip {
        const equip = plainToClass(Equip, json);
        return equip;
    }

    get damageRangeDesc(): string {
        return `${this.damageBase} - ${this.damageBase + this.damageRange}`;
    }

    get speed(): string {
        return (this.attackSpeed / 16).toFixed(1);
    }

    get damagePerSecond(): number {
        const speed = (this.damageBase + this.damageRange / 2) / (this.attackSpeed / 16);
        return Math.floor(speed * 2) / 2;
    }
}
