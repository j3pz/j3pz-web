import { GamingRole, School } from '../model/base';
import { Result } from '../model/result';
import { EditState } from '../store';
import { CollectionService } from './collection_service';

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
        }, store.kungfu);
        Object.values(store.equips).reduce((res, equip) => res.applyEquip(equip), result);
        Object.values(store.stones).reduce((res, stone) => res.applyStone(stone), result);
        [...CollectionService.collections.values()].reduce((res, collection) => res.applyCollection(collection), result);
        Object.values(store.talents).reduce((res, talent) => {
            if (talent.effect) {
                res.applyEffect(talent.effect);
            }
            return res;
        }, result);
        return result;
    }
}
