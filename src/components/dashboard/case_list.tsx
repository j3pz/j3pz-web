import { Link } from 'gatsby';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Alert,
    FlexboxGrid, List, Tooltip, Whisper,
} from 'rsuite';
import { format, isSameDay, isSameYear } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/pro-solid-svg-icons';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { CaseInfo } from '../../model/case_info';
import { CaseService } from '../../service/case_service';
import { StoreProps } from '../../store';
import { KungFu, schoolAbbrMap } from '../../model/base';
import { KungFuInfo } from '../../model/kungfu';
import { Resource } from '../../model/resource';
import { KungFuService } from '../../service/kungfu_service';
import '../../css/icon.less';
import './case_list.less';
import { schoolIcons } from '../../utils/school_icon';
import { DeleteConfirm } from './delete_confirm';
import { RenameCase } from './rename_case';

interface CaseListState {
    del: boolean;
    rename: boolean;
    name: string;
    id: string;
}

@observer
export class CaseList extends Component<StoreProps, CaseListState> {
    static cache: CaseInfo[] = [];
    private allKungFu: Resource<KungFuInfo>[] = [];

    constructor(props) {
        super(props);
        this.state = {
            del: false,
            rename: false,
            name: '',
            id: '',
        };
    }

    componentDidMount() {
        this.updateList();
        KungFuService.getKungFuList().then((res) => {
            this.allKungFu = res;
            this.forceUpdate();
        });
    }

    private updateList() {
        CaseService.getCaseList().then((cases) => {
            CaseList.cache = cases.map((_) => _.attributes);
            this.forceUpdate();
        });
    }

    private getIcon = (kungfu: KungFu) => {
        const kungFuInfo = this.allKungFu.find((info) => info.id === kungfu);
        if (kungFuInfo) return schoolAbbrMap[kungFuInfo.attributes.school];
        return '';
    };

    private getTime = (date: string) => {
        if (!date) return '';
        const now = new Date();
        const updateTime = new Date(date);
        if (isSameDay(now, updateTime)) {
            return format(updateTime, 'HH:mm');
        }
        if (isSameYear(now, updateTime)) {
            return format(updateTime, 'MM月dd日 HH:mm');
        }
        return format(updateTime, 'yyyy年MM月dd日 HH:mm');
    };

    private deleteCase = (caseInfo: CaseInfo) => {
        this.setState({
            del: true,
            name: caseInfo.name,
            id: caseInfo.id,
        });
    };

    private doDelete = () => {
        const { id } = this.state;
        CaseService.delete(id).then((res) => {
            if (res) {
                Alert.success('删除成功');
                this.updateList();
                this.closeModal();
            }
        });
    };

    private renameCase = (caseInfo: CaseInfo) => {
        this.setState({
            rename: true,
            name: caseInfo.name,
            id: caseInfo.id,
        });
    };

    private doRename = (name: string) => {
        const { id } = this.state;
        CaseService.changeCaseName(id, name).then((res) => {
            if (res) {
                Alert.success('更名成功');
                this.updateList();
                this.closeModal();
            }
        });
    };

    private closeModal = () => {
        this.setState({
            del: false,
            rename: false,
        });
    };

    render() {
        const list = CaseList.cache;
        const { del, rename, name } = this.state;
        return (
            <div>
                <FlexboxGrid style={{ padding: '8px 36px' }}>
                    <FlexboxGridItem style={{ width: 60 }} />
                    <FlexboxGridItem colspan={12}>名称</FlexboxGridItem>
                    <FlexboxGridItem colspan={6}>更新时间</FlexboxGridItem>
                </FlexboxGrid>
                <List hover size="lg">
                    {list.map((c) => (
                        <List.Item key={`case-${c.id}`} style={{ paddingLeft: 36, paddingRight: 36 }} className="case-item">
                            <FlexboxGrid align="middle">
                                {/* Icon */}
                                <FlexboxGridItem style={{ width: 60 }}>
                                    <img
                                        src={`https://images.j3pz.com/imgs/school/${schoolIcons[c.kungfu]}.png`}
                                        alt={`${c.kungfu}图标`}
                                        className="kungfu-icon"
                                    />
                                </FlexboxGridItem>
                                {/* Name */}
                                <FlexboxGridItem colspan={12} className="case-item-col">
                                    <div style={{ fontSize: 14, color: '#5A5A5B' }}>{c.kungfu}</div>
                                    <Link to={`/app#${c.id}`} style={{ fontSize: 20, color: '#333334' }}>{c.name}</Link>
                                    <div className="case-more" style={{ right: 36 }}>
                                        <Whisper
                                            trigger="hover"
                                            placement="top"
                                            speaker={<Tooltip>删除</Tooltip>}
                                        >
                                            <FontAwesomeIcon icon={faTrash} onClick={() => { this.deleteCase(c); }} />
                                        </Whisper>
                                    </div>
                                    <div className="case-more" style={{ right: 72 }}>
                                        <Whisper
                                            trigger="hover"
                                            placement="top"
                                            speaker={<Tooltip>改名</Tooltip>}
                                        >
                                            <FontAwesomeIcon icon={faEdit} onClick={() => { this.renameCase(c); }} />
                                        </Whisper>
                                    </div>
                                </FlexboxGridItem>
                                {/* Update Time */}
                                <FlexboxGridItem style={{ color: '#5A5A5B', flex: 1 }} className="case-item-col">
                                    {this.getTime(c.lastUpdate)}
                                    <i className={`jx3icon jx3icon-${this.getIcon(c.kungfu)} school-icon`} />
                                </FlexboxGridItem>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                    <DeleteConfirm show={del} onClose={this.closeModal} onConfirm={this.doDelete} name={name} />
                    <RenameCase show={rename} onClose={this.closeModal} onConfirm={this.doRename} name={name} />
                </List>
            </div>
        );
    }
}
