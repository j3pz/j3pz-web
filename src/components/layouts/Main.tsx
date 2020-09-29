import React, { PropsWithChildren } from 'react';
import { Header } from '../header/Header';
import '../base';
import './layout.less';

interface MainProps {
    className?: string;
}

const Main = ({ children, className }: PropsWithChildren<MainProps>) => (
    <>
        <Header />
        <div className="main-container">
            <main className={className}>{children}</main>
        </div>
    </>
);

export { Main };
