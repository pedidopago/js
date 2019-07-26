import { AxiosResponse } from 'axios';
import { APIBase } from '../api_shared/api_base';
import { APIBaseChild } from '../api_shared/api_base_child';
import { Row } from '../model/find_agents';
import { APIResponse } from '../types';
export class APICoaches extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
    public getTempCoaches(): Promise<APIResponse<Row[]>> {
        return new Promise<APIResponse<Row[]>>(resolve => {
            this.getJSON(`/agents/coaches`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<Row[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<Row[]>));
                });
        });
    }
}
