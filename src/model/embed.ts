import { Attribute, AttributeDecorator } from './attribute';

export class EmbedInfo {
    public count: number = 0;
    public attributes: [Attribute, AttributeDecorator][] = [];
}
export interface EmbedOps {
    index: number;
    level: number;
}
