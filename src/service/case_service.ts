import axios from 'axios';
import { transaction } from 'mobx';
import { Position } from '../model/base';
import { CaseDetail, CaseInfo } from '../model/case_info';
import { Resource } from '../model/resource';
import { $store } from '../store';
import { directError, ENDPOINT, errorHandler } from './base';

export class CaseService {
    static async getCaseList(): Promise<Resource<CaseInfo>[]> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return [];
        }
        const res = await axios.get(`${ENDPOINT}/case`, {
            params: {
                detail: 0,
            },
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async getCase(id: string): Promise<Resource<CaseDetail> | null> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return null;
        }
        const res = await axios.get(`${ENDPOINT}/case/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data ?? {};
    }

    static applyToStore(detail: CaseDetail) {
        transaction(() => {
            detail.scheme.equip.forEach((equipScheme) => {
                const equip = detail.equip.find((e) => e.id === equipScheme.id);
                if (equip) {
                    if (equip.category !== 'ring') {
                        $store.equips[equip.category as Position] = equip.clone();
                    }
                }
            });
        });
    }
}
