import { Attribute, AttributeDecorator } from './attribute';

export class SimpleStoneAttribute {
    public key: Attribute;
    public decorator: AttributeDecorator;
    public name: string;
}
export class StoneAttribute extends SimpleStoneAttribute {
    public id: number;
    public requiredLevel: number;
    public requiredQuantity: number;
    public value: number;
}
