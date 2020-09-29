import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';
import { Footer } from '../components/footer/Footer';
import '../css/text.less';

const CreditPage = () => (
    <Main>
        <SEO title="致谢" />
        <Container component="section" style={{ paddingTop: 120 }}>
            <Row>
                <Col sm={12} md={8}>
                    <h3 className="label">致谢</h3>
                    <p className="lead-text">
                        剑网3配装器的开发离不开所有用户的鞭策与支持。
                    </p>
                    <p className="lead-text">
                        同时感谢 泠落、楚玄枫、沈大侠、空乘、若羽、甩葱歌 等高水平玩家对配装器提出的宝贵意见。
                    </p>
                    <p className="lead-text">
                        感谢
                        <span>花钧瓷</span>
                        为配装器设计的图标。
                    </p>
                    <p className="lead-text">
                        感谢前人总结的诸多公式，使配装器能够得以实现。
                    </p>
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Main>
);

export default CreditPage;
