import axios from 'axios';
import { transaction } from 'mobx';
import { Position } from '../model/base';
import { CaseDetail, CaseInfo } from '../model/case_info';
import { Resource } from '../model/resource';
import { $store } from '../store';
import { directError, ENDPOINT, errorHandler } from './base';
import { CollectionService } from './collection_service';

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
        return res?.data.data ?? null;
    }

    static applyToStore(detail: CaseDetail) {
        transaction(() => {
            detail.scheme.equip.forEach((equipScheme) => {
                const equip = detail.equip.find((e) => e.id === equipScheme.id);
                const enhance = detail.enhance.find((e) => e.id === equipScheme.enhance);
                if (equip) {
                    const nextEquip = equip.clone()
                        .setStrengthLevel(equipScheme.strengthen)
                        .setEnhance(enhance)
                        .setEmbed(0, equipScheme.embed[0]?.level ?? -1)
                        .setEmbed(1, equipScheme.embed[1]?.level ?? -1)
                        .setEmbed(2, equipScheme.embed[2]?.level ?? -1);
                    if (equip.category !== 'ring') {
                        $store.equips[equip.category as Position] = nextEquip;
                    } else if (!$store.equips.ring_1) {
                        $store.equips.ring_1 = nextEquip;
                    } else {
                        $store.equips.ring_2 = nextEquip;
                    }
                }
            });
            CollectionService.updateCollection($store);
        });
    }
}
