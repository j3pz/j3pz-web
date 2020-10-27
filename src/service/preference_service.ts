import axios from 'axios';
import { Preference } from '../model/preference';
import { $store } from '../store';
import { ENDPOINT, errorHandler } from './base';

export class PreferenceService {
    static async update(patch: Partial<Preference> = {}): Promise<boolean> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const res = await axios.put(`${ENDPOINT}/user/preference`, patch, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }
}
