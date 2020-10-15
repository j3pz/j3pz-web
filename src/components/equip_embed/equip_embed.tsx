import { transaction } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Popover, Whisper } from 'rsuite';
import { EmbedService } from '../../service/embed_service';
import { StoreProps } from '../../store';
import './equip_embed.less';

@observer
export class EquipEmbed extends Component<StoreProps> {
    getImg = (level: number) => (level > 0 ? `0-${level}` : 'empty-slot');

    setEmbed = (idx: number, level: number) => {
        const { store } = this.props;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip) {
            transaction(() => {
                store.equips[store.activeEquipNav] = currentEquip.setEmbed(idx, level);
                EmbedService.update(store);
            });
        }
    };

    render() {
        const { store } = this.props;
        const currentEquip = store.equips[store.activeEquipNav];
        return (
            <>
                <div className="label">五行石镶嵌</div>
                <div className="holes">
                    {currentEquip?.embedding.map((ops, i) => {
                        const level = ops?.level ?? 0;
                        const img = this.getImg(level);

                        return (
                            <Whisper
                                key={`embed-${i}`}
                                trigger="click"
                                placement="top"
                                speaker={(
                                    <Popover style={{ maxWidth: 200 }}>
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8]
                                            .filter((n) => n !== level)
                                            .map((n) => (
                                                <img
                                                    key={`embed-option-${n}`}
                                                    alt={`五行石候选${n}级`}
                                                    onClick={() => this.setEmbed(i, n)}
                                                    className="embed-option"
                                                    src={`https://images.j3pz.com/imgs/stones/${this.getImg(n)}.jpg`}
                                                />
                                            ))}
                                    </Popover>
                                )}
                            >
                                <img
                                    alt={`五行石镶嵌孔${i}`}
                                    className="embed-hole"
                                    src={`https://images.j3pz.com/imgs/stones/${img}.jpg`}
                                />
                            </Whisper>
                        );
                    })}
                </div>
            </>
        );
    }
}
