import React, { PropsWithChildren } from 'react';
import Header from '../header/Header';
import './main.css';

interface MainProps {}

const Main = ({ children }: PropsWithChildren<MainProps>) => (
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
            <main>{children}</main>
        </div>
    </>
);

export default Main;
