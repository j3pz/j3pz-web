import { plainToClass } from 'class-transformer';
import { KungFu } from './base';

export default class Talent {
    public id: number;
    public kungfu: KungFu;
    public index: number;
    public name: string;
    public description: string;
    public icon: number;
    public version: string;

    // public effect?: Effect;

    static fromJson(json: Object): Talent {
        const talent = plainToClass(Talent, json);
        return talent;
    }

    public setIndex(val: number): Talent {
        this.index = val;
        return this;
    }
}
