import React from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCouch, faGem, faRibbon, faTachometerAlt,
} from '@fortawesome/pro-duotone-svg-icons';
import { Button } from 'rsuite';
import { SEO } from '../components/seo';
import { Card } from '../components/ui/Card';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import '../css/index.less';

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
        <>
            <Header type="shadow" />
            <main className="main-content">
                <SEO title="剑网3配装器" />
                <Img fluid={data.titleImage.childImageSharp.fluid} alt="" className="banner-img" />
                <Card className="simple-intro" acrylic>
                    <div className="intro-title">「剑网3配装器」退休了</div>
                    <div className="intro-text">
                        <p>
                            2013 年初的寒假，我以“胖叔叔”的名字，进入了一个叫做剑网 3 的武侠江湖。作为一个网游新人，我着实花了不短的时间来学习怎么玩一个 MMORPG。
                            版本很快进入了安史之乱，新的等级，新的玩法，新的副本，新的装备，让我有很大的热情去探索这个江湖。
                        </p>

                        <p>
                            由于洗炼、淬炼玩法的存在，同时军械库/大明宫时代纷繁的装备方向，很自然的我开始想要寻找一个网页，能够列出所有可能的装备，甚至计算洗炼的结果。
                            不幸（或许是幸运）的是，当时仅有几个 Excel 表格有这样的功能，但更新颇为麻烦——这也成了配装器的开始。
                        </p>

                        <p>
                            我当时处于求学阶段，并对编程有着很强的兴趣，这让我有足够的时间和动力来创造一个我所寻求的网站。开发一个月后，我将它分享给了其他的玩家。
                            出乎我意料的是，配装器很受欢迎，于是我决定进一步优化、设计它，让它更友好更强大。你们为配装器贡献了很多绝妙的想法，使得它更好也更受欢迎。
                            当我不断迭代这个网站时，网站的用户也迅速扩增，甚至扩展到了海外。
                            到目前为止，配装器有超过八十万的注册用户，存储超过四百万套配装方案，这是令人难以置信的成绩。
                        </p>

                        <p>
                            八年来，我一直活跃于剑网 3 的游戏社群中，也结识了很多有趣的伙伴。我也很喜欢维护这个网站的过程。
                            然而，生活不会一成不变，你会朝着新的方向发展，发现新的兴趣。实际上，我在很早以前就基本离开了剑网 3 的江湖，剑网 3 对我来说已经和以前不一样了。
                            我有了新的方向也有了新的兴趣，我的生活也进入了新的阶段。
                        </p>

                        <p>
                            这就是为什么我开始考虑剑网 3 配装器未来的存续。游戏的更新很快，我半心半意的维护已经很难跟上游戏的发展，配不上各位侠士的喜爱。
                            在我的待办列表中，已经堆积了太多未完成的事项，有我的生活中的，工作上的，也有配装器的。这也是我决定让配装器退休的几个原因之一。与你们一起玩游戏真的是一段美好的时光，我学到了很多东西，甚至因为配装器找到了一份很棒的工作。
                            我将永远铭记我生命中的这一章，记得它给我带来的欢乐。
                        </p>

                        <p>
                            致所有侠士：祝你们一切顺利，保持健康，享受生活。感谢大家都曾为配装器的一份子。
                            如果你也想和我说再见，可以发送邮件到
                            {' '}
                            <a href="mailto:goodbye@j3pz.com">goodbye@j3pz.com</a>
                            ，我很期待你的回音。
                            {' '}
                        </p>

                        <p>
                            PS. 配装器所有代码已在
                            {' '}
                            <a href="https://github.com/j3pz">https://github.com/j3pz</a>
                            {' '}
                            开源。
                            在线服务将于 2021 年 9 月 30 日关停。
                        </p>
                    </div>
                </Card>
                <div className="guide">
                    <div className="content">
                        <div className="title">自由搭配</div>
                        <div className="text">支持各种常规和非常规的配装方式，混搭装，大旗装，挖掘配装新思路</div>
                        <div className="title right">战斗属性</div>
                        <div className="text right">设置阵眼、小药、战斗属性，避免属性溢出，最大化装备收益</div>
                        {/* <div className="title">全平台支持</div>
                        <div className="text">可在 Android、iOS、网页和微信小程序中使用，随时随地，不错过任何一次灵感</div> */}
                    </div>
                </div>
                <div className="tools">
                    <div className="content black">
                        <div className="title">小工具</div>
                    </div>
                    <div className="tools-row">
                        <Link to="/tools/haste">
                            <Card className="tools-item">
                                <FontAwesomeIcon icon={faTachometerAlt} size="4x" className="icon" />
                                <div className="text">加速宝典</div>
                            </Card>
                        </Link>
                        <Link to="/tools/prediction" className="disabled">
                            <Card className="tools-item">
                                <FontAwesomeIcon icon={faGem} size="4x" className="icon" color="#CCC" />
                                <div className="text">瑰石列表</div>
                            </Card>
                        </Link>
                        <Link to="/tools/furniture" className="disabled">
                            <Card className="tools-item">
                                <FontAwesomeIcon icon={faCouch} size="4x" className="icon" color="#CCC" />
                                <div className="text">家具图鉴</div>
                            </Card>
                        </Link>
                        <Link to="/tools/achivement" className="disabled">
                            <Card className="tools-item">
                                <FontAwesomeIcon icon={faRibbon} size="4x" className="icon" color="#CCC" />
                                <div className="text">成就百科</div>
                            </Card>
                        </Link>
                    </div>
                </div>
                <div className="getstart">
                    <div className="content">
                        <div className="title center">由玩家设计，为玩家创造</div>
                        <Link to="/dashboard"><Button className="getstart-btn" appearance="primary">江湖必备，点此开始</Button></Link>
                    </div>
                    <Img fluid={data.getstart.childImageSharp.fluid} alt="" className="getstart-img" />
                </div>
                <Footer />
            </main>
        </>
    );
};

export default IndexPage;
