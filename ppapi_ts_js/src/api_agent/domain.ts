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
    public getAddresses(): Promise<APIResponse<DomainAddress[]>> {
        return new Promise<APIResponse<DomainAddress[]>>(resolve => {
            this.getJSON(`/domain/addresses`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<DomainAddress[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<DomainAddress[]>));
                });
        });
    }
    public getAddress(id: number): Promise<APIResponse<DomainAddress>> {
        return new Promise<APIResponse<DomainAddress>>(resolve => {
            this.getJSON(`/domain/address/${id}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<DomainAddress>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<DomainAddress>));
                });
        });
    }
    public saveAddress(addr: DomainAddress): Promise<APIResponse<SaveAddressResponse>> {
        return new Promise<APIResponse<SaveAddressResponse>>(resolve => {
            this.postJSON(`/domain/address/save`, {}, addr)
                .catch(error => {
                    resolve(APIBaseChild.parseError<SaveAddressResponse>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<SaveAddressResponse>));
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

export interface DomainAddress {
    id: number;
    title?: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    uf: string;
    reference?: string;
    district: string;
    zip: string;
    type: number;
    contact?: DomainAddressContact;
    obs?: string;
    enabled: boolean;
    client_enabled: boolean;
    venue_id?: number;
    is_primary: boolean;
}

export interface DomainAddressContact {
    name: string;
    area_code: string;
    phone: string;
}

export interface SaveAddressResponse {
    id: number;
    new: boolean;
}
