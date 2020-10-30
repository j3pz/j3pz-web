import axios from 'axios';
import { ENDPOINT, errorHandler } from './base';

type Announcement = {
    version: string;
    title: string;
    content: string;
};

export class SettingsService {
    static async getRange(): Promise<number[]> {
        const res = await axios.get(`${ENDPOINT}/settings/quality-range`).catch(errorHandler);
        return res?.data.data ?? [];
    }

    static async getAnnouncement(): Promise<Announcement> {
        const res = await axios.get(`${ENDPOINT}/settings/announcement`).catch(() => null);
        return res?.data.data?.[0] ?? {};
    }
}
