import { Lambda, observe } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { HelpBlock, Tooltip, Whisper } from 'rsuite';
import { TalentRecommend } from '../../model/talent';
import { TalentService } from '../../service/talent_service';
import { $store, StoreProps } from '../../store';
import './talent_recommends.less';

interface TalentRecommendsState {
    recommends: TalentRecommend[];
}

@observer
export class TalentRecommends extends Component<StoreProps, TalentRecommendsState> {
    private disposer: Lambda;
    constructor(props) {
        super(props);
        this.state = {
            recommends: [],
        };
    }

    componentDidMount() {
        this.updateRecommend();
        this.disposer = observe($store, 'kungfu', this.updateRecommend);
    }

    componentWillUnmount() {
        this.disposer();
    }

    updateRecommend = () => {
        TalentService.listRecommends(this.props.store.kungfu).then((res) => {
            this.setState({ recommends: res.map((r) => r.attributes) });
        });
    };

    setRecommend(recommend: TalentRecommend) {
        const { store } = this.props;
        store.talents = recommend.talents;
    }

    render() {
        const { recommends } = this.state;
        return (
            <>
                <HelpBlock>点击奇穴直接应用</HelpBlock>
                {recommends.map((recommend) => (
                    <div className="talent-recommend" key={`recommend-${recommend.id}`} onClick={() => { this.setRecommend(recommend); }}>
                        <div className="recommend-name">{recommend.name}</div>
                        <div className="recommend-talents">
                            <div>
                                {recommend.talents.slice(0, 6).map((talent) => (
                                    <Whisper
                                        trigger="hover"
                                        speaker={<Tooltip>{talent.name}</Tooltip>}
                                        placement="top"
                                    >
                                        <img src={`https://icons.j3pz.com/${talent.icon}.png`} alt={talent.name} />
                                    </Whisper>
                                ))}
                            </div>
                            <div>
                                {recommend.talents.slice(6, 12).map((talent) => (
                                    <Whisper
                                        trigger="hover"
                                        speaker={<Tooltip>{talent.name}</Tooltip>}
                                        placement="bottom"
                                    >
                                        <img src={`https://icons.j3pz.com/${talent.icon}.png`} alt={talent.name} />
                                    </Whisper>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }
}
