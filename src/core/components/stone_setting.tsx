import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TagPicker } from 'rsuite';
import { StoreProps } from '../store';
import { KungFu } from '../model/base';
import { StoreService } from '../service/stone_service';

interface StoneSettingState {
    tags: any[];
}

@observer
export class StoneSetting extends Component<StoreProps, StoneSettingState> {
    private currentKungfu: KungFu;

    constructor(props) {
        super(props);
        this.currentKungfu = props.store.kungfu;
        this.state = {
            tags: [],
        };
    }

    componentDidMount() {
        this.updateTags();
    }

    UNSAFE_componentWillReceiveProps(nextProps: StoreProps) {
        if (nextProps.store.kungfu !== this.currentKungfu) {
            this.currentKungfu = nextProps.store.kungfu;
            this.updateTags();
        }
    }

    updateTags() {
        StoreService.listTags(this.currentKungfu).then((tags) => {
            this.setState({ tags: tags.map((t) => t.attributes) });
        });
    }

    render() {
        const { store } = this.props;
        const { tags } = this.state;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip?.category !== 'primaryWeapon' && currentEquip?.category !== 'tertiaryWeapon') {
            return null;
        }
        return (
            <>
                <div className="label">五彩石镶嵌</div>
                <TagPicker data={tags} block labelKey="name" valueKey="name" placement="topStart" />
            </>
        );
    }
}
