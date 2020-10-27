import React from 'react';
import { Button, Modal } from 'rsuite';

interface DeleteConfirmProps {
    show: boolean;
    name: string;
    onClose?: () => void;
    onConfirm: () => void;
}


export function DeleteConfirm({
    show, onConfirm, onClose = () => {}, name,
}: DeleteConfirmProps) {
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
                <Modal.Title>删除方案</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`确定删除“${name}”方案吗？`}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onConfirm} appearance="primary">
                    删除
                </Button>
                <Button onClick={onClose} appearance="subtle">
                    取消
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
