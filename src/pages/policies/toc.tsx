import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Policy } from '../../components/layouts/Policy';
import { Footer } from '../../components/footer/Footer';
import { SEO } from '../../components/seo';

const TermsPage = () => (
    <Policy>
        <SEO title="用户使用协议" />
        <Container component="section">
            <Row>
                <Col sm={12} md={10} offset={{ md: 1 }}>
                    <h4 className="label">网站内容</h4>
                    <p className="lead-text">
                        剑网3配装器为玩家开发，与剑网3官方无任何关系。
                    </p>
                    <p className="lead-text">
                        剑网3配装器的所有工作人员均不对网站上的任何链接和引用内容负责，也不承担任何法律责任。
                        其他一切因点击这些链接或使用这些引用内容而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），
                        请追究链接和引用内容的原作者的法律责任，而不是那些引用或链接它们的人。
                    </p>
                    <p className="lead-text">
                        任何在本站上填写的个人信息均由您自己提供，请务必确保您填写的信息确实是您想让我们知道的。
                        如果产生任何纠纷，我们不对此负责。
                    </p>
                    <p className="lead-text">
                        剑网3配装器不对任何我们所链接的网站内容负责。
                        我们仅出于为用户提供方便而设置这些链接，并不表示我们赞同这些网站的内容和立场。
                    </p>
                    <p className="lead-text">
                        最后，我们不保证网站上任何信息的准确性、完整性和可靠性以及网站的性能。
                        尽管我们会定期检查网站的性能和网站上的内容以提供更优秀的内容，但我们不承诺不会撤下或改变某些内容。
                    </p>
                    <h4 className="label">著作权</h4>
                    <p className="lead-text">
                        剑网3配装器由玩家胖叔叔制作并免费提供，仅对增值服务收取费用。
                        剑网3配装器保留对网站提供的任何内容的所有权和著作权，使用者并无任何的权利。
                        任何人均不得对本网站所提供的内容数据以任何形式进行利用，包括但不限于复制、修改、编辑、内嵌、使用收益或其他任何损及本网站的行为，事先获得本站开发者或合法权利人书面授权的除外。
                    </p>
                    <p className="lead-text">
                        剑网3配装器所提供的内容，已向各著作权单位和个人取得授权。
                        但因我国目前对于著作权的取得、转移并无登记，因此可能存在授权人和实际权利人不一致的情况。
                        如果您认为您对于剑网3配装器提供的内容存在著作权疑虑，请主动与我们联系。
                    </p>
                    <p className="lead-text">
                        当您使用剑网3配装器所提供的服务，将任何信息或内容上传、保存或输入时，视为您已同意授权剑网3配装器在本网站上编缉、散布、出版、公开发表或以其他方法使用，并可再授权第三人使用。
                        您应保证所提供的信息或内容已享有正当权利或已获得合法授权，不会侵害他人的知识产权。
                    </p>
                </Col>
            </Row>
        </Container>
        <div style={{ margin: 48 }} />
        <Footer />
    </Policy>
);

export default TermsPage;
