import {
    DecoratableAttribute, PrimaryAttribute, SecondaryAttribute, MinorAttribute, AttributeDecorator,
} from './attribute';
import { Equip } from './equip';
import { EmbedService } from '../service/embed_service';
import { Collection, CollectionService } from '../service/collection_service';
import { DecoratedAttribute } from './decorated_attribute';
import { KungFuMeta } from './kungfu';
import { Stone } from './stone';
import { Category, KungFu } from './base';
import { Effect } from './effect';

class ResultCore {
    constructor(private initValue: number) {}
    // PrimaryAttribute
    public vitality = this.initValue;
    public spunk = this.initValue;
    public spirit = this.initValue;
    public strength = this.initValue;
    public agility = this.initValue;

    // SecondaryAttribute
    public physicsShield = this.initValue;
    public basicPhysicsShield = this.initValue;
    public magicShield = this.initValue;
    public basicMagicShield = this.initValue;

    public dodge = this.initValue;
    public parryBase = this.initValue;
    public parryValue = this.initValue;
    public toughness = this.initValue;

    public attack = new DecoratedAttribute(this.initValue);
    public heal = this.initValue;
    public crit = new DecoratedAttribute(this.initValue);
    public critEffect = new DecoratedAttribute(this.initValue);
    public overcome = new DecoratedAttribute(this.initValue);
    public hit = new DecoratedAttribute(this.initValue);
    public surplus = this.initValue;
    public strain = this.initValue;
    public haste = this.initValue;
    public threat = this.initValue;
    public huajing = this.initValue;

    public score = this.initValue;

    public health = this.initValue;
}

export class Result {
    constructor(private meta: KungFuMeta, private kungfu: KungFu) {
        // 体型数据
        this.core.vitality = 38;
        this.core.spunk = 37;
        this.core.spirit = 38;
        this.core.strength = 37;
        this.core.agility = 38;
    }

    private core = new ResultCore(0);
    private percent = new ResultCore(1);
    private rate = new ResultCore(0);
    private extra = new ResultCore(0);

    private globalCof = 205 * 110 - 18800;

    public get vitality(): number {
        return Math.round(this.core.vitality * this.percent.vitality);
    }
    public get spunk(): number {
        return Math.round(this.core.spunk * this.percent.spunk);
    }
    public get spirit(): number {
        return Math.round(this.core.spirit * this.percent.spirit);
    }
    public get strength(): number {
        return Math.round(this.core.strength * this.percent.strength);
    }
    public get agility(): number {
        return Math.round(this.core.agility * this.percent.agility);
    }

    public get physicsShield(): number {
        const shield = this.core.physicsShield + this.core.basicPhysicsShield
            + (this.meta.base.physicsShield ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.physicsShield ?? 0);
        return Math.round(shield);
    }
    public get physicsShieldRate(): string {
        const cof = 5.091 * this.globalCof;
        return `${((this.physicsShield / (this.physicsShield + cof)) * 100).toFixed(2)}%`;
    }
    public get magicShield(): number {
        const shield = this.core.magicShield + this.core.basicMagicShield
            + (this.meta.base.magicShield ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.magicShield ?? 0);
        return Math.round(shield);
    }
    public get magicShieldRate(): string {
        const cof = 5.091 * this.globalCof;
        return `${((this.magicShield / (this.magicShield + cof)) * 100).toFixed(2)}%`;
    }

    public get dodge(): number {
        return Math.round(this.core.dodge + this[this.meta.primaryAttribute] * (this.meta.factor.dodge ?? 0));
    }
    public get dodgeRate(): string {
        const cof = 4.628 * this.globalCof;
        return `${((this.dodge / (cof + this.dodge)) * 100).toFixed(2)}%`;
    }
    public get parryBase(): number {
        return Math.round(this.core.parryBase + this[this.meta.primaryAttribute] * (this.meta.factor.parryBase ?? 0));
    }
    public get parryBaseRate(): string {
        const cof = 4.345 * this.globalCof;
        return `${(3 + (this.parryBase / (cof + this.parryBase)) * 100).toFixed(2)}%`;
    }
    public get parryValue(): number {
        return Math.round(this.core.parryValue + this[this.meta.primaryAttribute] * (this.meta.factor.parryValue ?? 0));
    }
    public get toughness(): number {
        return Math.round(this.core.toughness + this[this.meta.primaryAttribute] * (this.meta.factor.toughness ?? 0));
    }
    public get toughnessRate(): string {
        const cof = 9.530 * this.globalCof;
        return `${((this.toughness / (this.toughness + cof)) * 100).toFixed(2)}%`;
    }

    private get rawAttack(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'attack') ?? ['attack', AttributeDecorator.ALL];
        const decoratedAttack = this.core.attack.clone();
        decoratedAttack.addMagic(0.18 * this.spunk);
        decoratedAttack.addPhysics(0.15 * this.strength);
        return decoratedAttack[decorator] + (this.meta.base.attack ?? 0);
    }
    public get baseAttack(): number {
        return Math.round(this.rawAttack);
    }
    public get attack(): number {
        return Math.round(this.rawAttack + this[this.meta.primaryAttribute] * (this.meta.factor.attack ?? 0));
    }

    public get baseHeal(): number {
        return this.core.heal + (this.meta.base.heal ?? 0);
    }
    public get heal(): number {
        const heal = this.core.heal + (this.meta.base.heal ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.heal ?? 0);
        return Math.round(heal);
    }

    public get crit(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'crit') ?? ['crit', AttributeDecorator.ALL];
        const decoratedCrit = this.core.crit.clone();
        decoratedCrit.addMagic(0.64 * this.spirit);
        decoratedCrit.addPhysics(0.64 * this.agility);
        const crit = decoratedCrit[decorator] + (this.meta.base.crit ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.crit ?? 0);
        return Math.round(crit);
    }

    public get critRate(): string {
        const cof = (9.530 * this.globalCof) / 100;
        return `${(this.crit / cof).toFixed(2)}%`;
    }

    public get critEffect(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'critEffect') ?? ['critEffect', AttributeDecorator.ALL];
        const critEffect = this.core.critEffect[decorator] + (this.meta.base.critEffect ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.critEffect ?? 0);
        return Math.round(critEffect);
    }

    public get critEffectRate(): string {
        const cof = (3.335 * this.globalCof) / 100;
        return `${(175 + this.critEffect / cof).toFixed(2)}%`;
    }

    public get overcome(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'overcome') ?? ['overcome', AttributeDecorator.ALL];
        const decoratedOvercome = this.core.overcome.clone();
        decoratedOvercome.addMagic(0.3 * this.spunk);
        decoratedOvercome.addPhysics(0.3 * this.strength);
        const overcome = decoratedOvercome[decorator] + (this.meta.base.overcome ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.overcome ?? 0);
        return Math.round(overcome);
    }

    public get overcomeRate(): string {
        const cof = (9.530 * this.globalCof) / 100;
        return `${(this.overcome / cof).toFixed(2)}%`;
    }

    public get hit(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'hit') ?? ['hit', AttributeDecorator.ALL];
        const hit = this.core.hit[decorator] + (this.meta.base.hit ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.hit ?? 0);
        return Math.round(hit);
    }

    public get hitRate(): string {
        const cof = (6.931 * this.globalCof) / 100;
        return `${(100 + this.hit / cof).toFixed(2)}%`;
    }

    public get surplus(): number {
        const surplus = this.core.surplus + (this.meta.base.surplus ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.surplus ?? 0);
        return Math.round(surplus);
    }

    public get surplusDamage(): number {
        const cof = (14.504 * this.globalCof) / 100;
        return Math.floor(cof * this.surplus);
    }

    public get strain(): number {
        const strain = this.core.strain + (this.meta.base.strain ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.strain ?? 0);
        return Math.round(strain);
    }

    public get strainRate(): string {
        const cof = (9.189 * this.globalCof) / 100;
        return `${(this.strain / cof).toFixed(2)}%`;
    }

    public get haste(): number {
        const haste = this.core.haste + (this.meta.base.haste ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.haste ?? 0);
        return Math.round(haste);
    }

    public get hasteRate(): string {
        const cof = (11.695 * this.globalCof) / 100;
        return `${(Math.min(this.haste / cof, 25)).toFixed(2)}%`;
    }

    public get huajing(): number {
        const huajing = this.core.huajing + (this.meta.base.huajing ?? 0)
            + this[this.meta.primaryAttribute] * (this.meta.factor.huajing ?? 0);
        return Math.round(huajing);
    }

    public get huajingRate(): string {
        const cof = 1.380 * this.globalCof;
        return `${((this.huajing / (cof + this.huajing)) * 100).toFixed(2)}%`;
    }

    public get health(): number {
        const cof = Math.round((this.meta.override.health ?? 1) * 1024) / 1024;
        const health = (this.vitality * 10 + 23766) * cof
            + this[this.meta.primaryAttribute] * (this.meta.factor.health ?? 0)
            + this.core.health;
        return Math.floor(health);
    }

    public get score(): number {
        return Math.floor(this.core.score);
    }

    public applyEquip(equip?: Equip): Result {
        if (equip) {
            if (this.kungfu === KungFu.问水诀 && equip.category === Category.TERTIARY_WEAPON) {
                this.core.score += (equip.score + equip.getStrengthValue(equip.score) + equip.embedScore) / 2;
                return this;
            }
            if (this.kungfu === KungFu.山居剑意 && equip.category === Category.PRIMARY_WEAPON) {
                this.core.score += (equip.score + equip.getStrengthValue(equip.score) + equip.embedScore) / 2;
                return this;
            }
            PrimaryAttribute.forEach((key) => {
                this.add(key, equip[key] ?? 0);
                this.add(key, equip.getStrengthValue(equip[key]) ?? 0);
            });
            SecondaryAttribute
                .filter((attribute) => !DecoratableAttribute.includes(attribute))
                .forEach((key) => {
                    this.add(key, equip[key] ?? 0);
                    this.add(key, equip.getStrengthValue(equip[key]) ?? 0);
                });
            MinorAttribute.forEach((key) => {
                if (this.core[key] !== undefined) {
                    this.add(key, equip[key] ?? 0);
                }
            });

            DecoratableAttribute.forEach((key) => {
                const decorator = equip.decorators[key];
                this.add(key, equip[key] ?? 0, decorator);
                this.add(key, equip.getStrengthValue(equip[key]) ?? 0, decorator);
            });

            [1, 2, 3].forEach((n) => {
                if (equip.embed.count < n) {
                    return;
                }
                const embedStone = equip.embedding[n - 1] ?? { index: n - 1, level: 0 };
                const active = embedStone.level > 0;
                if (!active) {
                    return;
                }
                const tuple = equip.embed.attributes[n - 1];
                const [attribute, decorator] = tuple;
                const embedValue = EmbedService.getPlusValueByLevel(tuple, embedStone.level);
                this.add(attribute, embedValue, decorator);
            });

            equip.enhance?.attribute.forEach((key, i) => {
                const value = equip.enhance!.value[i] ?? equip.enhance!.value[0];
                this.add(key, +value, equip.enhance!.decorator);
            });
            this.core.score += equip.score + equip.getStrengthValue(equip.score) + equip.embedScore;
        }
        return this;
    }

    public applyStone(stone?: Stone): Result {
        if (stone) {
            this.core.score += stone.level * 308;
            stone.attributes.forEach((attrib) => {
                const active = attrib.requiredLevel <= EmbedService.totalLevel
                    && attrib.requiredQuantity <= EmbedService.totalCount;
                if (active) {
                    const { key, value, decorator } = attrib;
                    const keys = key.split('|');
                    keys.forEach((k) => {
                        this.add(k, value, decorator);
                    });
                }
            });
        }
        return this;
    }

    public applyCollection(collection: Collection): Result {
        const activeCount = CollectionService.getActiveCount(collection);
        collection.setEffect.forEach((s) => {
            const active = s.requirement <= activeCount;
            if (active) {
                s.effect.attribute?.forEach((key, i) => {
                    const value = s.effect.value![i] ?? s.effect.value![0];
                    const decorator = s.effect.decorator![i] ?? s.effect.decorator![0];
                    this.add(key, +value, decorator);
                });
            }
        });
        return this;
    }

    public applyEffect(effect: Effect): Result {
        effect.attribute?.forEach((key, i) => {
            const value = effect.value![i] ?? effect.value![0];
            const decorator = effect.decorator![i] ?? effect.decorator![0];
            this.add(key, +value, decorator);
        });
        return this;
    }

    private add(attributeKey: string, attributeValue: number, decorator: AttributeDecorator = AttributeDecorator.NONE) {
        let to = this.core;
        let key = attributeKey;
        let value = attributeValue;
        if (key.endsWith('Rate')) {
            to = this.rate;
            key = attributeKey.replace('Rate', '');
        } else if (key.endsWith('Percent')) {
            to = this.percent;
            key = attributeKey.replace('Percent', '');
            value = attributeValue / 1024;
        }
        if (decorator === AttributeDecorator.NONE) {
            to[key] += value;
        } else if (decorator === AttributeDecorator.ALL) {
            (to[key] as DecoratedAttribute).addAll(value);
        } else if (decorator === AttributeDecorator.MAGIC) {
            (to[key] as DecoratedAttribute).addMagic(value);
        } else {
            (to[key] as DecoratedAttribute)[decorator] += value;
        }
    }
}
