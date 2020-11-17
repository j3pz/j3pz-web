import { faPlusSquare, faSpinner } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Button, Input, InputGroup, List, Modal,
} from 'rsuite';
import { CaseInfo } from '../../model/case_info';
import { CaseService } from '../../service/case_service';
import { StoreProps } from '../../store';

interface SaveAsModalState {
    list: CaseInfo[];
    isNew: boolean;
    loading: boolean;
    active: string;
}

@observer
export class SaveAsModal extends Component<StoreProps, SaveAsModalState> {
    name: string = '';
    showing = false;

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: props.store.user !== null,
            isNew: false,
            active: '',
        };
    }

    update() {
        if (this.props.store.user) {
            CaseService.getCaseList().then((cases) => {
                this.setState({
                    list: cases.map((_) => _.attributes),
                    loading: false,
                });
            });
        }
    }

    select = (id: string) => {
        this.setState({ active: id, isNew: false });
    };

    onConfirm = () => {
        if (this.state.isNew) {
            // CaseService.create()
        }
        this.close();
    };

    close = () => {
        const { store } = this.props;
        this.showing = false;
        store.showSaveAs = false;
        setTimeout(() => {
            this.setState({
                isNew: false, active: '', list: [], loading: true,
            });
        }, 500);
    };

    render() {
        const { store } = this.props;
        const {
            list, loading, active, isNew,
        } = this.state;
        if (store.showSaveAs && !this.showing) {
            this.update();
            this.showing = true;
        }
        return (
            <Modal
                show={store.showSaveAs}
                style={{
                    height: '100%',
                    margin: '0 auto',
                }}
                onHide={this.close}
                size="xs"
                dialogStyle={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Modal.Header>
                    <Modal.Title>方案另存为</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 12 }}>
                    { loading && (
                        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                            <FontAwesomeIcon icon={faSpinner} spin />
                            {' '}
                            加载中...
                        </p>
                    )}
                    {!loading && (
                        <List bordered hover>
                            {isNew ? (
                                <InputGroup
                                    size="lg"
                                    style={{
                                        marginTop: -1,
                                        marginLeft: -1,
                                        marginRight: -1,
                                        width: 'auto',
                                        borderRadius: 0,
                                    }}
                                >
                                    <InputGroup.Addon><FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 8 }} /></InputGroup.Addon>
                                    <Input defaultValue={`${store.caseInfo.name} - copy`} />
                                </InputGroup>
                            ) : (
                                <List.Item style={{ cursor: 'pointer' }} onClick={() => { this.setState({ isNew: true }); }}>
                                    <FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 8 }} />
                                    另存为新方案
                                </List.Item>
                            )}
                            {list.map((item, index) => (
                                <List.Item
                                    key={item.id}
                                    index={index}
                                    style={{ cursor: 'pointer', color: active === item.id ? '#BB2F40' : undefined }}
                                    onClick={() => this.select(item.id)}
                                >
                                    {item.name}
                                </List.Item>
                            ))}
                        </List>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} appearance="subtle">
                        取消
                    </Button>
                    <Button onClick={this.onConfirm} appearance="primary">
                        {isNew ? '保存为新方案' : '覆盖已有方案'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
