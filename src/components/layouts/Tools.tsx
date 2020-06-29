import React, { PropsWithChildren } from 'react';
import Header from '../header/Header';
import ToolsSidebar from '../tools_sidebar/ToolsSidebar';

interface ToolsProps {
}

const Tools = ({ children }: PropsWithChildren<ToolsProps>) => (
    <>
        <Header />
        <ToolsSidebar
            header={60}
        >
            {children}
        </ToolsSidebar>
    </>
);

export default Tools;
