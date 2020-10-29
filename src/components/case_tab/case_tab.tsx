import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Container, Row } from 'react-grid-system';
import { TalentSelection } from '../talent_selection/talent_selection';
import { BuildingState } from '../empty_states/building';
import { $store } from '../../store';
import { CaseSettings } from '../case_settings/case_settings';
import { Panel, PanelGroup } from 'rsuite';

@observer
export class CaseTab extends Component {
    render() {
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <TalentSelection store={$store} />
                <Container style={{ flex: 1, paddingTop: 12 }}>
                    <Row>
                        <Col sm={12} md={6}>
                            <PanelGroup>
                                <Panel header="阵法">
                                    <BuildingState />
                                </Panel>
                                <Panel header="小吃小药">
                                    <BuildingState />
                                </Panel>
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
