import axios from 'axios';
import { Attribute, AttributeDecorator } from '../model/attribute';
import { KungFu } from '../model/base';
import { Resource } from '../model/resource';
import { Stone } from '../model/stone';
import { SimpleStoneAttribute } from '../model/stone_attribute';
import { ENDPOINT, errorHandler } from './base';

export class StoneService {
    static async listTags(kungfu: KungFu): Promise<Resource<SimpleStoneAttribute>[]> {
        const res = await axios.get(`${ENDPOINT}/stone-attribute`, {
            params: {
                kungfu,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async listStones(attributes: Attribute[], decorators: AttributeDecorator[]): Promise<Resource<Stone>[]> {
        const res = await axios.get(`${ENDPOINT}/stone`, {
            params: {
                attribute: attributes,
                decorator: decorators,
            },
        }).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async getStone(id: number): Promise<Resource<Stone>> {
        const res = await axios.get(`${ENDPOINT}/stone/${id}`).catch(errorHandler);
        return res?.data.data ?? {};
    }
}
