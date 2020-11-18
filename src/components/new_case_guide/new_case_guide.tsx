import React, { Component } from 'react';
import { navigate } from 'gatsby';
import {
    Button, Input, Modal, Panel,
} from 'rsuite';
import { KungFu, schoolAbbrMap, schoolKungfuMap } from '../../model/base';
import { schoolIcons } from '../../utils/school_icon';
import './new_case_guide.less';
import '../../css/icon.less';
import { CaseService } from '../../service/case_service';
import { report } from '../../service/report_service';

interface NewCaseGuideProps {
    show: boolean;
    onClose?: () => void;
}

interface NewCaseGuideState {
    step: number;
    kungfu: null | KungFu;
}

export class NewCaseGuide extends Component<NewCaseGuideProps, NewCaseGuideState> {
    name: string;
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            kungfu: null,
        };
        this.name = '';
    }

    onConfirm = () => {
        const { onClose = () => {} } = this.props;
        onClose();
    };

    next = (kungfu) => {
        this.setState({
            step: 2,
            kungfu,
        });
        this.name = `${kungfu}配装`;
    };

    newCase = () => {
        const { kungfu } = this.state;
        if (this.name === '') {
            this.name = `${kungfu}配装`;
        }
        CaseService.create(kungfu!, this.name).then((res) => {
            if (res) {
                navigate(`/app#${res.id}`);
            } else {
                this.onConfirm();
            }
        });
        report('case.new', { kungfu, platform: 'web_pc' });
    };

    render() {
        const { show, onClose = () => {} } = this.props;
        const { step, kungfu } = this.state;
        return (
            <Modal
                show={show}
                onHide={onClose}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>新配装方案</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {step === 1 && Object.entries(schoolAbbrMap).map(([school, abbr]) => (
                        <Panel className="school-item" bodyFill key={abbr}>
                            <div className="school">
                                <div>
                                    <span className={`jx3icon jx3icon-${abbr}`} />
                                    <span>{school}</span>
                                </div>
                            </div>
                            <div className="kungfu">
                                {schoolKungfuMap[school].map((kf: KungFu) => (
                                    <div className="kungfu-item" onClick={() => this.next(kf)} key={kf}>
                                        <img src={`https://images.j3pz.com/imgs/school/${schoolIcons[kf]}.png`} alt={kf} />
                                        <span>{kf}</span>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    ))}
                    {step === 2 && (
                        <div>
                            <div>方案名称</div>
                            <Input onChange={(value) => { this.name = value; }} defaultValue={`${kungfu}配装`} />
                        </div>
                    )}
                </Modal.Body>
                {step === 2 && (
                    <Modal.Footer>
                        <Button appearance="primary" onClick={this.newCase}>确认</Button>
                    </Modal.Footer>
                )}
            </Modal>
        );
    }
}
