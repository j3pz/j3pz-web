import { Type, plainToClass, classToClass } from 'class-transformer';
import { AttributeDecorator, SecondaryAttribute } from './attribute';
import { Category, School } from './base';
import { Effect } from './effect';
import { EmbedInfo, EmbedOps } from './embed';
import { Enhance } from './enhance';
import { EquipSet } from './equip_set';
import { Represent } from './represent';
import { Source, redeemType, SourceType } from './source';
import { Stone } from './stone';

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
    @Type(() => EquipSet)
    public set: EquipSet;
    @Type(() => EmbedInfo)
    public embed: EmbedInfo;
    public strengthen: number;
    @Type(() => Source)
    public source: Source[];
    public represent: Represent;
    public decorators: { [k in SecondaryAttribute]: AttributeDecorator };

    public deprecated: boolean;

    public embedding: EmbedOps[] = [];
    public attributeStone: Stone;
    public strengthLevel = 0;
    public enhance: Enhance | null = null;

    constructor(category?: Category) {
        if (category) this.category = category;
    }

    static fromJson(json: Object): Equip {
        const equip = plainToClass(Equip, json);
        equip.embedding = Array.from({ length: equip.embed.count });
        return equip;
    }

    public getStrengthValue(base: number): number {
        return Math.round((base * this.strengthLevel * (0.007 + this.strengthLevel * 0.003)) / 2);
    }

    public setStrengthLevel(level: number): Equip {
        const equip = classToClass(this);
        equip.strengthLevel = Math.min(equip.strengthen, level);
        return equip;
    }

    public setEmbed(idx: number, level: number): Equip {
        if (idx < this.embed.count && level >= 0) {
            const equip = classToClass(this);
            equip.embedding[idx] = {
                index: idx,
                level,
            };
            return equip;
        }
        return this;
    }

    public setEnhance(enhance?: Enhance | null): Equip {
        if (enhance) {
            const equip = classToClass(this);
            equip.enhance = enhance;
            return equip;
        }
        const equip = classToClass(this);
        equip.enhance = null;
        return equip;
    }

    public clone(): Equip {
        return classToClass(this);
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

    get embedScore(): number {
        const stoneScore = [0, 10.56, 21.12, 31.68, 42.24, 52.8, 63.36, 84.48, 109.12];
        return Math.round(this.embedding
            .filter((ops) => ops?.index < this.embed.count)
            .reduce((score, ops) => score + stoneScore[ops?.level ?? 0], 0));
    }

    get sourceDescription(): string {
        return this.source.map((s) => {
            switch (s.type) {
                default: return '';
                case SourceType.RAID:
                    return `[掉落] ${s.boss.name}(${s.boss.map.name})`;
                case SourceType.REDEEM:
                    return `[商店] ${redeemType[s.redeem]}`;
                case SourceType.REPUTATION:
                    return `[声望] ${s.reputation.name} - ${s.reputation.level}`;
                case SourceType.ACTIVITY:
                    return `[活动] ${s.activity}`;
                case SourceType.OTHER:
                    return `[其它] ${s.comment ?? ''}`;
            }
        }).join('\n');
    }
}
