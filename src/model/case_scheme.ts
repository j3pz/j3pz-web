import { Type } from 'class-transformer';
import { Category } from './base';

export interface EquipEmbed {
    type: 'unified';
    level: number;
}

export class EquipScheme {
    public id: number;
    public category: Category;
    public strengthen: number;
    public enhance: number | null;
    public embed: EquipEmbed[];
    public stone?: number;
}

export class CaseScheme {
    @Type(() => EquipScheme)
    public equip: EquipScheme[];

    public effect: number[];

    public talent: number[];
}
