export interface Resource<T> {
    id: number | string;
    type: string;
    attributes: T;
    link?: string;
}
