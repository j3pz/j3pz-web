import { plainToClass } from 'class-transformer';
import { Attribute, AttributeDecorator } from './attribute';

export class SimpleStoneAttribute {
    public key: Attribute;
    public decorator: AttributeDecorator;
    public name: string;

    identity() {
        return `${this.key}-${this.decorator}`;
    }

    static fromJson(json: Object): SimpleStoneAttribute {
        return plainToClass(SimpleStoneAttribute, json);
    }
}
export class StoneAttribute extends SimpleStoneAttribute {
    public id: number;
    public requiredLevel: number;
    public requiredQuantity: number;
    public value: number;
}
