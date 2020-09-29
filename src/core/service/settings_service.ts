import axios from 'axios';
import { ENDPOINT, errorHandler } from './base';

export class SettingsService {
    static async getRange(): Promise<number[]> {
        const res = await axios.get(`${ENDPOINT}/settings/quality-range`).catch(errorHandler);
        return res?.data.data ?? [];
    }
}
