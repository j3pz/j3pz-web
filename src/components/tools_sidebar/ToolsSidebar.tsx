import React, { PropsWithChildren } from 'react';
import './tools_sidebar.less';
import { Link } from 'gatsby';
import { Footer } from '../footer/Footer';

interface ToolsSidebarProps {
    header?: number;
}

function ToolsSidebar({ children, header = 0 } : PropsWithChildren<ToolsSidebarProps>) {
    return (
        <div
            className="sidebar-container"
            style={{ paddingTop: header }}
        >
            <aside style={{ width: 60 }} className="tools-sidebar">
                <nav>
                    <Link to="/tools/haste" title="加速宝典" className="tool-item">
                        <div className="fad fa-tachometer-alt" />
                    </Link>
                    <Link to="/tools/prediction" title="瑰石列表" className="tool-item">
                        <div className="fad fa-gem" />
                    </Link>
                    <Link to="/tools/furniture" title="家具图鉴" className="tool-item">
                        <div className="fad fa-couch" />
                    </Link>
                    <Link to="/tools/achivement" title="成就百科" className="tool-item">
                        <div className="fad fa-ribbon" />
                    </Link>
                </nav>
            </aside>
            <main className="tools-content">
                {children}
                <div style={{ margin: 12 }} />
                <Footer />
            </main>
        </div>
    );
}

export { ToolsSidebar };
