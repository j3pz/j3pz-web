import axios from 'axios';
import { CaseInfo } from '../model/case_info';
import { Resource } from '../model/resource';
import { ENDPOINT, errorHandler } from './base';

export class CaseService {
    static async getCaseList(token: string): Promise<Resource<CaseInfo>[]> {
        const res = await axios.get(`${ENDPOINT}/case`, {
            params: {
                detail: 0,
            },
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }
}
