import React, { Component } from 'react';
import { Button, Input, Modal } from 'rsuite';

interface RenameCaseProps {
    show: boolean;
    name: string;
    onClose?: () => void;
    onConfirm: (name: string) => void;
}

export class RenameCase extends Component<RenameCaseProps> {
    name: string;

    constructor(props) {
        super(props);
        this.name = props.name;
    }

    onConfirm = () => {
        this.props.onConfirm(this.name);
    };

    render() {
        const { show, onClose = () => {}, name } = this.props;
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
                    <Modal.Title>方案重命名</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input defaultValue={name} onChange={(val) => { this.name = val; }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onConfirm} appearance="primary">
                        更改
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        取消
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
