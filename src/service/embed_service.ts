import { EditState } from '../store';

export class EmbedService {
    static totalLevel = 0;
    static totalCount = 0;

    static update(store: EditState) {
        let totalCount = 0;
        let totalLevel = 0;
        Object.values(store.equips).forEach((equip) => {
            (equip?.embedding ?? []).forEach((ops) => {
                if (ops?.level > 0) {
                    totalCount += 1;
                    totalLevel += ops.level;
                }
            });
        });
        this.totalCount = totalCount;
        this.totalLevel = totalLevel;
    }
}
