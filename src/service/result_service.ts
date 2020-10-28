import { GamingRole, School } from '../model/base';
import { Result } from '../model/result';
import { EditState } from '../store';

export class ResultService {
    static calc(store: EditState): Result {
        const result = new Result(store.kungfuMeta ?? {
            base: {},
            factor: {},
            override: {},
            decorator: [],
            role: GamingRole.DAMAGE_DEALER,
            school: School.万花,
            primaryAttribute: 'spunk',
        });
        Object.values(store.equips).reduce((res, equip) => res.applyEquip(equip), result);
        Object.values(store.stones).reduce((res, stone) => res.applyStone(stone), result);
        return result;
    }
}
