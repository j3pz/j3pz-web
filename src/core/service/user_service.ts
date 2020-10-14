import axios from 'axios';
import { Resource } from '../model/resource';
import { User } from '../model/user';
import { ENDPOINT, errorHandler } from './base';

export class UserService {
    static async login(email: string, password: string): Promise<Resource<User>> {
        const res = await axios.post(`${ENDPOINT}/auth/login`, {
            email,
            password,
        }).catch(errorHandler);
        return res?.data.data;
    }

    static async getUser(token: string, hasNotify: boolean): Promise<Resource<User> | false> {
        if (token) {
            const res = await axios.get(`${ENDPOINT}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            }).catch((e) => {
                if (hasNotify) {
                    errorHandler(e);
                }
                return { data: { data: false } };
            });
            return res?.data.data;
        }
        return false;
    }
}
