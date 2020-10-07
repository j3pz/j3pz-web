import { plainToClass } from 'class-transformer';
import { StoneAttribute } from './stone_attribute';

export class Stone {
    public id: number;
    public name: string;
    public icon: string;
    public level: number;
    public attributes: StoneAttribute[];

    static fromJson(json: Object): Stone {
        const stone = plainToClass(Stone, json);
        return stone;
    }
}
