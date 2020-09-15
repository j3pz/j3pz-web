import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StoreProps } from '../store';

@observer
export default class EquipNav extends Component<StoreProps> {
    render() {
        return (
            <div>
                test
            </div>
        );
    }
}
