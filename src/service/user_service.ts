import axios from 'axios';
import { Resource } from '../model/resource';
import { User } from '../model/user';
import { $store } from '../store';
import { directError, ENDPOINT, errorHandler } from './base';
import { GA_MEASUREMENT_ID } from './report_service';

export class UserService {
    static async login(email: string, password: string): Promise<Resource<User> | false> {
        if (!email || !password) return false;
        const res = await axios.post(`${ENDPOINT}/auth/login`, {
            email,
            password,
        }).catch(errorHandler);
        return res?.data.data;
    }

    static async signup(email: string, password: string, name: string): Promise<Resource<User> | false> {
        if (!email || !password || !name) return false;
        const res = await axios.post(`${ENDPOINT}/auth/signup`, {
            email,
            password,
            name,
        }).catch(errorHandler);
        return res?.data.data;
    }

    static async getUser(hasNotify: boolean): Promise<Resource<User> | false> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const res = await axios.get(`${ENDPOINT}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch((e) => {
            if (hasNotify) {
                errorHandler(e);
            }
            return { data: { data: false } };
        });
        try {
            localStorage.setItem('token', res?.data.data.attributes.token);
            gtag('config', GA_MEASUREMENT_ID, {
                user_id: res?.data.data.id,
            });
        } catch (e) { /* do nothing */ }
        return res?.data.data;
    }

    static async updateUser(patch: Partial<User & { oldPassword: string; password: string }>): Promise<boolean> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const res = await axios.put(`${ENDPOINT}/user`, patch, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }

    static async sendVerify(): Promise<boolean> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return false;
        }
        const res = await axios.post(`${ENDPOINT}/user/verify`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }

    static async verify(permalink: string, token: string): Promise<Resource<User>> {
        const res = await axios.get(`${ENDPOINT}/user/verify/${permalink}/${token}`).catch(errorHandler);
        return res?.data.data ?? {};
    }

    static async requestReset(email: string): Promise<boolean> {
        const res = await axios.get(`${ENDPOINT}/user/reset`, {
            params: { email },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }

    static async resetPassword(permalink: string, token: string, password: string, dryRun: boolean): Promise<boolean> {
        const res = await axios.post(`${ENDPOINT}/user/reset`, {
            permalink,
            token,
            password,
            dryRun,
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }
}
