import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Modal, Nav } from 'rsuite';
import { $store, StoreProps } from '../../store';
import { ShareImage } from './share_image';
import { ShareResult } from './share_result';

interface ShareModalState {
    activeKey: string;
}

@observer
export class ShareModal extends Component<StoreProps, ShareModalState> {
    private img: ShareImage;

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'data',
        };
    }

    switchTab = (key: string) => {
        this.setState({ activeKey: key });
    };

    render() {
        const { store } = this.props;
        const { activeKey } = this.state;
        return (
            <Modal
                show={store.showShare}
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
                size="lg"
                onHide={() => { store.showShare = false; }}
            >
                <Modal.Header>
                    <Nav appearance="subtle" activeKey={activeKey} onSelect={this.switchTab}>
                        <Nav.Item eventKey="image">
                            分享为图片
                        </Nav.Item>
                        <Nav.Item eventKey="data">
                            导出属性数据
                        </Nav.Item>
                        <Nav.Item eventKey="iframe" disabled>
                            嵌入到网页 (Coming Soon)
                        </Nav.Item>
                        <Nav.Item eventKey="social" disabled>
                            分享到社交媒体 (Coming Soon)
                        </Nav.Item>
                    </Nav>
                </Modal.Header>
                {activeKey === 'image' && <ShareImage store={$store} />}
                {activeKey === 'data' && <ShareResult store={$store} />}
            </Modal>
        );
    }
}
