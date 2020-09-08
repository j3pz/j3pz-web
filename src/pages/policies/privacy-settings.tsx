import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Toggle } from 'rsuite';
import Policy from '../../components/layouts/Policy';
import Footer from '../../components/footer/Footer';
import SEO from '../../components/seo';

const PrivacySettingsPage = () => (
    <Policy>
        <SEO title="隐私设置" />
        <Container component="section">
            <h5 className="label">匿名统计</h5>
            <Row nogutter style={{ marginTop: 24, marginBottom: 24 }}>
                <Col xs={12} sm={8}>
                    允许配装器针对您的操作行为进行统计，收集技术参数，以帮助配装器更好。
                    所有的统计信息都是匿名的。
                </Col>
                <Col xs={12} sm={4} style={{ textAlign: 'end' }}>
                    <Toggle size="lg" />
                </Col>
            </Row>
            <h5 className="label">本地存储</h5>
            <Row nogutter style={{ marginTop: 24 }}>
                <Col xs={12} sm={8}>
                    允许配装器在您的浏览器中存储一些信息来帮助配装器在您下次访问时识别您。
                    例如登录状态、本地偏好设置等。
                </Col>
                <Col xs={12} sm={4} style={{ textAlign: 'end' }}>
                    <Toggle size="lg" />
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Policy>
);

export default PrivacySettingsPage;
