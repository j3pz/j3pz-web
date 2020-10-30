import { plainToClass } from 'class-transformer';
import { Attribute, AttributeDecorator } from './attribute';

export type EffectTrigger = 'Usage' | 'Passive' | 'Condition';

export class Effect {
    public id: number;

    public attribute: Attribute[] | null;

    public decorator: AttributeDecorator[] | null;

    public value: number[] | null;

    public trigger: EffectTrigger;

    public description: string;

    static fromJson(json: Object): Effect {
        const effect = plainToClass(Effect, json);
        return effect;
    }
}
