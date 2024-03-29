import axios from 'axios';
import { KungFu } from '../model/base';
import { Resource } from '../model/resource';
import { Talent, TalentRecommend } from '../model/talent';
import { ENDPOINT, errorHandler } from './base';

export class TalentService {
    static async listTalent(kungfu: KungFu): Promise<Resource<Talent>[]> {
        const res = await axios.get(`${ENDPOINT}/talent`, {
            params: {
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async listRecommends(kungfu: KungFu): Promise<Resource<TalentRecommend>[]> {
        const res = await axios.get(`${ENDPOINT}/talent-recommend`, {
            params: {
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }
}
