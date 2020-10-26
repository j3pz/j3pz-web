import React, { Component } from 'react';
import { Modal, Panel } from 'rsuite';
import { schoolAbbrMap } from '../../model/base';
import './new_case_guide.less';
import '../../css/icon.less';

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
                    {Object.entries(schoolAbbrMap).map(([school, abbr]) => (
                        <Panel className="school-item">
                            <span className={`jx3icon jx3icon-${abbr}`} />
                            <span>{school}</span>
                        </Panel>
                    ))}
                </Modal.Body>
            </Modal>
        );
    }
}
