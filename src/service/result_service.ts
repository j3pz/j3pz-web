import { Result } from '../model/result';
import { EditState } from '../store';

export class ResultService {
    static calc(store: EditState): Result {
        const result = new Result();
        Object.values(store.equips).reduce((res, equip) => {
            return res.applyEquip(equip);
        }, result);
        return result;
    }
}