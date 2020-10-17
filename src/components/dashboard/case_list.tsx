import { Link } from 'gatsby';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { FlexboxGrid, List } from 'rsuite';
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

@observer
export class CaseList extends Component<StoreProps> {
    static cache: CaseInfo[] = [];
    private allKungFu: Resource<KungFuInfo>[] = [];

    componentDidMount() {
        CaseService.getCaseList().then((cases) => {
            CaseList.cache = cases.map((_) => _.attributes);
            this.forceUpdate();
        });
        KungFuService.getKungFuList().then((res) => {
            this.allKungFu = res;
            this.forceUpdate();
        });
    }

    getIcon = (kungfu: KungFu) => {
        const kungFuInfo = this.allKungFu.find((info) => info.id === kungfu);
        if (kungFuInfo) return schoolAbbrMap[kungFuInfo.attributes.school];
        return '';
    };

    render() {
        const list = CaseList.cache;
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
                                    <div className="case-more">
                                        <i className="fas fa-ellipsis-h" />
                                    </div>
                                </FlexboxGridItem>
                                {/* Update Time */}
                                <FlexboxGridItem style={{ color: '#5A5A5B', flex: 1 }} className="case-item-col">
                                    Update Time
                                    <i className={`jx3icon jx3icon-${this.getIcon(c.kungfu)} school-icon`} />
                                </FlexboxGridItem>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }
}
