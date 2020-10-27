import React, { Component } from 'react';
import { Button, Input, Modal } from 'rsuite';

interface ResetPasswordProps {
    show: boolean;
    onClose?: () => void;
    onConfirm: (email: string) => void;
}

export class ResetPassword extends Component<ResetPasswordProps> {
    email: string = '';

    onConfirm = () => {
        this.props.onConfirm(this.email);
    };

    render() {
        const { show, onClose = () => {} } = this.props;
        return (
            <Modal
                show={show}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                size="xs"
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>重置密码</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>账号</div>
                    <Input defaultValue="" onChange={(val) => { this.email = val; }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onConfirm} appearance="primary">
                        重置
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
