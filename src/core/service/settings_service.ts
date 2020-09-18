import axios from 'axios';
import ENDPOINT from './base';

export default class SettingsService {
    static async getRange() {
        const res = await axios.get(`${ENDPOINT}/settings/quality-range`);
        return res.data;
    }
}
