import React, { Component, CSSProperties } from 'react';
import { observer } from 'mobx-react';
import {
    Button, Nav, Sidenav,
} from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { faCogs, faGripVertical, faPresentation } from '@fortawesome/pro-regular-svg-icons';
import { $store, StoreProps } from '../../store';
import { NewCaseGuide } from '../new_case_guide/new_case_guide';
import { CaseList } from './case_list';

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

interface DashboardProps {
    logged: boolean;
}

interface DashboardState {
    active: string;
    create: boolean;
}

@observer
export class Dashboard extends Component<StoreProps & DashboardProps, DashboardState> {
    constructor(props) {
        super(props);

        this.state = {
            active: 'cases',
            create: false,
        };
    }

    showNewCaseGuide = () => {
        this.setState({ create: true });
    };

    render() {
        const { active, create } = this.state;
        const { logged } = this.props;
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
                                <FontAwesomeIcon icon={faPlus} />
                                {'  '}
                                新配装方案
                            </Button>
                        </div>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={active}>
                            <Nav.Item
                                eventKey="cases"
                                icon={<FontAwesomeIcon icon={faGripVertical} style={iconStyle} />}
                            >
                                配装方案
                            </Nav.Item>
                            <Nav.Item
                                eventKey="published"
                                icon={<FontAwesomeIcon icon={faPresentation} style={iconStyle} />}
                            >
                                发布方案
                            </Nav.Item>
                            <Nav.Item
                                eventKey="settings"
                                icon={<FontAwesomeIcon icon={faCogs} style={iconStyle} />}
                            >
                                设置
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <div style={{ paddingTop: 120, flex: 1 }}>

                    { logged && active === 'cases' && <CaseList store={$store} /> }
                </div>
                <NewCaseGuide show={create} onClose={() => { this.setState({ create: false }); }} />
            </main>
        );
    }
}
