import React, { Component } from 'react';
import { transaction } from 'mobx';
import { navigate } from 'gatsby';
import { faCheck, faSpinner, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SEO } from '../../components/seo';
import { User } from '../../model/user';
import { UserService } from '../../service/user_service';
import { $store } from '../../store';
import { getUrlParameter } from '../../utils/url';

export default class VerifyPage extends Component<{}, { pending: boolean; valid: boolean }> {
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
            UserService.verify(permalink, token).then((res) => {
                if (res.attributes) {
                    transaction(() => {
                        const user = User.fromJson(res.attributes);
                        $store.user = user;
                        localStorage.setItem('token', user.token);
                    });
                    this.setState({ pending: false, valid: true });
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 3000);
                } else {
                    this.setState({ pending: false, valid: false });
                }
            });
        } else {
            this.setState({ pending: false, valid: false });
        }
    }

    render() {
        const { pending, valid } = this.state;
        return (
            <>
                <SEO title="邮箱验证" />
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
                    {pending ? (
                        <div style={{ margin: 'auto' }}>
                            <FontAwesomeIcon icon={faSpinner} spin size="4x" />
                            <span style={{ fontSize: 60 }}>正在验证</span>
                        </div>
                    ) : (
                        <div style={{ margin: 'auto' }}>
                            <FontAwesomeIcon icon={valid ? faCheck : faTimes} size="4x" />
                            <span style={{ fontSize: 60 }}>{valid ? '验证成功' : '链接不正确，请检查是否复制有误' }</span>
                        </div>
                    )}
                </main>
            </>
        );
    }
}
