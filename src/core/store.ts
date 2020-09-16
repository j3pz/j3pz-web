import { observable } from 'mobx';
import 'reflect-metadata';
import { Position, KungFu } from './model/base';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Position;
    kungfu: KungFu;
}

const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Position.HAT,
    kungfu: KungFu.花间游,
});

export default $store;

export interface StoreProps {
    store: EditState,
}
