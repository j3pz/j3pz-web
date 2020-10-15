import axios from 'axios';
import { Category, KungFu } from '../model/base';
import { Equip } from '../model/equip';
import { Resource } from '../model/resource';
import { SimpleEquip } from '../model/simple_equip';
import { ENDPOINT, errorHandler } from './base';

export class EquipService {
    static async listEquip(category: Category, kungfu: KungFu): Promise<Resource<SimpleEquip>[]> {
        const res = await axios.get(`${ENDPOINT}/equip`, {
            params: {
                category,
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async getEquip(id: number): Promise<Resource<Equip>> {
        const res = await axios.get(`${ENDPOINT}/equip/${id}`).catch(errorHandler);
        return res?.data.data ?? {};
    }
}
