import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query {
            titleImage: file(relativePath: { eq: "banner.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 2560, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);
    return (
        <Layout>
            <SEO title="剑网3配装器 | 首页" />
            <Img fluid={data.titleImage.childImageSharp.fluid} alt="" className="banner-img" />
        </Layout>
    );
};

export default IndexPage;
