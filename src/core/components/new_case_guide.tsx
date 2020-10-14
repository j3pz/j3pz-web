import React, { Component } from 'react';
import { Button, Modal } from 'rsuite';

interface NewCaseGuideProps {
    show: boolean;
    onClose?: () => void;
}

interface NewCaseGuideState {

}

export class NewCaseGuide extends Component<NewCaseGuideProps, NewCaseGuideState> {
    onConfirm = () => {
        const { onClose = () => {} } = this.props;
        onClose();
    };

    render() {
        const { show, onClose = () => {} } = this.props;
        return (
            <Modal
                show={show}
                onHide={onClose}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>新配装方案</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    test
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onConfirm} appearance="primary">
                        确定
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
