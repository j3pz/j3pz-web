import React, { Component } from 'react';
import { Nav, FlexboxGrid, Alert } from 'rsuite';
import { observer } from 'mobx-react';
import { transaction } from 'mobx';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faShareAlt } from '@fortawesome/pro-light-svg-icons';
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
        return (
            <main
                style={{
                    paddingTop: 56,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <FlexboxGrid style={{ height: '100%', flexWrap: 'nowrap' }}>
                    <FlexboxGrid.Item colspan={18} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Nav activeKey={store.tab} appearance="subtle" onSelect={this.switchTab}>
                            <SchoolDropdown store={$store} />
                            <Nav.Item eventKey={AppTab.CASE} style={{ float: 'right' }}>方案设置</Nav.Item>
                            <Nav.Item eventKey={AppTab.EQUIP} style={{ float: 'right' }}>装备设置</Nav.Item>
                        </Nav>
                        { store.tab === AppTab.EQUIP && <EquipTab store={$store} />}
                        { store.tab === AppTab.CASE && <CaseTab />}
                    </FlexboxGrid.Item>
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
                            <Nav.Item icon={<FontAwesomeIcon icon={faSave} />} eventKey="save" />
                            {/* <Nav.Item icon={<FontAwesomeIcon icon={faFolderOpen} />} /> */}
                            <Nav.Item icon={<FontAwesomeIcon icon={faShareAlt} />} eventKey="share" />
                        </Nav>
                        { store.kungfuMeta && <EditorViewer store={$store} />}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <ShareModal store={$store} />
            </main>
        );
    }
}
