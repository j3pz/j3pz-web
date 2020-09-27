import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Nav, Sidenav } from 'rsuite';
import { Col, Container, Row } from 'react-grid-system';
import { Lambda, observe } from 'mobx';
import $store, { StoreProps } from '../store';
import TalentService from '../service/talent_service';
import Talent from '../model/talent';
import './talent_selection.less';

interface TalentSelectionState {
    talents: Talent[][];
}

@observer
export default class TalentSelection extends Component<StoreProps, TalentSelectionState> {
    private disposer: Lambda;
    constructor(props) {
        super(props);
        const defaultTalent = Talent.fromJson({
            id: 0,
            kungfu: props.store.kungfu,
            name: '',
            description: '',
            icon: 0,
            version: '0',
        });
        this.state = {
            talents: Array.from({ length: 12 }).map((_, i) => [defaultTalent.setIndex(i)]),
        };
    }

    componentDidMount() {
        this.updateTalents();
        this.disposer = observe($store, 'kungfu', this.updateTalents);
    }

    componentWillUnmount() {
        this.disposer();
    }

    updateTalents = () => {
        const { store } = this.props;
        TalentService.listTalent(store.kungfu).then((talents) => {
            this.setState({
                talents: talents.map((t) => t.attributes)
                    .reduce((acc, t) => {
                        if (acc[t.index]) {
                            acc[t.index].push(t);
                        } else {
                            acc[t.index] = [t];
                        }
                        return acc;
                    }, [] as Talent[][]),
            });
        });
    };

    render() {
        const { store } = this.props;
        const { talents } = this.state;
        return (
            <div style={{ width: store.equipNavExpanded ? 240 : 64, height: '100%' }}>
                <Sidenav style={{ height: '100%', overflow: 'auto' }}>
                    <Sidenav.Body>
                        <Nav>
                            {talents.map((talent, i) => {
                                const idx = talent.indexOf(store.talents[i]);
                                const selected = talent[Math.max(0, idx)];
                                return (
                                    <Nav.Item>
                                        <img
                                            className="selected-talent-icon"
                                            src={`https://icons.j3pz.com/${selected.icon}.png`}
                                            alt={selected.name}
                                        />
                                        <Container className="talent-selection">
                                            <div>{selected.name}</div>
                                            <Row>
                                                {talent.map((t) => (
                                                    <Col key={`option-${t.id}`}>
                                                        <img
                                                            className="option-talent-icon"
                                                            src={`https://icons.j3pz.com/${t.icon}.png`}
                                                            alt={t.name}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}
