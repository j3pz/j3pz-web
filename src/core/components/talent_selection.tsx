import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    Nav, Popover, Sidenav, Tooltip, Whisper,
} from 'rsuite';
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
            icon: 1434,
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
                                    <Whisper
                                        key={`talent-${selected.id}`}
                                        trigger={['hover', 'focus']}
                                        enterable
                                        speaker={(
                                            <Popover>
                                                <div className="talent-options">
                                                    {talent.map((t) => (
                                                        <div key={`option-${t.id}`} className="talent-option">
                                                            <Whisper
                                                                placement="top"
                                                                trigger={['focus', 'hover']}
                                                                speaker={<Tooltip>{t.description}</Tooltip>}
                                                            >
                                                                <img
                                                                    className="option-talent-icon"
                                                                    src={`https://icons.j3pz.com/${t.icon}.png`}
                                                                    alt={t.name}
                                                                />
                                                            </Whisper>
                                                            <div>{t.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Popover>
                                            )}
                                    >
                                        <Nav.Item>
                                            <img
                                                className="selected-talent-icon"
                                                src={`https://icons.j3pz.com/${selected.icon}.png`}
                                                alt={selected.name}
                                            />
                                            <div className="talent-selection">
                                                <div className="talent-name">{selected.name}</div>
                                                <div className="talent-desc">{selected.description}</div>

                                            </div>
                                        </Nav.Item>
                                    </Whisper>
                                );
                            })}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
    }
}
