/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

export enum SourceType {
    RAID = 'raid', // 副本、掉落
    REPUTATION = 'reputation', // 声望
    REDEEM = 'redeem', // 道具兑换（威望、名剑）
    ACTIVITY = 'activity', // 常规活动
    OTHER = 'other', // 其他类型
}

export const redeemType = {
    contribution: '帮贡',
    chivalry: '侠义',
    prestige_fiend: '恶人谷威望',
    prestige_virtue: '浩气盟威望',
    arena: '名剑竞技场',
    store: '其他商店',
    set: '套装兑换',
    unknown: '未知兑换来源',
};

class GameMap {
    public id: number;
    public name: string;
}

class Boss {
    public id: number;
    public name: string;
    public map: GameMap;
}


class Reputation {
    public id: number;
    public name: string;
    public level: string;
}

export class Source {
    public id: number;
    public comment?: string;
    public type: SourceType;
    @Type(() => Boss)
    public boss: Boss;
    @Type(() => Reputation)
    public reputation: Reputation;
    public redeem: keyof typeof redeemType;
    public activity: string;
}
