import axios from 'axios';
import { Category, KungFu } from '../model/base';
import { Equip, SimpleEquip } from '../model/equip';
import { Resource } from '../model/resource';
import ENDPOINT from './base';

export default class EquipService {
    static async listEquip(category: Category, kungfu: KungFu): Promise<Resource<SimpleEquip>[]> {
        const res = await axios.get(`${ENDPOINT}/equip`, {
            params: {
                category,
                kungfu,
            },
        });
        return res.data.data;
    }

    static async getEquip(id: number): Promise<Resource<Equip>> {
        const res = await axios.get(`${ENDPOINT}/equip/${id}`);
        return res.data.data;
    }
}
