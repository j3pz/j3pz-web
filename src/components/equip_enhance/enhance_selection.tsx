import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { SelectPicker } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import { StoreProps } from '../../store';
import { EnhanceService } from '../../service/enhance_service';
import { KungFu, Position } from '../../model/base';
import { navLib } from '../equip_tab/equip_nav';
import { Enhance, SimpleEnhance } from '../../model/enhance';

@observer
export class EnhanceSelection extends Component<StoreProps> {
    private cache: Map<Position, SimpleEnhance[]>;
    private lastKungFu: KungFu;

    constructor(props) {
        super(props);
        this.state = {
        };
        this.cache = new Map();
    }

    private handleUpdate = () => {
        const { store } = this.props;
        const currentPosition = store.activeEquipNav;
        const currentKungfu = store.kungfu;
        if (this.cache.has(currentPosition) && currentKungfu === this.lastKungFu) {
            return;
        }
        EnhanceService.listEnhance(navLib.get(store.activeEquipNav)!.category, currentKungfu).then((res) => {
            const list = res.map((_) => SimpleEnhance.fromJson(_.attributes));
            this.cache.set(currentPosition, list);
            this.lastKungFu = currentKungfu;
            this.forceUpdate();
        });
    };

    private setEnhance = (id: number) => {
        const { store } = this.props;
        const currentPosition = store.activeEquipNav;
        EnhanceService.getEnhance(id).then((res) => {
            const enhance = Enhance.fromJson(res.attributes);
            const currentEquip = store.equips[currentPosition];
            if (currentEquip) {
                store.equips[currentPosition] = currentEquip.setEnhance(enhance);
            }
        });
    };

    render() {
        const { store } = this.props;
        const raw = this.cache.get(store.activeEquipNav) ?? [];
        const currentEquip = store.equips[store.activeEquipNav];
        return (
            <>
                <div className="label enhance">附魔</div>
                <SelectPicker
                    data={raw}
                    block
                    size="lg"
                    placeholder="选择附魔"
                    onOpen={this.handleUpdate}
                    labelKey="name"
                    valueKey="id"
                    disabled={!currentEquip}
                    virtualized={false}
                    searchable={false}
                    onSelect={this.setEnhance}
                    renderMenu={(menu) => {
                        if (raw.length === 0) {
                            return (
                                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    {' '}
                                    加载中...
                                </p>
                            );
                        }
                        return menu;
                    }}
                    // @ts-ignore
                    renderMenuItem={(label, item: SimpleEnhance) => (
                        <div className="equip-select-item" key={item.id}>
                            <div>
                                <b>{label}</b>
                            </div>
                            <div>
                                <i>{item.description}</i>
                            </div>
                        </div>
                    )}
                />
            </>
        );
    }
}
