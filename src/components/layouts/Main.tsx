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
                margin: 0,
                padding: 0,
            }}
        >
            <main className={className}>{children}</main>
        </div>
    </>
);

export default Main;
