import { plainToClass } from 'class-transformer';
import { Attribute, AttributeDecorator } from './attribute';
import { Category } from './base';

export class Enhance {
    public id: number;
    public name: string;
    public category: Category;
    public description: string;
    public attribute: Attribute[];
    public value: number[];
    public decorator: AttributeDecorator;
    public deprecated: boolean;

    static fromJson(json: Object): Enhance {
        const enhance = plainToClass(Enhance, json);
        return enhance;
    }
}

export class SimpleEnhance {
    public id: number;
    public name: string;
    public description: string;

    static fromJson(json: Object): SimpleEnhance {
        const enhance = plainToClass(SimpleEnhance, json);
        return enhance;
    }
}
