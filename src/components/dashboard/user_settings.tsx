import { faEnvelope, faUser } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { navigate } from 'gatsby';
import {
    Alert,
    Button, HelpBlock, Input, InputGroup,
} from 'rsuite';
import { UserService } from '../../service/user_service';
import { $store, StoreProps } from '../../store';
import { ChangePassword } from './change_password';
import { PlatformUtil } from '../../utils/platform_utils';

interface UserSettingsState {
    passwordModal: boolean;
}

@observer
export class UserSettings extends Component<StoreProps, UserSettingsState> {
    name: string;

    constructor(props) {
        super(props);
        this.name = props.store.user!.name;
        this.state = {
            passwordModal: false,
        };
    }

    private updateName = () => {
        if (this.name === '') return;
        UserService.updateUser({ name: this.name }).then((res) => {
            if (res) {
                Alert.success('更新成功');
            }
        });
    };

    private activate = () => {
        UserService.sendVerify().then((res) => {
            if (res) {
                Alert.success('邮件已发送，请查收邮箱');
            }
        });
    };

    private changePassword = (old: string, password: string) => {
        UserService.updateUser({ oldPassword: old, password }).then((res) => {
            if (res) {
                Alert.success('更新成功');
                this.setState({ passwordModal: false });
            }
        });
    };

    private logout = () => {
        $store.user = null;
        localStorage.removeItem('token');
        navigate('/');
    };

    render() {
        const { store } = this.props;
        const { passwordModal } = this.state;
        const isMobile = PlatformUtil.isMobile();
        return (
            <div style={{ paddingLeft: 24, maxWidth: 400 }}>
                <div className="label">邮箱</div>
                <InputGroup style={{ marginTop: 6 }} disabled>
                    <InputGroup.Addon><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Addon>
                    <Input value={store.user?.email} />
                </InputGroup>
                {!store.user?.activate && (
                <HelpBlock>
                    <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={this.activate}>激活账号</div>
                </HelpBlock>
                )}
                <div className="label" style={{ marginTop: 12 }}>昵称</div>
                <InputGroup style={{ marginTop: 6 }}>
                    <InputGroup.Addon><FontAwesomeIcon icon={faUser} /></InputGroup.Addon>
                    <Input defaultValue={store.user?.name} onChange={(value) => { this.name = value; }} />
                </InputGroup>
                <Button size={isMobile ? 'md' : 'sm'} block={isMobile} style={{ marginTop: 6 }} onClick={this.updateName}>保存</Button>
                <div className="label" style={{ marginTop: 12 }}>密码</div>
                <Button
                    appearance="primary"
                    style={{ marginTop: 6 }}
                    block={isMobile}
                    onClick={() => { this.setState({ passwordModal: true }); }}
                >
                    修改密码
                </Button>
                <ChangePassword
                    show={passwordModal}
                    onConfirm={this.changePassword}
                    onClose={() => this.setState({ passwordModal: false })}
                />
                <div className="label" style={{ marginTop: 12 }}>注销</div>
                <Button
                    appearance="primary"
                    style={{ marginTop: 6 }}
                    block={isMobile}
                    onClick={this.logout}
                >
                    退出登录
                </Button>
            </div>
        );
    }
}
