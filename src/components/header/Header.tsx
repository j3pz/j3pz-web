import { Link } from 'gatsby';
import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { PlatformUtil } from '../../utils/platform_utils';
import './Header.css';

interface HeaderProps {
    type?: 'shadow' | 'border';
    mode?: 'acrylic' | 'simple';
}

const Header = ({ type = 'border', mode = 'acrylic' } : HeaderProps) => {
    const isMobile = PlatformUtil.isMobile();
    if (mode === 'simple') {
        return (
            <Navbar componentClass="header" className={`header header-${type}`} style={{ display: 'block', height: 'auto' }}>
                <Navbar.Header>
                    <Link to="/" className="logo">
                        <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
                    </Link>
                    <Link to="/" className="title">剑网3配装器</Link>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        {/* <Nav.Item componentClass="button"><Link to="/intro">使用说明</Link></Nav.Item>
                        <Nav.Item componentClass="button"><Link to="/changelog">更新记录</Link></Nav.Item> */}
                        <a href="https://support.qq.com/products/105376" target="_blank" rel="noopener noreferrer">
                            <Nav.Item componentClass="button">反馈</Nav.Item>
                        </a>
                    </Nav>
                    <Nav pullRight={!isMobile}>
                        <Link to="/dashboard"><Nav.Item>方案列表</Nav.Item></Link>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        );
    }
    return (
        <header className={`header header-${type}`}>
            <Link to="/" className="logo">
                <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
            </Link>
            <Link to="/" className="title">
                <img src="https://images.j3pz.com/imgs/logo-text.png" alt="Logo Text" />
            </Link>
            <div style={{ margin: 'auto' }} />
            {/* <Link to="/intro" className="link">使用说明</Link> */}
            {/* <Link to="/changelog" className="link">更新记录</Link> */}
            {/* <a href="https://support.qq.com/products/105376" className="link" target="_blank" rel="noopener noreferrer">反馈</a> */}
            {/* <Link to="/dashboard"><Button appearance="ghost" className="header-button">开始使用</Button></Link> */}
        </header>
    );
};

export { Header };
