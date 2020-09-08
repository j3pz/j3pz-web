import { Link } from 'gatsby';
import React from 'react';
import './Header.css';
import { Button } from 'rsuite';

interface HeaderProps {
    type?: 'shadow' | 'border';
}

const Header = ({ type = 'border' } : HeaderProps) => (
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
        <Link to="/"><Button appearance="ghost" className="header-button">开始使用</Button></Link>
    </header>
);

export default Header;
