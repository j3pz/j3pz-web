import { Link } from 'gatsby';
import React from 'react';
import './Header.css';
import Button from '../ui/Button';

interface HeaderProps {
    title: string;
}

const Header = () => (
    <header className="header">
        <Link to="/" className="logo">
            <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
        </Link>
        <Link to="/" className="title">
            <img src="https://images.j3pz.com/imgs/logo-text.png" alt="Logo Text" />
        </Link>
        <div style={{ margin: 'auto' }} />
        <Link to="/intro" className="link">使用说明</Link>
        <Link to="/changelog" className="link">更新记录</Link>
        <Link to="https://support.qq.com/products/105376" className="link">反馈</Link>
        <Link to="/"><Button>开始使用</Button></Link>
    </header>
);

Header.defaultProps = {
    title: '',
};

export default Header;