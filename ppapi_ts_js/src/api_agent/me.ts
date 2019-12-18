import { AxiosResponse } from 'axios';
import { APIBase } from '../api_shared/api_base';
import { APIBaseChild } from '../api_shared/api_base_child';
import { APIResponse } from '../types';

export interface SuccessResp {
    success?: boolean;
    error?: string;
}

export class APIMe extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
    public readNotification(id: number): Promise<APIResponse<SuccessResp>> {
        return new Promise<APIResponse<SuccessResp>>(resolve => {
            this.getJSON(`/me/notification/${id}/read`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<SuccessResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
                });
        });
    }
    public deleteNotification(id: number): Promise<APIResponse<SuccessResp>> {
        return new Promise<APIResponse<SuccessResp>>(resolve => {
            this.getJSON(`/me/notification/${id}/delete`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<SuccessResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
                });
        });
    }
}
