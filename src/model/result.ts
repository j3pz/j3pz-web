import { DecoratableAttribute, PrimaryAttribute, SecondaryAttribute, MinorAttribute, AttributeDecorator } from './attribute';
import { Equip } from './equip';
import { EmbedService } from '../service/embed_service';
import { DecoratedAttribute } from './decorated_attribute';

export class Result {
    // PrimaryAttribute
    public vitality = 0;
    public spunk = 0;
    public spirit = 0;
    public strength = 0;
    public agility = 0;

    // SecondaryAttribute
    private _physicsShield = 0;
    private basicPhysicsShield = 0;
    public set physicsShield(value: number) {
        this._physicsShield = value;
    }
    public get physicsShield() {
        return this._physicsShield + this.basicPhysicsShield;
    }

    private _magicShield = 0;
    private basicMagicShield = 0;
    public set magicShield(value: number) {
        this._magicShield = value;
    }
    public get magicShield() {
        return this._magicShield + this.basicMagicShield;
    }

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

    get health(): number {
        return 0;
    }

    set health(value: number) {
        
    }

    applyEquip(equip?: Equip) {
        if (equip) {
            PrimaryAttribute.forEach((key) => {
                this[key] = this[key] + (equip[key] ?? 0);
                this[key] += equip.getStrengthValue(equip[key]);
            });
            SecondaryAttribute
                .filter(attribute => !DecoratableAttribute.includes(attribute))
                .forEach((key) => {
                    this[key] = this[key] + (equip[key] ?? 0);
                    this[key] += equip.getStrengthValue(equip[key]);
                });
            MinorAttribute.forEach((key) => {
                if (this[key] !== undefined) {
                    this[key] = this[key] + (equip[key] ?? 0);
                }
            });

            DecoratableAttribute.forEach((key) => {
                const decorator = equip.decorators[key];
                if (decorator === AttributeDecorator.ALL) {
                    (this[key] as DecoratedAttribute).addAll(equip[key]);
                } else {
                    (this[key] as DecoratedAttribute)[decorator] += equip[key];
                }
            });
            
            [1,2,3].forEach(n => {
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
                    this[attribute] += embedValue;
                }
            });
            this.score += equip.score + equip.embedScore;
        }
        return this;
    }
}