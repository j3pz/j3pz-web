import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    ControlLabel, Form, FormControl, FormGroup, Panel, PanelGroup, Popover, Toggle, Whisper,
} from 'rsuite';
import { CaseService } from '../../service/case_service';
import { StoreProps } from '../../store';

interface CaseSettingsState {
    editingTitle: boolean;
}

@observer
export class CaseSettings extends Component<StoreProps, CaseSettingsState> {
    constructor(props) {
        super(props);
        this.state = {
            editingTitle: false,
        };
    }

    getImg = (level: number) => (level > 0 ? `0-${level}` : 'empty-slot');

    changeName = () => {
        const { store } = this.props;
        CaseService.changeCaseName(store.caseInfo.id, store.caseInfo.name);
    };

    render() {
        const { store } = this.props;
        const { editingTitle } = this.state;
        return (
            <PanelGroup accordion bordered style={{ maxWidth: 600 }}>
                <Panel header="方案设置" defaultExpanded>
                    <Form>
                        <FormGroup onClick={() => this.setState({ editingTitle: true })}>
                            <ControlLabel>方案名称</ControlLabel>
                            <FormControl
                                name="name"
                                disabled={!editingTitle}
                                onBlur={() => {
                                    this.setState({ editingTitle: false });
                                    this.changeName();
                                }}
                                onChange={(value) => { store.caseInfo.name = value; }}
                                value={store.caseInfo.name}
                                style={{ cursor: 'text' }}
                            />
                        </FormGroup>
                    </Form>
                </Panel>
                <Panel header="操作设置" defaultExpanded>
                    <div className="label">自动满精炼</div>
                    <Toggle
                        size="lg"
                        checked={store.settings.autoStrengthen}
                        onChange={(value) => {
                            store.settings.autoStrengthen = value;
                        }}
                    />
                    <div className="label">自动镶嵌</div>
                    <Whisper
                        trigger="click"
                        placement="right"
                        speaker={(
                            <Popover style={{ maxWidth: 200 }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8]
                                    .map((n) => (n === store.settings.autoEmbed ? 0 : n))
                                    .map((n) => (
                                        <img
                                            key={`embed-option-${n}`}
                                            alt={`五行石候选${n}级`}
                                            onClick={() => { store.settings.autoEmbed = n; }}
                                            className="embed-option"
                                            src={`https://images.j3pz.com/imgs/stones/${this.getImg(n)}.jpg`}
                                        />
                                    ))}
                            </Popover>
                                )}
                    >
                        <img
                            alt="五行石自动镶嵌"
                            className="embed-hole"
                            src={`https://images.j3pz.com/imgs/stones/${this.getImg(store.settings.autoEmbed)}.jpg`}
                        />
                    </Whisper>
                </Panel>
            </PanelGroup>
        );
    }
}