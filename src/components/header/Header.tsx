import { Link } from 'gatsby';
import React from 'react';
import { Navbar, Nav, Button } from 'rsuite';
import './Header.css';

interface HeaderProps {
    type?: 'shadow' | 'border';
    mode?: 'acrylic' | 'simple';
}

const Header = ({ type = 'border', mode = 'acrylic' } : HeaderProps) => {
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
                        <Nav.Item componentClass="button"><Link to="/intro">使用说明</Link></Nav.Item>
                        <Nav.Item componentClass="button"><Link to="/changelog">更新记录</Link></Nav.Item>
                        <Nav.Item componentClass="button">
                            <a href="https://support.qq.com/products/105376" target="_blank" rel="noopener noreferrer">反馈</a>
                        </Nav.Item>
                    </Nav>
                    {/* <Nav pullRight>
                        <Nav.Item>Settings</Nav.Item>
                    </Nav> */}
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
            <Link to="/intro" className="link">使用说明</Link>
            <Link to="/changelog" className="link">更新记录</Link>
            <a href="https://support.qq.com/products/105376" className="link" target="_blank" rel="noopener noreferrer">反馈</a>
            <Link to="/app"><Button appearance="ghost" className="header-button">开始使用</Button></Link>
        </header>
    );
};

export default Header;
