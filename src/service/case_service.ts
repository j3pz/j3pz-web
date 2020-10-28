import axios from 'axios';
import { transaction } from 'mobx';
import { KungFu, Position } from '../model/base';
import { CaseDetail, CaseInfo } from '../model/case_info';
import { CaseModel } from '../model/case_model';
import { EquipScheme } from '../model/case_scheme';
import { Resource } from '../model/resource';
import { Talent } from '../model/talent';
import { $store, EditState } from '../store';
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
            $store.caseInfo = {
                id: detail.id,
                name: detail.name,
            };
            $store.equips = {};
            $store.stones = {};
            $store.kungfu = detail.kungfu;
            $store.kungfuMeta = detail.kungfuMeta;
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

                    if (equipScheme.stone) {
                        const stone = detail.stone.find((s) => s.id === equipScheme.stone);
                        if (stone) {
                            $store.stones[equip.category as Position] = stone;
                        }
                    }
                }
            });
            CollectionService.updateCollection($store);

            $store.talents = detail.scheme.talent.map((talentScheme, i) => {
                const talent = detail.talent.find((t) => t.id === talentScheme);
                return (talent ?? Talent.emptyTalent(detail.kungfu)).setIndex(i);
            });
        });
    }

    static async changeCaseName(id: string, name: string): Promise<boolean> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return false;
        }
        await axios.patch(`${ENDPOINT}/case/${id}`, {
            name,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return true;
    }

    static async save(store: EditState) {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return false;
        }

        const caseModel = new CaseModel(store.caseInfo.id);
        caseModel.name = store.caseInfo.name;
        caseModel.kungfu = store.kungfu;
        caseModel.published = false;

        Object.values(store.equips).forEach((equip) => {
            if (equip) {
                const scheme: EquipScheme = {
                    id: equip.id,
                    category: equip.category,
                    strengthen: equip.strengthLevel,
                    enhance: equip.enhance?.id ?? null,
                    embed: equip.embedding.map((ops) => ({
                        type: 'unified',
                        level: ops?.level ?? 0,
                    })),
                };
                if (store.stones[equip.category]) {
                    scheme.stone = store.stones[equip.category].id;
                }
                caseModel.equip.push(scheme);
            }
        });
        caseModel.talent = store.talents.map((t) => t.id);
        caseModel.effect = [];

        const res = await axios.put(`${ENDPOINT}/case/${caseModel.id}`, caseModel, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }

    static async create(kungfu: KungFu, name: string): Promise<Resource<CaseInfo> | false> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return false;
        }
        const res = await axios.post(`${ENDPOINT}/case`, {
            name,
            kungfu,
            equip: [],
            effect: [],
            talent: [],
        }, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data ?? false;
    }

    static async delete(id: string): Promise<boolean> {
        const token = $store.user?.token ?? localStorage.getItem('token');
        if (!token) {
            directError('尚未登录');
            return false;
        }
        const res = await axios.delete(`${ENDPOINT}/case/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(errorHandler);
        return res?.data.data.status === 'success';
    }
}
