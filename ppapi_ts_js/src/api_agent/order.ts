import { AxiosResponse } from 'axios';
import { APIBase } from '../api_shared/api_base';
import { APIBaseChild } from '../api_shared/api_base_child';
import { APIOrder } from '../api_shared/api_order';
import { APIResponse } from '../types';

export interface MarkForRepurchaseInput {
    order_id: number;
    date: string;
}

export interface CompleteRepurchaseInput {
    order_id: number;
    new_order_id: number;
}

export interface CancelRepurchaseInput {
    order_id: number;
    reason: string;
}

export class AgentAPIOrder extends APIOrder {
    constructor(parent: APIBase) {
        super(parent);
    }

    public markForRepurchase(input: MarkForRepurchaseInput): Promise<APIResponse<{}>> {
        return new Promise<APIResponse<{}>>(resolve => {
            this.postJSON(
                `/order/${input.order_id}/repurchase/mark`,
                {},
                {
                    date: input.date,
                },
            )
                .catch(error => {
                    resolve(APIBaseChild.parseError<{}>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<{}>));
                });
        });
    }
    public completeRepurchase(input: CompleteRepurchaseInput): Promise<APIResponse<{}>> {
        return new Promise<APIResponse<{}>>(resolve => {
            this.postJSON(
                `/order/${input.order_id}/repurchase/complete`,
                {},
                {
                    new_order_id: input.new_order_id,
                },
            )
                .catch(error => {
                    resolve(APIBaseChild.parseError<{}>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<{}>));
                });
        });
    }
    public cancelRepurchase(input: CancelRepurchaseInput): Promise<APIResponse<{}>> {
        return new Promise<APIResponse<{}>>(resolve => {
            this.postJSON(
                `/order/${input.order_id}/repurchase/cancel`,
                {},
                {
                    reason: input.reason,
                },
            )
                .catch(error => {
                    resolve(APIBaseChild.parseError<{}>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<{}>));
                });
        });
    }
}
