import { observable } from 'mobx';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab,
    equipNavExpanded: boolean,
}

const $store = observable<EditState>({
    tab: AppTab.EQUIP,
    equipNavExpanded: true,
});

export default $store;

export interface StoreProps {
    store: EditState,
}
