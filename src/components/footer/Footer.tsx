import React from 'react';
import './footer.less';
import {
    Container, Row, Col, ScreenClassRender,
} from 'react-grid-system';
import { Link } from 'gatsby';

interface FooterProps {
    background?: string;
}

function Footer({ background = '#FAFAFA' }: FooterProps) {
    return (
        <Container component="footer" className="footer" style={{ background }} fluid>
            <Row className="links-row content black" nogutter>
                <Col className="logo" xs={12} sm={5}>
                    <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
                </Col>
                <Col xs={12} sm={6}>
                    <ScreenClassRender
                        render={(screenClass: string) => (
                            <Row nogutter style={screenClass === 'xs' ? { marginTop: 24, textAlign: 'center' } : {}}>
                                <Col className="link-list" xs={4}>
                                    <div className="list-header">关于</div>
                                    <Link to="about" className="list-item">这是什么</Link>
                                    <Link to="changelog" className="list-item">更新记录</Link>
                                    <Link to="credit" className="list-item">致谢</Link>
                                </Col>
                                <Col className="link-list" xs={4}>
                                    <div className="list-header">产品</div>
                                    <div className="list-item">Android 应用</div>
                                    <div className="list-item">iOS 应用</div>
                                    <div className="list-item">微信小程序</div>
                                    <div className="list-item">PWA</div>
                                    <div className="list-item">开放 API</div>
                                </Col>
                                <Col className="link-list" xs={4}>
                                    <div className="list-header">资源</div>
                                    <div className="list-item">使用说明</div>
                                    <div className="list-item">帮助与反馈</div>
                                    <Link to="policies/toc" className="list-item">用户协议</Link>
                                    <Link to="policies/privacy" className="list-item">隐私协议</Link>
                                </Col>
                            </Row>
                        )}
                    />

                </Col>
            </Row>
            <div className="infos content black">
                <div className="social-media">
                    <a href="/"><img src="https://images.j3pz.com/imgs/wechat.png" alt="微信公众号" /></a>
                    <a href="/"><img src="https://images.j3pz.com/imgs/weibo.png" alt="开发者微博" /></a>
                    <a href="/"><img src="https://images.j3pz.com/imgs/qq.png" alt="QQ 群组" /></a>
                    <a href="/"><img src="https://images.j3pz.com/imgs/telegram.png" alt="Telegram 频道" /></a>
                </div>
                <div className="legal">
                    <span>
                        Copyright © 2013-
                        {(new Date()).getFullYear()}
                        {' '}
                        剑网3配装器
                    </span>
                    <a href="https://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">滇ICP备14005270号-1</a>
                </div>
            </div>
        </Container>
    );
}

export { Footer };
