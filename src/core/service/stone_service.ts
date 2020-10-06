import axios from 'axios';
import { KungFu } from '../model/base';
import { ENDPOINT, errorHandler } from './base';

export class StoreService {
    static async listTags(kungfu: KungFu): Promise<any[]> {
        const res = await axios.get(`${ENDPOINT}/stone-attribute`, {
            params: {
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }
}
