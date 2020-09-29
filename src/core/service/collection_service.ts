import { EditState } from '../store';

export class CollectionService {
    static getCollectionInfo(store: EditState) {
        const collections = [];
        Object.values(store.equips).forEach((equip) => {
            if (equip?.set) {

            }
        });
    }
}
