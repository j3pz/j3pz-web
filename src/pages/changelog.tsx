import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Footer } from '../components/footer/Footer';
import { Main } from '../components/layouts/Main';
import { SEO } from '../components/seo';
import '../css/changelog.less';

const NotFoundPage = () => (
    <Main>
        <SEO title="版本更新记录" />
        <Container component="section" style={{ width: '100%' }}>
            <Row>
                <Col sm={12} md={10} offset={{ md: 1 }}>
                    <h3 className="label">更新记录</h3>
                    <div className="changelog-item">
                        <h4>2020-11-19 v4.0.3</h4>
                        <p>1、增加另存为功能</p>
                        <p>2、修复输出心法看不到体质附魔的问题</p>
                    </div>
                    <div className="changelog-item">
                        <h4>2020-11-12 v4.0.2</h4>
                        <p>1、增加导出为 JSON/CSV 的功能</p>
                        <p>2、修复部分心法属性计算错误问题</p>
                        <p>3、修复藏剑装分计算错误问题</p>
                        <p>4、修复五彩石阴阳会心属性与阳性会心属性错误问题</p>
                        <p>5、加速宝典增加五毒冰丝</p>
                        <p>6、加速宝典增加破招阈值</p>
                    </div>
                    <div className="changelog-item">
                        <h4>2020-11-05 v4.0.1</h4>
                        <p>1、调整方案图表现形式</p>
                        <p>2、调整五彩石选择器的交互形式</p>
                        <p>3、增加奇穴推荐</p>
                        <p>4、大量除虫</p>
                    </div>
                    <div className="changelog-item">
                        <h4>2020-10-29 v4.0.0</h4>
                        <p>新门派、新等级、新装备、新配装器！</p>
                        <p>1、配装器 UI 大幅更新</p>
                        <p>2、取消了所有收费项目，所有人都可以免费保存方案。</p>
                        <p>3、修正了少数几个属性的计算误差，包括装分、气血上限等。</p>
                        <p>4、配装方案中增加奇穴搭配，同时奇穴自带的属性效果也会自动计算。</p>
                        <p>5、我们不再歧视 PVP，PVP 装备将会默认展示在装备列表里。</p>
                        <p>6、增加了全部属性展示的功能。</p>
                        <p>7、换了方案图的样子，可以高清下载了。</p>
                        <p>8、更新了五行石和五彩石的选择交互，应该会更方便和友好一些。</p>
                    </div>
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Main>
);

export default NotFoundPage;
