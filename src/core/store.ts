import { observable } from 'mobx';
import 'reflect-metadata';
import { Position, KungFu } from './model/base';
import { Equip } from './model/equip';
import { Stone } from './model/stone';
import { Talent } from './model/talent';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Position;
    kungfu: KungFu;
    equips: {
        [k in Position]?: Equip;
    };
    talents: Talent[];
    stones: {
        [Position.PRIMARY_WEAPON]?: Stone;
        [Position.TERTIARY_WEAPON]?: Stone;
    };
}

export const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Position.HAT,
    kungfu: KungFu.花间游,
    equips: {},
    stones: {},
    talents: Array.from({ length: 12 }).map(() => Talent.emptyTalent()),
});

export interface StoreProps {
    store: EditState;
}
