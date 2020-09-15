import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Sidenav, Nav } from 'rsuite';
import { StoreProps } from '../store';

@observer
export default class EquipNav extends Component<StoreProps> {
    render() {
        const { store } = this.props;
        return (
            <div style={{ width: store.equipNavExpanded ? 240 : 64, height: '100%' }}>
                <Sidenav appearance="inverse">
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1">
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2">
                                User Group
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}
