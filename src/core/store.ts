import { observable } from 'mobx';
import { Position } from './model/base';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Position;
}

const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Position.HAT,
});

export default $store;

export interface StoreProps {
    store: EditState,
}
