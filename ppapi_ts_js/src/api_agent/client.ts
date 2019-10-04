import { AxiosResponse } from 'axios';
import { APIBase } from '../api_shared/api_base';
import { APIBaseChild } from '../api_shared/api_base_child';
import { APIClient } from '../api_shared/api_client';
import { SuccessResp } from '../api_shared/api_order';
import { APIResponse } from '../types';

export interface TestNewKeytelOutput {
    is_unique: boolean;
    user_id: number;
    user_name: string;
}

export class AgentAPIClient extends APIClient {
    constructor(parent: APIBase) {
        super(parent);
    }

    public testNewKeytel(clientid: number, newkeytel: string) {
        return new Promise<APIResponse<TestNewKeytelOutput>>(resolve => {
            this.postJSON(
                `/client/${clientid}/test-new-keytel`,
                {},
                {
                    keytel: newkeytel,
                },
            )
                .catch(error => {
                    resolve(APIBaseChild.parseError<TestNewKeytelOutput>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<TestNewKeytelOutput>));
                });
        });
    }
    public replaceKeytel(clientid: number, newkeytel: string, reason: string) {
        return new Promise<APIResponse<SuccessResp>>(resolve => {
            this.postJSON(
                `/client/${clientid}/replace-keytel`,
                {},
                {
                    keytel: newkeytel,
                    reason,
                },
            )
                .catch(error => {
                    resolve(APIBaseChild.parseError<SuccessResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
                });
        });
    }
}
