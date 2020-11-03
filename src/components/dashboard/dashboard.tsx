import React, { Component, CSSProperties } from 'react';
import { observer } from 'mobx-react';
import { navigate } from 'gatsby';
import {
    Button, FlexboxGrid, IconButton, Nav, Sidenav,
} from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { faCogs, faGripHorizontal, faGripVertical } from '@fortawesome/pro-regular-svg-icons';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { $store, StoreProps } from '../../store';
import { NewCaseGuide } from '../new_case_guide/new_case_guide';
import { CaseList } from './case_list';
import { UserSettings } from './user_settings';
import { PlatformUtil } from '../../utils/platform_utils';
import '../../css/bottom-bar.less';

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
        if (PlatformUtil.isMobile()) {
            navigate('/new');
        } else {
            this.setState({ create: true });
        }
    };

    render() {
        const { active, create } = this.state;
        const { logged, store } = this.props;
        const isMobile = PlatformUtil.isMobile();
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
                { !isMobile && (
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
                            {/* <Nav.Item
                                eventKey="published"
                                icon={<FontAwesomeIcon icon={faPresentation} style={iconStyle} />}
                            >
                                发布方案
                            </Nav.Item> */}
                            <Nav.Item
                                eventKey="settings"
                                icon={<FontAwesomeIcon icon={faCogs} style={iconStyle} />}
                            >
                                个人设置
                                {!store.user?.activate ? '(待激活)' : ''}
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                )}

                { isMobile && (
                    <FlexboxGrid className="bottom-bar" justify="space-around">
                        <FlexboxGridItem>
                            <div
                                className={`bottom-bar-item ${active === 'cases' ? 'active' : ''}`}
                                onClick={() => { this.setState({ active: 'cases' }); }}
                            >
                                <FontAwesomeIcon icon={faGripHorizontal} size="2x" />
                                <span>配装方案</span>
                            </div>
                        </FlexboxGridItem>
                        <FlexboxGridItem>
                            <IconButton
                                icon={<FontAwesomeIcon icon={faPlus} size="2x" />}
                                circle
                                size="lg"
                                appearance="primary"
                                className="new-case"
                                onClick={this.showNewCaseGuide}
                            />
                        </FlexboxGridItem>
                        <FlexboxGridItem>
                            <div
                                className={`bottom-bar-item ${active === 'settings' ? 'active' : ''}`}
                                onClick={() => { this.setState({ active: 'settings' }); }}
                            >
                                <FontAwesomeIcon icon={faCogs} size="2x" />
                                <span>个人设置</span>
                            </div>
                        </FlexboxGridItem>
                    </FlexboxGrid>
                )}
                <div style={{ paddingTop: isMobile ? 64 : 120, flex: 1 }}>
                    { logged && active === 'cases' && <CaseList store={$store} /> }
                    { logged && active === 'settings' && <UserSettings store={$store} /> }
                </div>
                <NewCaseGuide show={create} onClose={() => { this.setState({ create: false }); }} />
            </main>
        );
    }
}
