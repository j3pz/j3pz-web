import { EmbedStoneType } from './base';

export class EmbedInfo {
    public holes: number = 0;
    public stones: EquipEmbed[] = [];
}

export interface EquipEmbed {
    type: EmbedStoneType;
    level: number;
    attribute: string;
}
