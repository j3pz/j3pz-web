import React, { PropsWithChildren } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header/Header';
import './layout.css';

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <Header title={data.site.siteMetadata.title} />
            <div
                style={{
                    position: 'relative',
                    margin: 0,
                    padding: 0,
                }}
            >
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
