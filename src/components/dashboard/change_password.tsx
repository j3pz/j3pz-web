import React, { Component } from 'react';
import { Button, Input, Modal } from 'rsuite';
import { PlatformUtil } from '../../utils/platform_utils';

interface ChangePasswordProps {
    show: boolean;
    onClose?: () => void;
    onConfirm: (oldPass: string, newPass: string) => void;
}

export class ChangePassword extends Component<ChangePasswordProps> {
    oldPassword: string = '';
    password: string = '';

    onConfirm = () => {
        const { onConfirm } = this.props;
        onConfirm(this.oldPassword, this.password);
    };

    render() {
        const { show, onClose = () => {} } = this.props;
        const isMobile = PlatformUtil.isMobile();
        return (
            <Modal
                show={show}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                size={isMobile ? 'xs' : 'sm'}
                onHide={onClose}
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>修改密码</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>旧密码</div>
                    <Input type="password" onChange={(val) => { this.oldPassword = val; }} />
                    <div>新密码</div>
                    <Input type="password" onChange={(val) => { this.password = val; }} />
                </Modal.Body>
                <Modal.Footer>
                    {!isMobile && <Button appearance="default" onClick={onClose}>取消</Button>}
                    <Button appearance="primary" block={isMobile} onClick={this.onConfirm}>确认</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
