import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { faCheck, faSpinner, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'rsuite';
import { SEO } from '../../components/seo';
import { UserService } from '../../service/user_service';
import { getUrlParameter } from '../../utils/url';

export default class ResetPage extends Component<{}, { pending: boolean; valid: boolean }> {
    password: string = '';

    constructor(props) {
        super(props);
        this.state = {
            pending: true,
            valid: false,
        };
    }

    componentDidMount() {
        const permalink = getUrlParameter('permalink');
        const token = getUrlParameter('permalink');
        if (permalink && token) {
            UserService.resetPassword(permalink, token, '', true).then((res) => {
                if (res) {
                    this.setState({ pending: false, valid: true });
                } else {
                    this.setState({ pending: false, valid: false });
                }
            });
        } else {
            this.setState({ pending: false, valid: false });
        }
    }

    reset = (password) => {
        const permalink = getUrlParameter('permalink');
        const token = getUrlParameter('permalink');
        if (permalink && token) {
            UserService.resetPassword(permalink, token, password, false).then((res) => {
                if (res) {
                    navigate('/login');
                } else {
                    this.setState({ pending: false, valid: false });
                }
            });
        } else {
            this.setState({ pending: false, valid: false });
        }
    };

    render() {
        const { pending, valid } = this.state;
        return (
            <>
                <SEO title="密码重置" />
                <main
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {pending && (
                        <div style={{ margin: 'auto' }}>
                            <FontAwesomeIcon icon={faSpinner} spin size="4x" />
                            <span style={{ fontSize: 60 }}>正在验证</span>
                        </div>
                    )}
                    {!pending && !valid && (
                        <div style={{ margin: 'auto' }}>
                            <FontAwesomeIcon icon={valid ? faCheck : faTimes} size="4x" />
                            <span style={{ fontSize: 60 }}>链接不正确，请检查是否复制有误</span>
                        </div>
                    )}
                    {!pending && valid && (
                        <div style={{ margin: 'auto' }}>
                            <div>新密码</div>
                            <Input type="password" onChange={(val) => { this.password = val; }} />
                            <Button appearance="primary" onClick={this.reset}>确认</Button>
                        </div>
                    )}
                </main>
            </>
        );
    }
}
