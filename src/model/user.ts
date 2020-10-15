import { plainToClass } from 'class-transformer';

export class User {
    activate: boolean;
    email: string;
    name: string;
    syncLimit: number;
    token: string;
    uid: string;

    static fromJson(json: Object): User {
        const user = plainToClass(User, json);
        return user;
    }
}
