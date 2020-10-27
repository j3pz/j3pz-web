import { plainToClass } from 'class-transformer';
import { Preference } from './preference';

export class User {
    activate: boolean;
    email: string;
    name: string;
    syncLimit: number;
    token: string;
    uid: string;
    preference: Preference;

    static fromJson(json: Object): User {
        const user = plainToClass(User, json);
        return user;
    }
}
