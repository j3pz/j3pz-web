import React, { PropsWithChildren } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../header/Header';
import './main.css';

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
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    minHeight: '100%',
                }}
            >
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
