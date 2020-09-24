import axios from 'axios';
import { KungFu } from '../model/base';
import { Resource } from '../model/resource';
import Talent from '../model/talent';
import ENDPOINT from './base';

export default class TalentService {
    static async listTalent(kungfu: KungFu): Promise<Resource<Talent>[]> {
        const res = await axios.get(`${ENDPOINT}/talent`, {
            params: {
                kungfu,
            },
        });
        return res.data.data;
    }
}
