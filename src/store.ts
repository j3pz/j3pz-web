import { observable } from 'mobx';
import 'reflect-metadata';
import { Position, KungFu } from './model/base';
import { Equip } from './model/equip';
import { KungFuMeta } from './model/kungfu';
import { Stone } from './model/stone';
import { Talent } from './model/talent';
import { User } from './model/user';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Position;
    kungfu: KungFu;
    kungfuMeta: KungFuMeta | null;
    equips: {
        [k in Position]?: Equip;
    };
    talents: Talent[];
    stones: {
        [Position.PRIMARY_WEAPON]?: Stone;
        [Position.TERTIARY_WEAPON]?: Stone;
    };
    user: User | null;
}

export const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Position.HAT,
    kungfu: KungFu.花间游,
    kungfuMeta: null,
    equips: {},
    stones: {},
    talents: Array.from({ length: 12 }).map(() => Talent.emptyTalent()),
    user: null,
});

export interface StoreProps {
    store: EditState;
}
