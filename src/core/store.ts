import { observable } from 'mobx';
import { Category } from './model/base';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab;
    equipNavExpanded: boolean;
    activeEquipNav: Category;
}

const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
    activeEquipNav: Category.HAT,
});

export default $store;

export interface StoreProps {
    store: EditState,
}
