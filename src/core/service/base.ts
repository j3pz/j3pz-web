import { AxiosError } from 'axios';
import { Alert } from 'rsuite';

export const ENDPOINT = 'https://j3pz.dev/api';

export const errorHandler = (error: AxiosError) => {
    Alert.error(error.response?.data.errors?.[0].title ?? '发生未知错误', 3000);
    return null;
};
