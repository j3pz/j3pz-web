import { plainToClass } from 'class-transformer';
import { AttributeTag } from './attribute';

export class SimpleEquip {
    public id: number;
    public name: string;
    public icon: number;
    public quality: number;
    public tags: AttributeTag[];

    static fromJson(json: Object): SimpleEquip {
        const equip = plainToClass(SimpleEquip, json);
        return equip;
    }
}
