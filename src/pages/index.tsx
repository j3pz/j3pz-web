import React from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Main from '../components/layouts/Main';
import SEO from '../components/seo';
import Card from '../components/ui/Card';
import '../css/index.scss';
import Footer from '../components/footer/Footer';
import Button from '../components/ui/Button';

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
            getstart: file(relativePath: { eq: "city.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 2560, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);
    return (
        <Main>
            <SEO title="剑网3配装器 | 首页" />
            <Img fluid={data.titleImage.childImageSharp.fluid} alt="" className="banner-img" />
            <Card className="simple-intro">
                <div className="intro-title">「剑网3配装器」是什么？</div>
                <div className="intro-text">
                    剑网3配装器是由玩家开发，
                    用于剑网3游戏配装的游戏辅助工具。
                    侠士可在选定心法后，
                    针对该心法选择装备，
                    并对装备进行精炼、镶嵌、附魔等各项操作，
                    完美模拟游戏角色的配装过程，
                    并计算出游戏角色的预期属性。
                </div>
            </Card>
            <div className="guide">
                <div className="content">
                    <div className="title">自由搭配</div>
                    <div className="text">支持各种常规和非常规的配装方式，混搭装，大旗装，挖掘配装新思路</div>
                    <div className="title right">战斗属性</div>
                    <div className="text right">设置阵眼、小药、战斗属性，避免属性溢出，最大化装备收益</div>
                    <div className="title">全平台支持</div>
                    <div className="text">可在 Android、iOS、网页和微信小程序中使用，随时随地，不错过任何一次灵感</div>
                </div>
            </div>
            <div className="tools">
                <div className="content black">
                    <div className="title">小工具</div>
                </div>
                <div className="tools-row">
                    <Link to="/tools/haste">
                        <Card className="tools-item">
                            <div className="icon fad fa-tachometer-alt" />
                            <div className="text">加速宝典</div>
                        </Card>
                    </Link>
                    <Card className="tools-item">
                        <div className="icon fad fa-gem" />
                        <div className="text">瑰石列表</div>
                    </Card>
                    <Card className="tools-item">
                        <div className="icon fad fa-couch" />
                        <div className="text">家具图鉴</div>
                    </Card>
                    <Card className="tools-item">
                        <div className="icon fad fa-ribbon" />
                        <div className="text">成就百科</div>
                    </Card>
                </div>
            </div>
            <div className="getstart">
                <div className="content">
                    <div className="title center">由玩家设计，为玩家创造</div>
                    <Button className="getstart-btn">江湖必备，点此开始</Button>
                </div>
                <Img fluid={data.getstart.childImageSharp.fluid} alt="" className="getstart-img" />
            </div>
            <Footer />
        </Main>
    );
};

export default IndexPage;
