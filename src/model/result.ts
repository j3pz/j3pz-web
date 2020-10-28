import {
    DecoratableAttribute, PrimaryAttribute, SecondaryAttribute, MinorAttribute, AttributeDecorator,
} from './attribute';
import { Equip } from './equip';
import { EmbedService } from '../service/embed_service';
import { DecoratedAttribute } from './decorated_attribute';
import { KungFuMeta } from './kungfu';
import { Stone } from './stone';

class ResultCore {
    // PrimaryAttribute
    public vitality = 38;
    public spunk = 37;
    public spirit = 38;
    public strength = 37;
    public agility = 38;

    // SecondaryAttribute
    public physicsShield = 0;
    public basicPhysicsShield = 0;
    public magicShield = 0;
    public basicMagicShield = 0;

    public dodge = 0;
    public parryBase = 0;
    public parryValue = 0;
    public toughness = 0;

    public attack = new DecoratedAttribute();
    public heal = 0;
    public crit = new DecoratedAttribute();
    public critEffect = new DecoratedAttribute();
    public overcome = new DecoratedAttribute();
    public hit = new DecoratedAttribute();
    public surplus = 0;
    public strain = 0;
    public haste = 0;
    public threat = 0;
    public huajing = 0;

    public score = 0;

    public health = 0;
}

export class Result {
    constructor(private meta: KungFuMeta) {}
    private core = new ResultCore();

    public get vitality(): number {
        return this.core.vitality;
    }
    public get spunk(): number {
        return this.core.spunk;
    }
    public get spirit(): number {
        return this.core.spirit;
    }
    public get strength(): number {
        return this.core.strength;
    }
    public get agility(): number {
        return this.core.agility;
    }

    public get physicsShield(): number {
        return this.core.physicsShield + this.core.basicPhysicsShield + (this.meta.base.physicsShield ?? 0);
    }
    public get magicShield(): number {
        return this.core.magicShield + this.core.basicMagicShield + (this.meta.base.magicShield ?? 0);
    }

    public get dodge(): number {
        return this.core.dodge;
    }
    public get parryBase(): number {
        return this.core.parryBase;
    }
    public get parryValue(): number {
        return this.core.parryValue;
    }
    public get toughness(): number {
        return this.core.toughness;
    }

    private get rawAttack(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'attack') ?? ['attack', AttributeDecorator.ALL];
        const decoratedAttack = this.core.attack.clone();
        decoratedAttack.addMagic(0.18 * this.core.spunk);
        decoratedAttack.addPhysics(0.15 * this.core.strength);
        return decoratedAttack[decorator] + (this.meta.base.attack ?? 0);
    }
    public get baseAttack(): number {
        return Math.round(this.rawAttack);
    }
    public get attack(): number {
        return Math.round(this.rawAttack + this.core[this.meta.primaryAttribute] * (this.meta.factor.attack ?? 0));
    }

    public get heal(): number {
        const heal = this.core.heal + (this.meta.base.heal ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.heal ?? 0);
        return Math.round(heal);
    }

    public get crit(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'crit') ?? ['crit', AttributeDecorator.ALL];
        const decoratedCrit = this.core.crit.clone();
        decoratedCrit.addMagic(0.64 * this.core.spirit);
        decoratedCrit.addPhysics(0.64 * this.core.agility);
        const crit = decoratedCrit[decorator] + (this.meta.base.crit ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.crit ?? 0);
        return Math.round(crit);
    }

    public get critEffect(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'critEffect') ?? ['critEffect', AttributeDecorator.ALL];
        const critEffect = this.core.critEffect[decorator] + (this.meta.base.critEffect ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.critEffect ?? 0);
        return Math.round(critEffect);
    }

    public get overcome(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'overcome') ?? ['overcome', AttributeDecorator.ALL];
        const decoratedOvercome = this.core.overcome.clone();
        decoratedOvercome.addMagic(0.3 * this.core.spunk);
        decoratedOvercome.addPhysics(0.3 * this.core.strength);
        const overcome = decoratedOvercome[decorator] + (this.meta.base.overcome ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.overcome ?? 0);
        return Math.round(overcome);
    }

    public get hit(): number {
        const [,decorator] = this.meta.decorator.find((d) => d[0] === 'hit') ?? ['hit', AttributeDecorator.ALL];
        const hit = this.core.hit[decorator] + (this.meta.base.hit ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.hit ?? 0);
        return Math.round(hit);
    }

    public get surplus(): number {
        const surplus = this.core.surplus + (this.meta.base.surplus ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.surplus ?? 0);
        return Math.round(surplus);
    }

    public get strain(): number {
        const strain = this.core.strain + (this.meta.base.strain ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.strain ?? 0);
        return Math.round(strain);
    }

    public get haste(): number {
        const haste = this.core.haste + (this.meta.base.haste ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.haste ?? 0);
        return Math.round(haste);
    }

    public get huajing(): number {
        const huajing = this.core.huajing + (this.meta.base.huajing ?? 0)
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.huajing ?? 0);
        return Math.round(huajing);
    }

    public get health(): number {
        const cof = Math.round((this.meta.override.health ?? 1) * 1024) / 1024;
        const health = (this.core.vitality * 10 + 23766) * cof
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.health ?? 0)
            + this.core.health;
        return Math.floor(health);
    }

    public get score(): number {
        return this.core.score;
    }

    public applyEquip(equip?: Equip): Result {
        if (equip) {
            PrimaryAttribute.forEach((key) => {
                this.core[key] += equip[key] ?? 0;
                this.core[key] += equip.getStrengthValue(equip[key]);
            });
            SecondaryAttribute
                .filter((attribute) => !DecoratableAttribute.includes(attribute))
                .forEach((key) => {
                    this.core[key] += equip[key] ?? 0;
                    this.core[key] += equip.getStrengthValue(equip[key]);
                });
            MinorAttribute.forEach((key) => {
                if (this.core[key] !== undefined) {
                    this.core[key] += equip[key] ?? 0;
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
                    this.add(key, value, decorator);
                }
            });
        }
        return this;
    }

    private add(key, value, decorator) {
        if (decorator === AttributeDecorator.NONE) {
            this.core[key] += value;
        } else if (decorator === AttributeDecorator.ALL) {
            (this.core[key] as DecoratedAttribute).addAll(value);
        } else if (decorator === AttributeDecorator.MAGIC) {
            (this.core[key] as DecoratedAttribute).addMagic(value);
        } else {
            (this.core[key] as DecoratedAttribute)[decorator] += value;
        }
    }
}
