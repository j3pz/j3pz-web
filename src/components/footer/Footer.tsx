import React from 'react';
import './footer.scss';

interface FooterProps {
    background?: string;
}

function Footer({ background = '#FAFAFA' }: FooterProps) {
    return (
        <footer className="footer" style={{ background }}>
            <div className="links-row content black">
                <div className="logo">
                    <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
                </div>
                <div className="link-list">
                    <div className="list-header">关于</div>
                    <div className="list-item">这是什么</div>
                    <div className="list-item">更新记录</div>
                    <div className="list-item">致谢</div>
                </div>
                <div className="link-list">
                    <div className="list-header">产品</div>
                    <div className="list-item">Android 应用</div>
                    <div className="list-item">iOS 应用</div>
                    <div className="list-item">微信小程序</div>
                    <div className="list-item">PWA</div>
                    <div className="list-item">开放 API</div>
                </div>
                <div className="link-list">
                    <div className="list-header">资源</div>
                    <div className="list-item">使用说明</div>
                    <div className="list-item">帮助与反馈</div>
                    <div className="list-item">用户协议</div>
                    <div className="list-item">隐私协议</div>
                </div>
            </div>
            <div className="infos content black">
                <div className="social-media">
                    <a href="/"><img src="http://images.j3pz.com/imgs/wechat.png" alt="微信公众号" /></a>
                    <a href="/"><img src="http://images.j3pz.com/imgs/weibo.png" alt="开发者微博" /></a>
                    <a href="/"><img src="http://images.j3pz.com/imgs/qq.png" alt="QQ 群组" /></a>
                    <a href="/"><img src="http://images.j3pz.com/imgs/telegram.png" alt="Telegram 频道" /></a>
                </div>
                <div className="legal">
                    <span>Copyright © 2013-2020 剑网3配装器</span>
                    <a href="https://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">滇ICP备14005270号-1</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
