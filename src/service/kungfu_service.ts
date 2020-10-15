import axios from 'axios';
import { KungFuInfo } from '../model/kungfu';
import { Resource } from '../model/resource';
import { ENDPOINT, errorHandler } from './base';

export class KungFuService {
    static allKungFu: Resource<KungFuInfo>[] = [];

    static async getKungFuList(): Promise<Resource<KungFuInfo>[]> {
        const res = await axios.get(`${ENDPOINT}/kungfu`).catch(errorHandler);
        const list = res?.data.data ?? [];
        this.allKungFu = list;
        return list;
    }
}
