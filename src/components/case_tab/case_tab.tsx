import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Container, Row } from 'react-grid-system';
import { TalentSelection } from '../talent_selection/talent_selection';
import { $store } from '../../store';

@observer
export class CaseTab extends Component {
    render() {
        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
                <TalentSelection store={$store} />
                <Container style={{ flex: 1, paddingTop: 12 }}>
                    <Row>
                        <Col sm={12} md={6}>
                            test
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
