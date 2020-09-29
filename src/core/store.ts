import { observable } from 'mobx';
import 'reflect-metadata';
import { Position, KungFu } from './model/base';
import { Equip } from './model/equip';
import { Talent } from './model/talent';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Position;
    kungfu: KungFu;
    equips: {
        [Position.HAT]?: Equip;
        [Position.JACKET]?: Equip;
        [Position.BELT]?: Equip;
        [Position.WRIST]?: Equip;
        [Position.BOTTOMS]?: Equip;
        [Position.SHOES]?: Equip;
        [Position.NECKLACE]?: Equip;
        [Position.PENDANT]?: Equip;
        [Position.RING1]?: Equip;
        [Position.RING2]?: Equip;
        [Position.SECONDARY_WEAPON]?: Equip;
        [Position.PRIMARY_WEAPON]?: Equip;
        [Position.TERTIARY_WEAPON]?: Equip;
    };
    talents: Talent[];
}

export const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Position.HAT,
    kungfu: KungFu.花间游,
    equips: {},
    talents: Array.from({ length: 12 }).map(() => Talent.emptyTalent()),
});

export interface StoreProps {
    store: EditState;
}
