import { AxiosError } from 'axios';
import { Alert } from 'rsuite';

export const ENDPOINT = 'https://apis.j3pz.com';

export const errorHandler = (error: AxiosError) => {
    Alert.error(error.response?.data.errors?.[0].title ?? '发生未知错误', 3000);
    return null;
};

export const directError = (error: string) => {
    Alert.error(error, 3000);
};
