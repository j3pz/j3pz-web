import { Category } from '../model/base';
import { Equip } from '../model/equip';
import { EquipSet } from '../model/equip_set';
import { SimpleEquip } from '../model/simple_equip';
import { EditState } from '../store';

interface Collection extends EquipSet {
    equips: Partial<Record<Category, (SimpleEquip & { active?: boolean })[]>>;
}

export class CollectionService {
    static collections: Map<number, Collection> = new Map();

    static getEquips(equip: Equip) {
        const collection = this.collections.get(equip.set?.id);
        if (!collection) return [];
        return Object.entries(collection.equips)
            .filter(([, equips]) => (equips ?? []).length > 0)
            .map(([category, equips]) => ({
                name: equips![0].name,
                active: equips!.filter((e) => e.active).length > 0,
                category,
            }));
    }
    static getActiveCount(equip: Equip): number {
        const collection = this.collections.get(equip.set?.id);
        if (!collection) return 0;
        return Object.values(collection.equips).reduce((active, equipList = []) => active + equipList?.filter((e) => e.active).length, 0);
    }

    static updateCollection(store: EditState) {
        const collections: Map<number, Collection> = new Map();
        Object.values(store.equips).forEach((equip) => {
            if (equip?.set) {
                if (!collections.has(equip.set.id)) {
                    collections.set(equip.set.id, equip.set.clone());
                }
                const collection = collections.get(equip.set.id)!;
                const match = collection.equips[equip.category]?.find((e) => e.id === equip.id);
                if (match) {
                    match.active = true;
                }
            }
        });
        this.collections = collections;
    }
}
