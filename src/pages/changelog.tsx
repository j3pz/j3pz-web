import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';

const NotFoundPage = () => (
    <Main>
        <SEO title="版本更新记录" />
        <Container component="section" style={{ paddingTop: 120 }}>
            <Row>
                <Col sm={12} md={8}>
                    <h1>2020-10-29 4.0.0</h1>
                    <p>新门派、新等级、新装备、新配装器！</p>
                    <p>1、配装器 UI 大幅更新</p>
                    <p>2、取消了所有收费项目，所有人都可以免费保存方案。</p>
                    <p>3、修正了少数几个属性的计算误差，包括装分、气血上限等。</p>
                    <p>4、配装方案中增加奇穴搭配，同时奇穴自带的属性效果也会自动计算。</p>
                    <p>5、我们不再歧视 PVP，PVP 装备将会默认展示在装备列表里。</p>
                    <p>6、增加了全部属性展示的功能。</p>
                    <p>7、换了方案图的样子，可以高清下载了。</p>
                    <p>8、更新了五行石和五彩石的选择交互，应该会更方便和友好一些。</p>
                </Col>
            </Row>
        </Container>
    </Main>
);

export default NotFoundPage;
