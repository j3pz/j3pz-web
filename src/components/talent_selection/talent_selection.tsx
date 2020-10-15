import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Nav, Sidenav } from 'rsuite';
import { Lambda, observe } from 'mobx';
import { $store, StoreProps } from '../store';
import { TalentService } from '../../service/talent_service';
import { Talent } from '../model/talent';
import './talent_selection.less';
import { TalentOptions } from './talent_options';

interface TalentSelectionState {
    talents: Talent[][];
}

@observer
export class TalentSelection extends Component<StoreProps, TalentSelectionState> {
    private disposer: Lambda;
    constructor(props) {
        super(props);
        this.state = {
            talents: Array.from({ length: 12 })
                .map((_, i) => [Talent.emptyTalent(props.store.kungfu).setIndex(i)]),
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
                        const idx = t.index - 1;
                        if (acc[idx]) {
                            acc[idx].push(t);
                        } else {
                            acc[idx] = [t];
                        }
                        return acc;
                    }, [] as Talent[][]),
            });
        });
    };

    selectTalent(idx: number, talent: Talent) {
        const { store } = this.props;
        store.talents[idx] = talent;
    }

    render() {
        const { store } = this.props;
        const { talents } = this.state;
        return (
            <div style={{ width: store.equipNavExpanded ? 240 : 64, height: '100%' }}>
                <Sidenav style={{ height: '100%', overflow: 'auto', borderRight: '1px solid #CCCCCC' }} appearance="subtle">
                    <Sidenav.Body>
                        <Nav>
                            {talents.map((talent, i) => {
                                const idx = Math.max(0, talent.findIndex((t) => t.id === store.talents[i].id));
                                return (
                                    <TalentOptions
                                        idx={idx}
                                        talents={talent}
                                        key={`talent-${talent[idx].id}`}
                                        onChange={(t) => {
                                            this.selectTalent(i, t);
                                        }}
                                    />
                                );
                            })}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}
