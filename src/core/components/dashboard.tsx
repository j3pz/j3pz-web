import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Button, Dropdown, Icon, Nav, Sidenav,
} from 'rsuite';
import { StoreProps } from '../store';

@observer
export class Dashboard extends Component<StoreProps> {
    render() {
        return (
            <Sidenav appearance="subtle">
                <Sidenav.Header>
                    <div style={{ padding: 24, margin: '8 0', width: 200 }}>
                        <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" style={{ width: 48 }} />
                        <Button block size="lg" style={{ marginTop: 60 }} appearance="primary">
                            <i className="fas fa-plus" />
                            {' '}
                            新配装方案
                        </Button>
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>Dashboard</Nav.Item>
                        <Nav.Item eventKey="2" icon={<Icon icon="group" />}>User Group</Nav.Item>
                        <Dropdown eventKey="3" title="Advanced" icon={<Icon icon="magic" />}>
                            <Dropdown.Item divider />
                            <Dropdown.Item panel style={{}}>
                                Reports
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                            <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                            <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                            <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                            <Dropdown.Item divider />
                            <Dropdown.Item panel style={{}}>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                            <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                            <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                            <Dropdown.Menu eventKey="4-5" title="Custom Action">
                                <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                                <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        );
    }
}
