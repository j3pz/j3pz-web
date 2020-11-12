import React, { ReactNode } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Timeline } from 'rsuite';
import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';
import { Footer } from '../components/footer/Footer';
import '../css/text.less';
import '../css/about.less';

const TimelineItem = ({ desc, date }: { desc: ReactNode; date: string }) => (
    <Timeline.Item>
        <p className="timeline-desc">{desc}</p>
        <p className="timeline-date">{date}</p>
    </Timeline.Item>
);
/* eslint-disable react/jsx-one-expression-per-line */
const AboutPage = () => (
    <Main className="">
        <SEO title="关于这里" />
        <Container component="section" style={{ paddingTop: 120, width: '100%' }}>
            <Row>
                <Col sm={12} md={8}>
                    <h3 className="label">剑网3 配装器</h3>
                    <p className="lead-text">
                        剑网 3 配装器是由玩家胖叔叔开发，用于剑网3游戏配装的游戏辅助工具。
                        侠士可在选定心法后，针对该心法选择装备，并对装备进行精炼、镶嵌等各项操作，
                        完美模拟游戏角色的配装过程，并计算出游戏角色的预期属性。
                    </p>
                    <p className="lead-text">
                        剑网 3 配装器开发者与西山居或剑网 3 官方无任何关系。
                    </p>
                    <p className="lead-text">
                        剑网 3 配装器于 2013 年 10 月开始设计，并得到了万花谷诸多有识之士的建议和帮助。
                        于 2013 年 10 月 27 日正式上线。
                    </p>
                </Col>
            </Row>
            <h4 style={{ textAlign: 'center', margin: 24 }} className="label">配装器大事记</h4>
            <Timeline align="alternate">
                <TimelineItem desc={<>配装器日活跃用户数突破<span>25, 000</span>。</>} date="2017 年 4 月 21 日" />
                <TimelineItem desc={<>配装器上线<span>三周年</span>。</>} date="2016 年 10 月 27 日" />
                <TimelineItem desc={<>配装器<span>3.0 版本</span>上线，全新界面，支持霸刀。</>} date="2016 年 10 月 17 日" />
                <TimelineItem desc={<>新产品<span>万花输出循环模拟器</span>问世</>} date="2015 年 12 月 31 日" />
                <TimelineItem desc={<>配装器上线<span>两周年</span>，支持长歌门。</>} date="2015 年 10 月 26 日" />
                <TimelineItem desc={<>配装器<span>2.1 版本</span>上线，支持手机配装、增益气劲等诸多功能</>} date="2015 年 8 月 28 日" />
                <TimelineItem desc={<>配装器月活跃用户数突破<span>200, 000</span>。</>} date="2015 年 6 月 24 日" />
                <TimelineItem desc={<>配装器日活跃用户数突破<span>20, 000</span>。</>} date="2015 年 4 月 28 日" />
                <TimelineItem desc={<>配装器月活跃用户数突破<span>100, 000</span>。</>} date="2014 年 12 月 8 日" />
                <TimelineItem desc={<>配装器日活跃用户数突破<span>10, 000</span>。</>} date="2014 年 12 月 1 日" />
                <TimelineItem desc={<>配装器启用新域名<span>j3pz.com</span></>} date="2014 年 9 月 24 日" />
                <TimelineItem desc={<>配装器<span>2.0 版本</span>上线，采用了更现代的界面，更丰富的交互手法，支持套装特效。</>} date="2014 年 8 月 9 日" />
                <TimelineItem desc={<>配装器日活跃用户数突破<span>5, 000</span>。</>} date="2014 年 5 月 15 日" />
                <TimelineItem desc={<>配装器月活跃用户数突破<span>50, 000</span>。</>} date="2014 年 5 月 1 日" />
                <TimelineItem desc={<>配装器正式支持防御心法，完成全心法支持。</>} date="2014 年 2 月 20 日" />
                <TimelineItem desc={<>配装器支持治疗心法。</>} date="2013 年 11 月 28 日" />
                <TimelineItem desc={<>配装器支持外功心法。</>} date="2013 年 11 月 12 日" />
                <TimelineItem desc={<>配装器<span>1.0 版本</span>正式上线，支持四大元气心法。</>} date="2013 年 10 月 27 日" />
            </Timeline>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Main>
);

export default AboutPage;
