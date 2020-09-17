import axios from 'axios';
import { Category, KungFu } from '../model/base';
import ENDPOINT from './base';

export default class EquipService {
    static async listEquip(category: Category, kungfu: KungFu) {
        const res = await axios.get(`${ENDPOINT}/equip`, {
            params: {
                category,
                kungfu,
            },
        });
        return res.data;
    }

    static async getEquip(id: number) {
        const res = await axios.get(`${ENDPOINT}/equip/${id}`);
        return res.data;
    }
}
