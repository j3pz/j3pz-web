import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';
import { Header } from '../header/Header';
import '../base';
import './layout.less';

interface PolicyProps {
    className?: string;
}

const Policy = ({ children }: PropsWithChildren<PolicyProps>) => (
    <>
        <Header />
        <div className="main-container">
            <main className="main-container" style={{ paddingTop: 0 }}>
                <div className="policy-header">
                    <h2>协议中心</h2>
                    <div className="policy-tabs">
                        <Link to="policies/toc" className="policy-tab" activeClassName="active">用户使用协议</Link>
                        <Link to="policies/privacy" className="policy-tab" activeClassName="active">隐私协议</Link>
                        <Link to="policies/privacy-settings" className="policy-tab" activeClassName="active">隐私设置</Link>
                    </div>
                </div>
                {children}
            </main>
        </div>
    </>
);

export { Policy };
