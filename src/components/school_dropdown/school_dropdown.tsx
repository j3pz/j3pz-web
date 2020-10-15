import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Dropdown } from 'rsuite';
import { PrimaryAttribute } from '../../model/attribute';
import { GamingRole, KungFu, schoolAbbrMap } from '../../model/base';
import { KungFuInfo } from '../../model/kungfu';
import { Resource } from '../../model/resource';
import { KungFuService } from '../../service/kungfu_service';
import { StoreProps } from '../../store';
import '../../css/icon.less';
import './school_dropdown.less';

interface SchoolDropdownState {
    spunk: (KungFuInfo & { name: KungFu })[];
    spirit: (KungFuInfo & { name: KungFu })[];
    strength: (KungFuInfo & { name: KungFu })[];
    agility: (KungFuInfo & { name: KungFu })[];
    heal: (KungFuInfo & { name: KungFu })[];
    vitality: (KungFuInfo & { name: KungFu })[];
}

const kungfuTypes = {
    spunk: '元气输出心法',
    spirit: '根骨输出心法',
    strength: '力道输出心法',
    agility: '身法输出心法',
    heal: '治疗心法',
    vitality: '防御心法',
};

@observer
export class SchoolDropdown extends Component<StoreProps, SchoolDropdownState> {
    allKungFu: Resource<KungFuInfo>[] = [];

    constructor(props) {
        super(props);
        this.state = {
            spunk: [],
            spirit: [],
            strength: [],
            agility: [],
            heal: [],
            vitality: [],
        };
    }

    componentDidMount() {
        KungFuService.getKungFuList().then((res) => {
            this.allKungFu = res;
            this.updateKungFu(res);
        });
    }

    changeSchool = (value: KungFu) => {
        const { store } = this.props;
        store.kungfu = value;
    };

    getIcon = () => {
        const { store } = this.props;
        const kungFuInfo = this.allKungFu.find((info) => info.id === store.kungfu);
        if (kungFuInfo) return schoolAbbrMap[kungFuInfo.attributes.school];
        return '';
    };

    updateKungFu(kungfus: Resource<KungFuInfo>[]): void {
        const list: { [k in PrimaryAttribute | 'heal']: (KungFuInfo & { name: KungFu })[] } = {
            spunk: [],
            spirit: [],
            strength: [],
            agility: [],
            heal: [],
            vitality: [],
        };

        kungfus.forEach((kungfu) => {
            const info = { name: kungfu.id as KungFu, ...kungfu.attributes };
            if (kungfu.attributes.role === GamingRole.DAMAGE_DEALER) {
                list[kungfu.attributes.primaryAttribute].push(info);
            } else if (kungfu.attributes.role === GamingRole.HEALER) {
                list.heal.push(info);
            } else if (kungfu.attributes.role === GamingRole.TANK) {
                list.vitality.push(info);
            }
        });
        this.setState(list);
    }

    render() {
        const { store } = this.props;
        return (
            <Dropdown
                title={(
                    <div className={`kungfu-title ${store.equipNavExpanded ? 'expand' : ''}`}>
                        <i className={`jx3icon jx3icon-${this.getIcon()}`} />
                        <span>{store.kungfu}</span>
                    </div>
                )}
                placement="rightStart"
                activeKey={store.kungfu}
                onSelect={this.changeSchool}
                style={{ borderRight: '1px solid #CCCCCC' }}
            >
                {Object.entries(kungfuTypes).map(([type, title]) => (
                    <Dropdown.Menu key={type} title={title}>
                        {
                        // eslint-disable-next-line react/destructuring-assignment
                        this.state[type].map((kungfu) => (
                            <Dropdown.Item
                                eventKey={kungfu.name}
                                key={kungfu.name}
                            >
                                {kungfu.name}
                            </Dropdown.Item>
                        ))
                        }
                    </Dropdown.Menu>
                ))}
            </Dropdown>
        );
    }
}
