import { Type, plainToClass } from 'class-transformer';
import { Category, School } from './base';
import { Effect } from './effect';
import { EmbedInfo } from './embed';

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
    @Type(() => Effect)
    public effect: Effect;
    // public set: EquipSet;
    public embed: string;
    public strengthen: number;
    // public source: Source[];
    // public represent: Represent;

    public deprecated: boolean;

    public embedding: EmbedInfo = new EmbedInfo();
    public strengthened = 0;

    constructor(category?: Category) {
        if (category) this.category = category;
    }

    static fromJson(json: Object): Equip {
        const equip = plainToClass(Equip, json);
        if (equip.embed) {
            equip.embedding.holes = +equip.embed.substr(0, 1);
            for (let i = 0; i < equip.embedding.holes; i += 1) {
                equip.embedding.stones.push({
                    type: 'unified',
                    level: 0,
                    attribute: equip.embed.substring(i * 3 + 1, i * 3 + 4),
                });
            }
        }
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
