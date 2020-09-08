import React, { PropsWithChildren } from 'react';
import Header from '../header/Header';
import '../base';

interface PolicyProps {
    id: string;
}

const Policy = ({ children, id }: PropsWithChildren<PolicyProps>) => (
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
            <main style={{
                display: 'flex', flexDirection: 'column', minHeight: '100%', paddingTop: 120,
            }}
            >
                <div>
                    协议中心
                </div>
                {children}
            </main>
        </div>
    </>
);

export default Policy;
