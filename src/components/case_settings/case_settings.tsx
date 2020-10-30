import { transaction } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Alert,
    Button,
    ControlLabel, Form, FormControl, FormGroup, Panel, PanelGroup, Popover, Toggle, Whisper,
} from 'rsuite';
import { CaseService } from '../../service/case_service';
import { EmbedService } from '../../service/embed_service';
import { PreferenceService } from '../../service/preference_service';
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
        CaseService.changeCaseName(store.caseInfo.id, store.caseInfo.name).then((res) => {
            if (res) {
                Alert.success('更名成功');
            }
        });
    };

    setStrenthenForAll = () => {
        const { store } = this.props;
        transaction(() => {
            Object.entries(store.equips).forEach(([key, equip]) => {
                store.equips[key] = equip?.setStrengthLevel(equip.strengthen);
            });
            Alert.success('精炼已完成');
        });
    };

    embedAll = () => {
        const { store } = this.props;
        transaction(() => {
            Object.entries(store.equips).forEach(([key, equip]) => {
                [0, 1, 2].forEach((n) => {
                    if ((equip?.embedding[n]?.level ?? 0) < store.settings.autoEmbed) {
                        store.equips[key] = store.equips[key]?.setEmbed(n, store.settings.autoEmbed);
                    }
                });
            });
            EmbedService.update(store);
            Alert.success('精炼已完成');
        });
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
                            PreferenceService.update({ strengthen: value });
                        }}
                    />
                    <Button
                        onClick={this.setStrenthenForAll}
                        style={{ marginLeft: 12 }}
                        appearance="ghost"
                        size="sm"
                    >
                        全部满精炼
                    </Button>
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
                                            onClick={() => {
                                                store.settings.autoEmbed = n;
                                                PreferenceService.update({ magicStoneLevel: n });
                                            }}
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
                    <Button
                        onClick={this.embedAll}
                        style={{ marginLeft: 12 }}
                        appearance="ghost"
                        size="sm"
                    >
                        全部镶嵌
                    </Button>
                </Panel>
            </PanelGroup>
        );
    }
}
