/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

export enum SourceType {
    RAID = 'raid', // 副本、掉落
    REPUTATION = 'reputation', // 声望
    REDEEM = 'redeem', // 道具兑换（威望、名剑）
    ACTIVITY = 'activity', // 常规活动
    OTHER = 'other', // 其他类型
}

export enum RedeemType {
    CONTRIBUTION = 'contribution', // 帮贡
    CHIVALRY = 'chivalry', // 侠义
    PRESTIGE_FIEND = 'prestige_fiend', // 恶人谷威望
    PRESTIGE_VIRTUE = 'prestige_virtue', // 浩气盟威望
    ARENA = 'arena', // 名剑竞技场
    STORE = 'store', // 其他商店
    SET = 'set', // 套装兑换
    UNKNOWN = 'unknown', // 未知兑换来源
}

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

export default class Source {
    public id: number;
    public comment?: string;
    public type: SourceType;
    @Type(() => Boss)
    public boss: Boss;
    @Type(() => Reputation)
    public reputation: Reputation;
    public redeem: RedeemType;
    public activity: string;
}
