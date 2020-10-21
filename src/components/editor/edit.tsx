import React, { Component } from 'react';
import { Nav, FlexboxGrid } from 'rsuite';
import { observer } from 'mobx-react';
import { navigate } from 'gatsby';
import { $store, StoreProps, AppTab } from '../../store';
import { EquipTab } from '../equip_tab/equip_tab';
import { CaseTab } from '../case_tab/case_tab';
import { SchoolDropdown } from '../school_dropdown/school_dropdown';
import { CaseService } from '../../service/case_service';
import { CaseDetail } from '../../model/case_info';
import { EditorViewer } from '../viewer/editor_viewer';

@observer
export class CoreEdit extends Component<StoreProps> {
    componentDidMount() {
        const caseId = window.location.hash.replace('#', '');
        if (caseId) {
            CaseService.getCase(caseId).then((res) => {
                if (res) {
                    const detail = CaseDetail.fromJson(res.attributes);
                    CaseService.applyToStore(detail);
                } else {
                    navigate('/dashboard');
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
                        <Nav appearance="subtle" style={{ height: 36 }}>
                            <Nav.Item icon={<i className="fal fa-undo" />} />
                            <Nav.Item icon={<i className="fal fa-redo" />} />
                            <Nav.Item icon={<i className="fal fa-save" />} />
                            <Nav.Item icon={<i className="fal fa-folder-open" />} />
                            <Nav.Item icon={<i className="fal fa-share-alt" />} />
                        </Nav>
                        { store.kungfuMeta && <EditorViewer store={$store} />}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </main>
        );
    }
}
