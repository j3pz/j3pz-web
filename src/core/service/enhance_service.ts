import axios from 'axios';
import { Category, KungFu } from '../model/base';
import { Enhance, SimpleEnhance } from '../model/enhance';
import { Resource } from '../model/resource';
import { ENDPOINT, errorHandler } from './base';

export class EnhanceService {
    static async listEnhance(category: Category, kungfu: KungFu): Promise<Resource<SimpleEnhance>[]> {
        const res = await axios.get(`${ENDPOINT}/enhance`, {
            params: {
                category,
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async getEnhance(id: number): Promise<Resource<Enhance>> {
        const res = await axios.get(`${ENDPOINT}/enhance/${id}`).catch(errorHandler);
        return res?.data.data ?? {};
    }
}
