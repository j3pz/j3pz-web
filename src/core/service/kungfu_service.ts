import axios from 'axios';
import { KungFuInfo } from '../model/kungfu';
import { Resource } from '../model/resource';
import { ENDPOINT, errorHandler } from './base';

export default class KungFuService {
    static async getKungFuList(): Promise<Resource<KungFuInfo>[]> {
        const res = await axios.get(`${ENDPOINT}/kungfu`).catch(errorHandler);
        return res?.data.data ?? [];
    }
}
