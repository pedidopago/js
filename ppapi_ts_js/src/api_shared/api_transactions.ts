import { AxiosResponse } from 'axios';
import { APIResponse } from '../types';
import { APIBase } from './api_base';
import { APIBaseChild } from './api_base_child';

export interface RefundInput {
    txid: number;
    reason: string;
    cancel_order: boolean;
    amount: number;
    bank_code?: string;
    agencia?: string;
    agencia_dv?: string;
    conta?: string;
    conta_dv?: string;
    document_number?: string;
    legal_name?: string;
    type?: string; // conta_corrente conta_poupanca conta_corrente_conjunta conta_poupanca_conjunta
}

export interface RefundResp {
    id: number;
    order_id: number;
    domain_id: number;
    driver_name: string;
    status: string;
    refuse_reason: string;
    status_reason: string;
    acquirer_name: string;
    acquirer_id: string;
    acquirer_response_code: string;
    authorization_code: string;
    soft_descriptor: string;
    tid: string;
    nsu: string;
    date_created: string;
    date_updated: string;
    amount: string;
    authorized_amount: string;
    paid_amount: string;
    refunded_amount: string;
    installments: number;
    gateway_id: string;
    cost: string;
    card_holder_name: string;
    card_last_digits: string;
    card_first_digits: string;
    card_brand: string;
    card_pin_mode: string;
    postback_url: string;
    payment_method_driver: string;
    capture_method: string;
    antifraud_score: string;
    boleto_url: string;
    boleto_barcode: string;
    boleto_expiration_date: string;
    referer: string;
    ip: string;
    region: string;
    subscription_id: any;
    extradata: any;
    metadata: any;
    antifraud_metadata: any;
}

export class APITransaction extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
    public postRefund(input: RefundInput) {
        return new Promise<APIResponse<RefundResp>>(resolve => {
            this.postJSON(`/transaction/${input.txid}/refund`, {}, input)
                .catch(error => {
                    resolve(APIBaseChild.parseError<RefundResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<RefundResp>));
                });
        });
    }
}
