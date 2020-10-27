import { plainToClass, Type } from 'class-transformer';
import { KungFu } from './base';
import { CaseScheme } from './case_scheme';
import { Enhance } from './enhance';
import { Equip } from './equip';
import { Talent } from './talent';

export class CaseInfo {
    public id: string;
    public name: string;
    public kungfu: KungFu;
    public published: boolean;
    public lastUpdate: string;
}

export class CaseDetail extends CaseInfo {
    @Type(() => Equip)
    public equip: Equip[];

    @Type(() => Enhance)
    public enhance: Enhance[];

    @Type(() => Talent)
    public talent: Talent[];

    @Type(() => CaseScheme)
    public scheme: CaseScheme;

    static fromJson(object: Object): CaseDetail {
        const detail = plainToClass(CaseDetail, object);
        return detail;
    }
}
