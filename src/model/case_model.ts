import { KungFu } from './base';
import { CaseInfo } from './case_info';
import { CaseScheme, EquipScheme } from './case_scheme';

export class CaseModel implements CaseScheme, CaseInfo {
    // CaseInfo
    public name: string;
    public kungfu: KungFu;
    public published: boolean;
    public lastUpdate: string;

    // CaseScheme
    public equip: EquipScheme[] = [];
    public effect: number[] = [];
    public talent: number[] = [];

    constructor(public id: string) {}
}
