import React, { PropsWithChildren } from 'react';
import Header from '../header/Header';
import '../base';

interface MainProps {
    className?: string;
}

const Main = ({ children, className }: PropsWithChildren<MainProps>) => (
    <>
        <Header />
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0,
            }}
        >
            <main className={className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>{children}</main>
        </div>
    </>
);

export default Main;
