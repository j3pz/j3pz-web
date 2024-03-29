import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import { Col, Container, Row } from 'react-grid-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Button,
    ButtonToolbar,
    Form, FormControl, FormGroup, HelpBlock, InputGroup,
    Schema,
} from 'rsuite';
import {
    faEnvelope, faLockAlt, faUserAlt,
} from '@fortawesome/pro-light-svg-icons';
import { SEO } from '../components/seo';
import '../css/login.less';
import { UserService } from '../service/user_service';
import { User } from '../model/user';
import { $store } from '../store';
import { ResetPassword } from '../components/reset_password/reset_password';
import { PlatformUtil } from '../utils/platform_utils';

const { StringType } = Schema.Types;

const signUpModel = Schema.Model({
    name: StringType().isRequired('此项必填'),
    email: StringType()
        .isEmail('邮箱不正确')
        .isRequired('此项必填'),
    password: StringType()
        .minLength(8, '密码过短')
        .isRequired('此项必填'),
});
const signInModel = Schema.Model({
    email: StringType()
        .isEmail('邮箱不正确')
        .isRequired('此项必填'),
    password: StringType()
        .isRequired('此项必填'),
});

interface LoginPageState {
    mode: 'signin' | 'signup';
    requesting: boolean;
    forget: boolean;
}

interface LoginForm {
    email: string;
    password: string;
    name?: string;
}

export default class LoginPage extends Component<{}, LoginPageState> {
    formValue: LoginForm = {
        email: '',
        password: '',
        name: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            mode: PlatformUtil.isMobile() ? 'signin' : 'signup',
            requesting: false,
            forget: false,
        };
    }

    componentDidMount() {
        if ($store.user) {
            navigate('/dashboard');
            return;
        }
        const token = localStorage.getItem('token');
        if (token) {
            UserService.getUser(false).then((user) => {
                if (user) {
                    $store.user = User.fromJson(user.attributes);
                    navigate('/dashboard');
                }
            });
        }
    }


    goSignIn = () => {
        this.setState({ mode: 'signin' });
        gtag('event', 'auth.go_sign_in');
    };

    goSignUp = () => {
        this.setState({ mode: 'signup' });
        gtag('event', 'auth.go_sign_up');
    };

    update = (value) => {
        this.formValue = value;
    };

    doSignIn = () => {
        this.setState({ requesting: true });
        UserService.login(this.formValue.email, this.formValue.password).then((res) => {
            this.setState({ requesting: false });
            if (res) {
                const user = User.fromJson(res.attributes);
                $store.user = user;
                localStorage.setItem('token', user.token);
                navigate('/dashboard');
                gtag('event', 'login', { method: 'local' });
            }
        });
    };

    doSignUp = () => {
        this.setState({ requesting: true });
        UserService.signup(this.formValue.email, this.formValue.password, this.formValue.name ?? '剑网3侠士').then((res) => {
            this.setState({ requesting: false });
            if (res) {
                const user = User.fromJson(res.attributes);
                $store.user = user;
                localStorage.setItem('token', user.token);
                navigate('/dashboard');
                gtag('event', 'sign_up', { method: 'local' });
            }
        });
    };

    doReset = (email: string) => {
        gtag('event', 'auth.request_reset');
        UserService.requestReset(email).then((res) => {
            if (res) {
                Alert.info('该邮箱会收到关于重置密码的进一步指引说明，请登录邮箱查看');
            }
        });
        this.setState({ forget: false });
    };

    render() {
        const { mode, requesting, forget } = this.state;
        const isMobile = PlatformUtil.isMobile();
        return (
            <>
                <SEO title="登录" />
                <Container className="login" fluid style={{ padding: 0 }}>
                    <img src="https://images.j3pz.com/imgs/icon.png" alt="Logo" className="logo" />

                    {isMobile && mode === 'signup' && (
                        <div className="mobile-guide">
                            <Button appearance="ghost" onClick={this.goSignIn} size="lg">登录</Button>
                        </div>
                    )}
                    {isMobile && mode === 'signin' && (
                        <div className="mobile-guide">
                            <Button appearance="ghost" onClick={this.goSignUp} size="lg">注册</Button>
                        </div>
                    )}

                    <Row nowrap nogutter style={{ width: '100%', height: '100%' }}>
                        { mode === 'signin' && (
                        <Col className="form" md={7}>
                            <div className="sign-in-form">
                                <p>登录配装器</p>
                                <p>使用邮箱登录已有账号:</p>
                                <Form fluid model={signInModel} checkTrigger="blur" onChange={this.update}>
                                    <FormGroup>
                                        <InputGroup inside style={{ marginBottom: 24 }} size="lg">
                                            <InputGroup.Addon style={{ height: 42 }}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Addon>
                                            <FormControl name="email" placeholder="邮箱" size="lg" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup style={{ marginBottom: 24 }}>
                                        <InputGroup inside size="lg">
                                            <InputGroup.Addon style={{ height: 42 }}>
                                                <FontAwesomeIcon icon={faLockAlt} />
                                            </InputGroup.Addon>
                                            <FormControl
                                                name="password"
                                                type="password"
                                                placeholder="密码"
                                                size="lg"
                                                autoComplete="current-password"
                                            />
                                        </InputGroup>
                                        <HelpBlock style={{ textAlign: 'right' }}>
                                            <div onClick={() => { this.setState({ forget: true }); }} style={{ cursor: 'pointer' }}>
                                                忘了密码？这里找回
                                            </div>
                                        </HelpBlock>
                                        <ResetPassword
                                            show={forget}
                                            onConfirm={this.doReset}
                                            onClose={() => this.setState({ forget: false })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <ButtonToolbar>
                                            <Button
                                                size="lg"
                                                appearance="primary"
                                                type="submit"
                                                loading={requesting}
                                                style={{ borderRadius: 24, minWidth: 200 }}
                                                onClick={this.doSignIn}
                                            >
                                                登 录
                                            </Button>
                                        </ButtonToolbar>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Col>
                        )}
                        { !isMobile && (
                        <Col className="login-guide" sm={5}>
                            { mode === 'signup' && (
                            <div className="guide-tips">
                                <p>老朋友？欢迎回来。</p>
                                <p>点击下面的按钮登录，以继续使用配装器，管理和分享你的配装方案</p>
                                <Button
                                    style={{
                                        color: '#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: 24,
                                        minWidth: 200,
                                    }}
                                    appearance="ghost"
                                    size="lg"
                                    loading={requesting}
                                    onClick={this.goSignIn}
                                >
                                    登 录
                                </Button>
                            </div>
                            )}
                            {mode === 'signin' && (
                            <div className="guide-tips">
                                <p>新朋友？你好。</p>
                                <p>点击下面的按钮注册，加入配装器，开启全新江湖历程</p>
                                <Button
                                    style={{
                                        color: '#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: 24,
                                        minWidth: 200,
                                    }}
                                    appearance="ghost"
                                    size="lg"
                                    loading={requesting}
                                    onClick={this.goSignUp}
                                >
                                    注 册
                                </Button>
                            </div>
                            )}
                        </Col>
                        )}
                        {mode === 'signup' && (
                        <Col className="form" sm={7}>
                            <div className="sign-up-form">
                                <p>创建新账号</p>
                                <p>使用邮箱注册一个新的账号:</p>
                                <Form fluid model={signUpModel} checkTrigger="blur" onChange={this.update}>
                                    <FormGroup>
                                        <InputGroup inside style={{ marginBottom: 24 }} size="lg">
                                            <InputGroup.Addon style={{ height: 42 }}>
                                                <FontAwesomeIcon icon={faUserAlt} />
                                            </InputGroup.Addon>
                                            <FormControl name="name" placeholder="昵称" size="lg" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup inside style={{ marginBottom: 24 }} size="lg">
                                            <InputGroup.Addon style={{ height: 42 }}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Addon>
                                            <FormControl name="email" placeholder="邮箱" size="lg" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup inside style={{ marginBottom: 24 }} size="lg">
                                            <InputGroup.Addon style={{ height: 42 }}>
                                                <FontAwesomeIcon icon={faLockAlt} />
                                            </InputGroup.Addon>
                                            <FormControl
                                                name="password"
                                                type="password"
                                                placeholder="密码"
                                                size="lg"
                                                autoComplete="current-password"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <ButtonToolbar>
                                            <Button
                                                size="lg"
                                                appearance="primary"
                                                type="submit"
                                                loading={requesting}
                                                style={{ borderRadius: 24, minWidth: 200 }}
                                                onClick={this.doSignUp}
                                            >
                                                注 册
                                            </Button>
                                        </ButtonToolbar>
                                        <HelpBlock>
                                            点击注册即表示同意网站
                                            <Link to="/policies/toc">使用条款和隐私条款</Link>
                                        </HelpBlock>
                                    </FormGroup>
                                </Form>
                                <div className="form-splitline">或者</div>
                                <Link to="/app">无需注册，直接使用</Link>
                            </div>
                        </Col>
                        )}
                    </Row>
                </Container>
            </>
        );
    }
}
