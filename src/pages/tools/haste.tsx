import React, { Component, FormEvent } from 'react';
import {
    Card, Elevation, FormGroup, NumericInput, RadioGroup, Radio, HTMLTable,
} from '@blueprintjs/core';
import { Container, Row, Col } from 'react-grid-system';
import Tools from '../../components/layouts/Tools';
import SEO from '../../components/seo';
import Footer from '../../components/footer/Footer';
import '../../css/haste.scss';

interface HastePageState {
    skillTime: number;
    hitTimes: number;
    extra: number;
}

interface HasteResult {
    duration: string;
    percentage: string;
    level: number;
}

export default class HastePage extends Component<{}, HastePageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            skillTime: 1.5,
            hitTimes: 1,
            extra: 0,
        };
    }

    private handleSkillTimeChange = (value: number) => {
        this.setState({ skillTime: value });
    };

    private handleHitTimesChange = (value: number) => {
        this.setState({ hitTimes: value });
    };

    private handleExtraChange = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ extra: parseInt(event.currentTarget.value, 10) });
    };

    private getHaste = (): HasteResult[] => {
        const results: HasteResult[] = [];
        const { skillTime, hitTimes, extra } = this.state;
        const skillFrame = Math.ceil(skillTime / 0.0625);
        let hastePercent = 0;
        let hastePercentLimit = 0;
        let level = 0;
        let lastTime = (Number(skillTime) + 0.1).toFixed(2);
        const hasteCof = 188.309;
        for (let i = 0; hastePercentLimit < 25; i += 1) {
            const baseHaste = (i / hasteCof) * 10.24;
            const totalHaste = Math.floor(baseHaste) + Math.floor(extra);
            const nowFrame = Math.floor((skillFrame * 1024) / (totalHaste + 1024));
            hastePercent = i / hasteCof;
            hastePercentLimit = i / hasteCof + extra / 10.24;
            if (nowFrame <= skillFrame - level) {
                const nowTime = (nowFrame * 0.0625 * Number(hitTimes)).toFixed(2);
                if (nowTime !== lastTime) {
                    lastTime = nowTime;
                    const result = {
                        duration: nowTime,
                        percentage: hastePercent.toFixed(2),
                        level: i,
                    };
                    results.push(result);
                    level += 1;
                }
            }
        }
        return results;
    };

    render() {
        const { skillTime, hitTimes, extra } = this.state;
        const results = this.getHaste();
        return (
            <Tools>
                <SEO title="剑网3配装器 | 加速宝典" />
                <Container fluid>
                    <Row>
                        <Col lg={4} md={6} sm={12} style={{ paddingTop: 24 }}>
                            <Card elevation={Elevation.TWO}>
                                <h4 className="label">技能设定</h4>
                                <FormGroup
                                    helperText="表示技能正读条时间，或持续性伤害技能的每跳时间，或引导读条的每跳时间"
                                    label="技能时间(秒)"
                                    labelFor="skill-time"
                                >
                                    <NumericInput
                                        id="skill-time"
                                        value={skillTime}
                                        onValueChange={this.handleSkillTimeChange}
                                        stepSize={0.5}
                                        majorStepSize={1}
                                    />
                                </FormGroup>
                                <FormGroup
                                    helperText="表示相应技能跳数，正读条为 1 跳，引导读条为造成伤害的次数。"
                                    label="跳数"
                                    labelFor="hit-times"
                                >
                                    <NumericInput
                                        id="hit-times"
                                        value={hitTimes}
                                        onValueChange={this.handleHitTimesChange}
                                        majorStepSize={5}
                                    />
                                </FormGroup>
                            </Card>
                            <Card elevation={Elevation.TWO} style={{ marginTop: 24 }}>
                                <h4 className="label">额外加速奇穴</h4>
                                <RadioGroup
                                    label="选择可以额外提供加速的奇穴"
                                    onChange={this.handleExtraChange}
                                    selectedValue={extra}
                                >
                                    <Radio label="无" value={0} />
                                    <Radio label="心剑两忘【纯阳】" value={31 * 3} />
                                    <Radio label="梦歌【万花】" value={30 * 2} />
                                    <Radio label="枕上【七秀】" value={10 * 5} />
                                    <Radio label="妙镜惊寂【明教】" value={21 * 5} />
                                    <Radio label="凝绝【长歌】" value={51} />
                                    <Radio label="如风【藏剑】" value={82} />
                                </RadioGroup>
                            </Card>
                        </Col>
                        <Col lg={8} md={6} sm={12} style={{ paddingTop: 24 }}>
                            <Card elevation={Elevation.TWO}>
                                <h4 className="label">计算结果</h4>
                                <HTMLTable interactive>
                                    <thead>
                                        <tr>
                                            <td>实际读条时间(秒)</td>
                                            <td>所需加速率</td>
                                            <td>所需加速等级</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((step) => (
                                            <tr key={step.duration}>
                                                <td>{step.duration}</td>
                                                <td>{step.percentage}</td>
                                                <td>{step.level}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </HTMLTable>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </Tools>
        );
    }
}
