import React, { Component, CSSProperties } from 'react';
import { observer } from 'mobx-react';
import {
    Button, Nav, Sidenav,
} from 'rsuite';
import { StoreProps } from '../store';

const iconStyle: CSSProperties = {
    position: 'absolute',
    left: 20,
    top: 15,
    lineHeight: 1.245,
    marginRight: 20,
    fontSize: 16,
    textAlign: 'center',
    width: 16,
};

interface DashboardState {
    active: string;
}

@observer
export class Dashboard extends Component<StoreProps, DashboardState> {
    constructor(props) {
        super(props);

        this.state = {
            active: 'cases',
        };
    }

    showNewCaseGuide = () => {

    };

    render() {
        return (
            <main
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                }}
            >
                <Sidenav
                    appearance="default"
                    style={{ width: 240, height: '100%', borderRight: '1px solid #cccccc' }}
                    onSelect={(v) => { this.setState({ active: v }); }}
                >
                    <Sidenav.Header>
                        <div style={{ padding: 24, margin: '8 0' }}>
                            <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" style={{ width: 48 }} />
                            <Button
                                block
                                size="lg"
                                style={{ marginTop: 48 }}
                                appearance="primary"
                                onClick={this.showNewCaseGuide}
                            >
                                <i className="fas fa-plus" />
                                {'  '}
                                新配装方案
                            </Button>
                        </div>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={this.state.active}>
                            <Nav.Item
                                eventKey="cases"
                                icon={<i className="far fa-grip-vertical" style={iconStyle} />}
                            >
                                配装方案
                            </Nav.Item>
                            <Nav.Item
                                eventKey="published"
                                icon={<i className="far fa-presentation" style={iconStyle} />}
                            >
                                发布方案
                            </Nav.Item>
                            <Nav.Item
                                eventKey="settings"
                                icon={<i className="far fa-cogs" style={iconStyle} />}
                            >
                                设置
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </main>
        );
    }
}
