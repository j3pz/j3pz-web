import { Category } from './base';
import { Effect } from './effect';
import { SimpleEquip } from './simple_equip';

type SetEquipInfo = Partial<Record<Category, SimpleEquip[]>>;

export class SetEffect {
    public id: number;
    public requirement: number;
    public effect: Effect;
    public set: EquipSet;
}

export class EquipSet {
    public id: number;
    public name: string;
    public setEffect: SetEffect[];
    public equips: SetEquipInfo;
}
