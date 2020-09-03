import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Main from '../components/layouts/Main';
import SEO from '../components/seo';
import '../css/text.less';

const AboutPage = () => (
    <Main>
        <SEO title="关于这里 | 剑网3配装器" />
        <Container component="main" style={{ paddingTop: 120 }}>
            <Row>
                <Col xs={12} sm={8}>
                    <h3>剑网3 配装器</h3>
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
        </Container>
    </Main>
);

export default AboutPage;
