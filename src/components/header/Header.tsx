import { Link } from 'gatsby';
import React from 'react';
import './Header.css';

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => (
    <header className="header">
        <Link to="/" className="logo">
            <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" />
        </Link>
        <Link to="/" className="title">{title}</Link>
        <div style={{ margin: 'auto' }} />
        <Link to="/" className="link">这是什么</Link>
        <Link to="/" className="link">更新记录</Link>
        <Link to="/" className="link">反馈</Link>
        <Link to="/" className="get-started">开始使用</Link>
    </header>
);

Header.defaultProps = {
    title: '',
};

export default Header;
