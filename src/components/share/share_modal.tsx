import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Modal, Nav } from 'rsuite';
import { $store, StoreProps } from '../../store';
import { ShareImage } from './share_image';

@observer
export class ShareModal extends Component<StoreProps> {
    private img: ShareImage;

    render() {
        const { store } = this.props;
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
                    <Nav appearance="subtle" activeKey="image">
                        <Nav.Item eventKey="image">
                            分享为图片
                        </Nav.Item>
                        <Nav.Item eventKey="iframe" disabled>
                            嵌入到网页 (Coming Soon)
                        </Nav.Item>
                        <Nav.Item eventKey="social" disabled>
                            分享到社交媒体 (Coming Soon)
                        </Nav.Item>
                    </Nav>
                </Modal.Header>
                <Modal.Body>
                    <ShareImage store={$store} ref={(node) => { this.img = node!; }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.img.saveImage(); }} appearance="primary">下载图片</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
