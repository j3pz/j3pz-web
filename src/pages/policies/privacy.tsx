import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Policy from '../../components/layouts/Policy';
import Footer from '../../components/footer/Footer';

const PrivacyPage = () => (
    <Policy>
        <Container component="section">
            <Row>
                <Col sm={12} md={10} offset={{ md: 1 }}>
                    <h4 className="label">个人信息</h4>
                    <p className="lead-text">
                        在剑网3配装器上被登载的个人信息均是由用户提供的或采集自公开的互联网（例如 新浪微博, 百度贴吧，论坛 等）。
                        如果你在本站发现你不想公开的任何信息，请主动联系我们，我们会为你撤除。
                    </p>
                    <p className="lead-text">
                        我们收集的个人信息主要但不限于在以下情况展示：比赛、提供赠品、人物信息、网站评论、用户提交的投稿和视频以及用户与我们的联系中。
                        我们会在收到请求的15天内移除个人信息。
                    </p>
                    <p className="lead-text">
                        剑网3配装器承诺不会分享，出售，租借或以其他方式分发个人信息。
                        网站内容所需的信息除外。
                    </p>
                    <p className="lead-text">
                        我们仅在您获得了比赛、抽奖或其他类似活动的奖品时需要您的个人信息——这些个人信息仅会被存储在我们的工作人员处，
                        我们也不会因为任何原因分发您的个人信息。
                        一旦比赛奖品或赠品成功交付，这些个人信息将会被完全删除（邮件地址除外，以方便在意外情况下进一步联系）。
                    </p>

                    <h4 className="label">COOKIES 与 LocalStorage</h4>
                    <p className="lead-text">
                        本站使用 Cookies 和 LocalStorage 技术，它允许用户在下次访问网站时能被识别，并保存必要的信息。
                        Cookies 和 LocalStorage 信息仅被限制在本站使用。
                    </p>

                    <h4 className="label">安全</h4>
                    <p className="lead-text">
                        我们不承诺网站不存在任何安全漏洞，但我们会定期确认运营商的维护质量，并在发现漏洞时及时处理。
                    </p>

                    <h4 className="label">政策变更</h4>
                    <p className="lead-text">
                        本项政策如有变更，恕不通知。如果您对您的个人信息的使用情况感到担心，可以随时与我们联系并咨询。
                    </p>
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Policy>
);

export default PrivacyPage;
