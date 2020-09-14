import { observable } from 'mobx';

export enum AppTab { EQUIP, CASE }

export interface EditState {
    tab: AppTab,
}

const $store = observable<EditState>({
    tab: AppTab.EQUIP,
});

export default $store;
