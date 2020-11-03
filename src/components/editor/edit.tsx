import React, { Component } from 'react';
import {
    Nav, FlexboxGrid, Alert, Toggle, Notification, IconButton, Whisper, Popover,
} from 'rsuite';
import { observer } from 'mobx-react';
import { transaction } from 'mobx';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareAlt } from '@fortawesome/pro-light-svg-icons';
import { faDrawCircle, faListUl, faSwords } from '@fortawesome/pro-regular-svg-icons';
import { $store, StoreProps, AppTab } from '../../store';
import { EquipTab } from '../equip_tab/equip_tab';
import { CaseTab } from '../case_tab/case_tab';
import { SchoolDropdown } from '../school_dropdown/school_dropdown';
import { CaseService } from '../../service/case_service';
import { CaseDetail } from '../../model/case_info';
import { EditorViewer } from '../viewer/editor_viewer';
import { UserService } from '../../service/user_service';
import { User } from '../../model/user';
import { EmbedService } from '../../service/embed_service';
import { ShareModal } from '../share/share_modal';
import { SettingsService } from '../../service/settings_service';
import { PlatformUtil } from '../../utils/platform_utils';
import '../../css/bottom-bar.less';

@observer
export class CoreEdit extends Component<StoreProps> {
    componentDidMount() {
        const caseId = window.location.hash.replace('#', '');
        if (caseId) {
            CaseService.getCase(caseId).then((res) => {
                if (res) {
                    const detail = CaseDetail.fromJson(res.attributes);
                    CaseService.applyToStore(detail);
                    EmbedService.update($store);
                } else {
                    navigate('/dashboard');
                }
            });
        } else {
            Alert.warning('这是一个临时界面，配装方案仅能在当前设备上进行修改而无法保存。', 10000);
        }
        if (!this.props.store.user) {
            UserService.getUser(false).then((res) => {
                if (res) {
                    transaction(() => {
                        $store.user = User.fromJson(res.attributes);
                        $store.settings.autoStrengthen = !!res.attributes.preference.strengthen;
                        $store.settings.autoEmbed = res.attributes.preference.magicStoneLevel;
                    });
                }
            });
        }
        SettingsService.getAnnouncement().then((res) => {
            const checkedVersion = localStorage.getItem('announcement');
            if (res?.version && res?.version !== checkedVersion) {
                Notification.open({
                    key: 'announcement',
                    title: res.title ?? '公告',
                    description: res.content,
                    duration: 0,
                    placement: 'bottomEnd',
                });
                localStorage.setItem('announcement', res.version);
            }
        });
    }

    switchTab = (key: AppTab) => {
        if (key in AppTab) {
            const { store } = this.props;
            store.tab = key;
        }
    };

    onCaseEvent = (key: string) => {
        const { store } = this.props;
        switch (key) {
            case 'save':
                CaseService.save($store).then((res) => {
                    if (res) {
                        Alert.success('保存成功');
                    }
                });
                break;
            case 'share':
                store.showShare = true;
                break;
            default: break;
        }
    };

    render() {
        const { store } = this.props;
        const isMobile = PlatformUtil.isMobile();
        return (
            <main
                style={{
                    paddingTop: 56,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    paddingBottom: isMobile ? 60 : 0,
                }}
            >
                <FlexboxGrid style={{ height: '100%', flexWrap: 'nowrap' }}>
                    <FlexboxGrid.Item colspan={isMobile ? 24 : 18} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        { !isMobile && (
                        <Nav activeKey={store.tab} appearance="subtle" onSelect={this.switchTab}>
                            <SchoolDropdown store={$store} />
                            <Nav.Item eventKey={AppTab.CASE} style={{ float: 'right' }}>方案设置</Nav.Item>
                            <Nav.Item eventKey={AppTab.EQUIP} style={{ float: 'right' }}>装备设置</Nav.Item>
                        </Nav>
                        )}
                        { store.tab === AppTab.EQUIP && <EquipTab store={$store} />}
                        { store.tab === AppTab.CASE && <CaseTab />}
                    </FlexboxGrid.Item>
                    {!isMobile && (
                    <FlexboxGrid.Item
                        style={{
                            borderLeft: '1px solid #CCCCCC',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 361,
                        }}
                        colspan={6}
                    >
                        <Nav appearance="subtle" style={{ height: 36 }} onSelect={this.onCaseEvent}>
                            {/* <Nav.Item icon={<FontAwesomeIcon icon={faUndo} />} />
                            <Nav.Item icon={<FontAwesomeIcon icon={faRedo} />} /> */}
                            <Nav.Item icon={<FontAwesomeIcon icon={faSave} size="lg" />} eventKey="save"> 保存</Nav.Item>
                            {/* <Nav.Item icon={<FontAwesomeIcon icon={faFolderOpen} />} /> */}
                            <Nav.Item icon={<FontAwesomeIcon icon={faShareAlt} size="lg" />} eventKey="share"> 导出</Nav.Item>
                            <Nav.Item style={{ float: 'right' }}>
                                <Toggle
                                    checked={store.showAllAttributes}
                                    checkedChildren="所有"
                                    unCheckedChildren="相关"
                                    onChange={(checked) => { store.showAllAttributes = checked; }}
                                    style={{ marginRight: 4 }}
                                />
                                查看所有属性
                            </Nav.Item>
                        </Nav>
                        { store.kungfuMeta && <EditorViewer store={$store} />}
                    </FlexboxGrid.Item>
                    )}
                </FlexboxGrid>
                <ShareModal store={$store} />
                { isMobile && (
                    <FlexboxGrid className="bottom-bar" justify="space-around">
                        <FlexboxGrid.Item>
                            <div
                                className={`bottom-bar-item ${store.tab === AppTab.EQUIP ? 'active' : ''}`}
                                onClick={() => { this.switchTab(AppTab.EQUIP); }}
                            >
                                <FontAwesomeIcon icon={faSwords} size="2x" />
                                <span>装备设置</span>
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <Whisper
                                trigger="click"
                                enterable
                                placement="top"
                                speaker={(
                                    <Popover>
                                        <EditorViewer store={$store} />
                                    </Popover>
                                )}
                            >
                                <IconButton
                                    icon={<FontAwesomeIcon icon={faListUl} size="2x" />}
                                    circle
                                    size="lg"
                                    appearance="primary"
                                    className="new-case"
                                    // onClick={this.showNewCaseGuide}
                                />
                            </Whisper>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item>
                            <div
                                className={`bottom-bar-item ${store.tab === AppTab.CASE ? 'active' : ''}`}
                                onClick={() => { this.switchTab(AppTab.CASE); }}
                            >
                                <FontAwesomeIcon icon={faDrawCircle} size="2x" />
                                <span>方案设置</span>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                )}

                { isMobile && (
                    <IconButton
                        appearance="primary"
                        size="lg"
                        icon={<FontAwesomeIcon icon={faSave} size="lg" />}
                        onClick={() => this.onCaseEvent('save')}
                        circle
                        style={{
                            position: 'absolute',
                            right: 12,
                            bottom: 72,
                            zIndex: 9,
                            boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.7)',
                        }}
                    />
                )}
            </main>
        );
    }
}
