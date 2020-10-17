import { plainToClass, Type } from 'class-transformer';
import { KungFu } from './base';
import { CaseScheme } from './case_scheme';
import { Enhance } from './enhance';
import { Equip } from './equip';

export class CaseInfo {
    public id: string;
    public name: string;
    public kungfu: KungFu;
    public published: boolean;
}

export class CaseDetail extends CaseInfo {
    @Type(() => Equip)
    public equip: Equip[];

    @Type(() => Enhance)
    public enhance: Enhance[];

    @Type(() => CaseScheme)
    public scheme: CaseScheme;

    static fromJson(object: Object): CaseDetail {
        const detail = plainToClass(CaseDetail, object);
        return detail;
    }
}
