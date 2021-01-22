import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Footer } from '../components/footer/Footer';
import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';

const IntroPage = () => (
    <Main>
        <SEO title="使用说明" />
        <Container component="section" style={{ width: '100%' }}>
            <Row>
                <Col sm={12} md={8}>
                    <h1>大侠请稍等，作者正在努力撰写本文</h1>
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Main>
);

export default IntroPage;
