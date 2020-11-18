import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Button, Input, Panel } from 'rsuite';
import {
    KungFu, School, schoolAbbrMap, schoolKungfuMap,
} from '../model/base';
import { CaseService } from '../service/case_service';
import { schoolIcons } from '../utils/school_icon';
import '../components/new_case_guide/new_case_guide.less';
import '../css/icon.less';
import { report } from '../service/report_service';

interface NewCasePageState {
    step: number;
    school: null | School;
    kungfu: null | KungFu;
    name: string;
}

export default class NewCasePage extends Component<{}, NewCasePageState> {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            school: null,
            kungfu: null,
            name: '',
        };
    }

    next = (school: School) => {
        const kungfu = schoolKungfuMap[school]![0];
        this.setState({
            step: 2,
            school,
            kungfu,
            name: `${kungfu}配装`,
        });
    };

    changeKungfu = (kungfu: KungFu) => {
        this.setState({
            kungfu,
            name: `${kungfu}配装`,
        });
    };

    newCase = () => {
        let { name } = this.state;
        const { kungfu } = this.state;
        if (name === '') {
            name = `${kungfu}配装`;
        }
        CaseService.create(kungfu!, name).then((res) => {
            if (res) {
                navigate(`/app#${res.id}`);
            }
        });
        report('case.new', { kungfu, platform: 'web_mobile' });
    };

    render() {
        const {
            step, kungfu, school, name,
        } = this.state;
        return (
            <div style={{ padding: 24 }}>
                {step === 1 && <div className="label mobile">选择门派</div> }
                {step === 1 && Object.entries(schoolAbbrMap).map(([s, abbr]) => (
                    <Panel className="school-item mobile" bodyFill key={abbr}>
                        <div className="school" onClick={() => this.next(s as School)}>
                            <div>
                                <span className={`jx3icon jx3icon-${abbr}`} />
                                <span className="school-name">{s}</span>
                            </div>
                        </div>
                    </Panel>
                ))}

                {step === 2 && (
                    <div>
                        <div className="label mobile">心法</div>
                        <div className="kungfu">
                            {schoolKungfuMap[school!]?.map((kf: KungFu) => (
                                <div className="kungfu-item mobile" onClick={() => this.changeKungfu(kf)} key={kf}>
                                    <img src={`https://images.j3pz.com/imgs/school/${schoolIcons[kf]}.png`} alt={kf} />
                                    <span className={kf === kungfu ? 'active' : ''}>{kf}</span>
                                </div>
                            ))}
                        </div>
                        <div className="label mobile">方案名称</div>
                        <Input
                            style={{ marginTop: 12 }}
                            onChange={(value) => { this.setState({ name: value }); }}
                            value={name}
                            size="lg"
                        />
                    </div>
                )}
                {step === 2 && (
                    <Button appearance="primary" block style={{ marginTop: 24 }} size="lg" onClick={this.newCase}>创建方案</Button>
                )}
            </div>
        );
    }
}
