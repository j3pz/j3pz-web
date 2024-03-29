import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Container, Row } from 'react-grid-system';
import { Panel, PanelGroup } from 'rsuite';
import { TalentSelection } from '../talent_selection/talent_selection';
import { BuildingState } from '../empty_states/building';
import { $store } from '../../store';
import { CaseSettings } from '../case_settings/case_settings';
import { TalentRecommends } from '../talent_recommends/talent_recommends';
import { PlatformUtil } from '../../utils/platform_utils';

@observer
export class CaseTab extends Component {
    render() {
        const isMobile = PlatformUtil.isMobile();
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <TalentSelection store={$store} />
                <Container style={{ flex: 1, paddingTop: 12, paddingBottom: isMobile ? 24 : 0 }}>
                    <Row>
                        <Col sm={12} md={6}>
                            <PanelGroup bordered accordion>
                                <Panel header="推荐奇穴" defaultExpanded>
                                    <TalentRecommends store={$store} />
                                </Panel>
                                {!isMobile && (
                                <Panel header="阵法">
                                    <BuildingState />
                                </Panel>
                                )}
                                {!isMobile && (
                                <Panel header="小吃小药">
                                    <BuildingState />
                                </Panel>
                                )}
                            </PanelGroup>
                        </Col>
                        <Col sm={12} md={6}>
                            <CaseSettings store={$store} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
