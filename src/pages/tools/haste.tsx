import React, { Component } from 'react';
import {
    Radio, RadioGroup, InputNumber, List, FlexboxGrid, Form, ControlLabel, HelpBlock,
} from 'rsuite';
import { Container, Row, Col } from 'react-grid-system';
import Tools from '../../components/layouts/Tools';
import SEO from '../../components/seo';
import Card from '../../components/ui/Card';

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

    private handleSkillTimeChange = (value: number | string) => {
        this.setState({ skillTime: +value });
    };

    private handleHitTimesChange = (value: number | string) => {
        this.setState({ hitTimes: +value });
    };

    private handleExtraChange = (value: number) => {
        this.setState({ extra: value });
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
                <Container fluid style={{ margin: 0 }}>
                    <Row>
                        <Col lg={4} md={6} sm={12} style={{ paddingTop: 24 }}>
                            <Card>
                                <Form fluid>
                                    <h4 className="label">技能设定</h4>
                                    <ControlLabel htmlFor="skill-time">技能时间(秒)</ControlLabel>
                                    <InputNumber
                                        id="skill-time"
                                        value={skillTime}
                                        onChange={this.handleSkillTimeChange}
                                        step={0.5}
                                        min={0.5}
                                    />
                                    <HelpBlock>表示技能正读条时间，或持续性伤害技能的每跳时间，或引导读条的每跳时间</HelpBlock>
                                    <ControlLabel htmlFor="hit-times">跳数</ControlLabel>
                                    <InputNumber
                                        id="hit-times"
                                        value={hitTimes}
                                        onChange={this.handleHitTimesChange}
                                        step={1}
                                        min={1}
                                    />
                                    <HelpBlock>表示相应技能跳数，正读条为 1 跳，引导读条为造成伤害的次数。</HelpBlock>
                                </Form>
                            </Card>
                            <Card style={{ marginTop: 24 }}>
                                <h4 className="label">额外加速奇穴</h4>
                                <RadioGroup
                                    name="extra"
                                    onChange={this.handleExtraChange}
                                    value={extra}
                                >
                                    <ControlLabel htmlFor="skill-time">选择可以额外提供加速的奇穴</ControlLabel>
                                    <Radio value={0}>无</Radio>
                                    <Radio value={31 * 3}>心剑两忘【纯阳】</Radio>
                                    <Radio value={30 * 2}>梦歌【万花】</Radio>
                                    <Radio value={10 * 5}>枕上【七秀】</Radio>
                                    <Radio value={21 * 5}>妙镜惊寂【明教】</Radio>
                                    <Radio value={51}>凝绝【长歌】</Radio>
                                    <Radio value={82}>如风【藏剑】</Radio>
                                </RadioGroup>
                            </Card>
                        </Col>
                        <Col lg={8} md={6} sm={12} style={{ paddingTop: 24 }}>
                            <Card>
                                <h4 className="label">计算结果</h4>
                                <List hover style={{ marginTop: 12 }}>
                                    <List.Item>
                                        <FlexboxGrid style={{ fontWeight: 700 }}>
                                            <FlexboxGrid.Item colspan={8}>读条时间(秒)</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={8}>所需加速率</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={8} style={{ textAlign: 'right' }}>
                                                所需加速等级
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </List.Item>
                                    {results.map((step) => (
                                        <List.Item key={step.duration}>
                                            <FlexboxGrid>
                                                <FlexboxGrid.Item colspan={8}>
                                                    {step.duration}
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={8}>
                                                    {step.percentage}
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={8} style={{ textAlign: 'right' }}>
                                                    {step.level}
                                                </FlexboxGrid.Item>
                                            </FlexboxGrid>
                                        </List.Item>
                                    ))}
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Tools>
        );
    }
}
