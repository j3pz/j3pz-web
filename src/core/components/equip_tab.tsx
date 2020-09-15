import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EquipNav from './equip_nav';
import $store from '../store';

@observer
export default class EquipTab extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <EquipNav store={$store} />
            </div>
        );
    }
}
