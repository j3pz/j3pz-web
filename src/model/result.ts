import {
    DecoratableAttribute, PrimaryAttribute, SecondaryAttribute, MinorAttribute, AttributeDecorator,
} from './attribute';
import { Equip } from './equip';
import { EmbedService } from '../service/embed_service';
import { DecoratedAttribute } from './decorated_attribute';
import { KungFuMeta } from './kungfu';

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

    get health(): number {
        const cof = Math.round((this.meta.override.health ?? 1) * 1024) / 1024;
        const health = (this.core.vitality * 10 + 23766) * cof
            + this.core[this.meta.primaryAttribute] * (this.meta.factor.health ?? 0)
            + this.core.health;
        return Math.floor(health);
    }

    applyEquip(equip?: Equip) {
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
                if (decorator === AttributeDecorator.ALL) {
                    (this.core[key] as DecoratedAttribute).addAll(equip[key]);
                    (this.core[key] as DecoratedAttribute).addAll(equip.getStrengthValue(equip[key]));
                } else if (decorator === AttributeDecorator.MAGIC) {
                    (this.core[key] as DecoratedAttribute).addMagic(equip[key]);
                    (this.core[key] as DecoratedAttribute).addMagic(equip.getStrengthValue(equip[key]));
                } else {
                    (this.core[key] as DecoratedAttribute)[decorator] += equip[key];
                    (this.core[key] as DecoratedAttribute)[decorator] += equip.getStrengthValue(equip[key]);
                }
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
                if (decorator === AttributeDecorator.NONE) {
                    this.core[attribute] += embedValue;
                } else if (decorator === AttributeDecorator.MAGIC) {
                    (this.core[attribute] as DecoratedAttribute).addMagic(embedValue);
                } else {
                    (this.core[attribute] as DecoratedAttribute)[decorator] += embedValue;
                }
            });
            this.core.score += equip.score + equip.embedScore;
        }
        return this;
    }
}
