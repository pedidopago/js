import { AxiosResponse } from 'axios';
import { APIBase } from '../api_shared/api_base';
import { APIBaseChild } from '../api_shared/api_base_child';
import { APIResponse } from '../types';
export class APIDomain extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
    public getVendorSubsids(): Promise<APIResponse<VendorSubsid[]>> {
        return new Promise<APIResponse<VendorSubsid[]>>(resolve => {
            this.getJSON(`/domain/vendor-subsids`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<VendorSubsid[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<VendorSubsid[]>));
                });
        });
    }
}

export interface VendorSubsid {
    id: number;
    domain_id: number;
    vendor_subsid: string;
    vendor_name: string;
    name: string;
    description: string;
    created: string;
}
