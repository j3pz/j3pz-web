import { Position } from '../model/base';
import { Equip } from '../model/equip';
import { EquipSet } from '../model/equip_set';
import { SimpleEquip } from '../model/simple_equip';
import { EditState } from '../store';

interface Collection extends EquipSet {
    equips: Partial<Record<Position, (SimpleEquip & { active?: boolean })[]>>;
}

export class CollectionService {
    static collections: Map<number, Collection> = new Map();

    private static categoryToPosition(equipSet: EquipSet): Collection {
        const collection: Collection = equipSet;
        if (equipSet?.equips.ring) {
            collection.equips.ring_1 = equipSet.equips.ring.map((_) => _.clone());
            collection.equips.ring_2 = equipSet.equips.ring.map((_) => _.clone());
            delete (collection as EquipSet).equips.ring;
        }
        return collection;
    }

    static getEquips(equip: Equip) {
        const collection = this.collections.get(equip.set?.id);
        if (!collection) return [];
        return Object.entries(collection.equips)
            .filter(([, equips]) => (equips ?? []).length > 0)
            .map(([position, equips]) => ({
                name: [...new Set(equips!.map((_) => _.name))].join('/'),
                active: equips!.filter((e) => e.active).length > 0,
                position,
            }));
    }

    static getEffects(equip: Equip) {
        const collection = this.collections.get(equip.set?.id);
        if (!collection) return [];
        const active = this.getActiveCount(equip);
        return Object.values(collection.setEffect)
            .map((setEffect) => ({
                id: setEffect.id,
                active: setEffect.requirement <= active,
                requirement: setEffect.requirement,
                description: setEffect.effect.description,
            }));
    }

    static getActiveCount(equip: Equip): number {
        const collection = this.collections.get(equip.set?.id);
        if (!collection) return 0;
        return Object.values(collection.equips).reduce((active, equipList = []) => active + equipList?.filter((e) => e.active).length, 0);
    }

    static updateCollection(store: EditState) {
        const collections: Map<number, Collection> = new Map();
        Object.entries(store.equips).forEach(([position, equip]) => {
            if (equip?.set) {
                if (!collections.has(equip.set.id)) {
                    collections.set(equip.set.id, this.categoryToPosition(equip.set.clone()));
                }
                const collection = collections.get(equip.set.id)!;
                collection.equips[(position as Position)]?.forEach((e) => {
                    if (e.id === equip.id) {
                        e.active = true;
                    } else {
                        e.active = false;
                    }
                });
            }
        });
        this.collections = collections;
    }
}
