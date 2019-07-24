export interface FindRequest {
    page: number;
    s: FindSortBy;
    q: FindSearch;
    f?: FindFilter;
    limit?: number;
}

export interface FindSortBy {
    k: string;
    a: boolean;
}

export interface FindSearch {
    t: string;
    v: string;
}

export interface FindFilter {
    amount?: AmountFilter;
    created_at?: DateFilter;
    calls?: CallFilter;
    payment?: PaymentFilter;
    client?: ClientFilter;
    status?: IntRangeFilter;
}

export interface AmountFilter {
    min: string;
    max: string;
}

export interface DateFilter {
    from: string;
    to: string;
}

export interface IntRangeFilter {
    from?: number;
    to?: number;
}

export interface CallFilter {
    scheduled?: IntRangeFilter;
    done?: IntRangeFilter;
}

export interface PaymentFilter {
    methods?: number[];
    statuses?: number[];
    delay?: DateFilter;
    expired_bank_slip?: boolean;
}

export interface ClientFilter {
    accessed?: boolean;
    recurrent?: boolean;
}

export interface FindResult {
    orders: Row[];
    page: number;
    max_results: number;
    max_results_per_page: number;
}

export interface Row {
    order_id: number;
    order_display_id: string;
    order_vendor_id: string;
    order_vendor_subsid: string;
    order_formula_groups?: string[];
    domain_id: number;
    status: number;
    status_name: string;
    payment?: OrderPayment;
    shipping?: OrderShipping;
    user?: OrderClient;
    created_at: string;
    price_total: string;
    doctors?: OrderDoctor[];
    stages: OrderStages;
    coach: OrderCoach;
    control: OrderControl;
    last_message?: OrderLastMessage;
}

export interface OrderPayment {
    method_id: number;
    method_name: string;
    status: number;
    status_name: string;
    amount: string;
    bank_slip_expires_at: string;
}

export interface OrderShipping {
    selected_date: string;
    selected_agent_id: number;
    selected_agent_name: string;
    free_shipping: boolean;
    address?: ShippingAddress;
    address_id: number;
    is_domain: boolean;
}

export interface OrderClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    doc: string;
    doctype: number;
    doctype_name: string;
}

export interface OrderDoctor {
    name: string;
    id: number;
    profession_id: number;
    profession_name: string;
    profession_codename: string;
    brcode: string;
    uf: string;
}

export interface OrderStages {
    calculated: OrderStage;
    processing: OrderStage;
    approved: OrderStage;
    nf_printed: OrderStageWithIP;
    payment_selected: OrderStage;
    payment_confirmed: OrderStage;
}

export interface OrderStage {
    agent_id: number;
    agent_name: string;
    date: string;
}

export interface OrderStageWithIP extends OrderStage {
    ip: string;
}

export interface OrderCoach {
    agent_id: number;
    agent_name: string;
    total_calls: number;
    pending_calls: number;
    completed_calls: number;
    next_call: string;
}

export interface OrderControl {
    is_priority: boolean;
    is_ecommerce: boolean;
    has_controlled_substances: boolean;
    has_refrigerated_substances: boolean;
    is_marked_for_repurchase: boolean;
    repurchase_date: string;
    repurchase_steps_completed: boolean;
    treatment: OrderTreatment;
    last_client_access: string;
}

export interface OrderLastMessage {
    internal_agent_title: string;
    internal_agent_body: string;
    client_body: string;
}

export interface ShippingAddress {
    title: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    uf: string;
    reference: string;
    district: string;
    zip: string;
    type: number;
    contact_name: string;
    contact_ddd: string;
    contact_tel: string;
    obs: string;
}

export interface OrderTreatment {
    is_continuous: boolean;
    period_days: number;
    period_expires: string;
}

function marshalInt(stream: string, key: string, v?: number): string {
    if (v === undefined) {
        return stream;
    }
    return stream + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(v.toFixed(0));
}

function marshalBool(stream: string, key: string, v?: boolean): string {
    if (v === undefined) {
        return stream;
    }
    return stream + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(v ? '1' : '0');
}

function marshalString(stream: string, key: string, v?: string): string {
    if (v === undefined) {
        return stream;
    }
    if (v === '') {
        return stream;
    }
    return stream + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(v);
}

function marshalSortBy(stream: string, sortby: FindSortBy): string {
    let output = marshalString(stream, 's.k', sortby.k);
    output = marshalBool(output, 's.a', sortby.a);
    return output;
}

function marshalSearch(stream: string, input: FindSearch): string {
    let output = marshalString(stream, 'q.t', input.t);
    output = marshalString(output, 's.v', input.v);
    return output;
}

function marshalArray(stream: string, keyprefix: string, v?: any[]): string {
    if (v === undefined) {
        return stream;
    }
    let output = stream;
    for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === 'string') {
            output = marshalString(output, keyprefix + '.' + i.toString(), <string>(v[i]));
        } else if (typeof v[i] === 'number') {
            output = marshalString(output, keyprefix + '.' + i.toString(), (<number>(v[i])).toString());
        } else if (typeof v[i] === 'boolean') {
            output = marshalBool(output, keyprefix + '.' + i.toString(), <boolean>(v[i]));
        }
    }
    return output;
}

function marshalFilter(stream: string, input: FindFilter): string {
    let output = stream;
    if (input.amount !== undefined) {
        output = marshalString(output, 'f.amount.min', input.amount.min);
        output = marshalString(output, 'f.amount.max', input.amount.max);
    }
    if (input.created_at !== undefined) {
        output = marshalString(output, 'f.created_at.from', input.created_at.from);
        output = marshalString(output, 'f.created_at.to', input.created_at.to);
    }
    if (input.calls !== undefined) {
        if (input.calls.scheduled !== undefined) {
            output = marshalInt(output, 'f.calls.scheduled.from', input.calls.scheduled.from);
            output = marshalInt(output, 'f.calls.scheduled.to', input.calls.scheduled.to);
        }
        if (input.calls.done !== undefined) {
            output = marshalInt(output, 'f.calls.done.from', input.calls.done.from);
            output = marshalInt(output, 'f.calls.done.to', input.calls.done.to);
        }
    }
    if (input.payment !== undefined) {
        output = marshalArray(output, 'f.payment.methods', input.payment.methods);
        output = marshalArray(output, 'f.payment.statuses', input.payment.statuses);
        if (input.payment.delay !== undefined) {
            output = marshalString(output, 'f.payment.delay.from', input.payment.delay.from);
            output = marshalString(output, 'f.payment.delay.to', input.payment.delay.to);
        }
        output = marshalBool(output, 'f.payment.expired_bank_slip', input.payment.expired_bank_slip);
    }
    if (input.client !== undefined) {
        output = marshalBool(output, 'f.client.accessed', input.client.accessed);
        output = marshalBool(output, 'f.client.recurrent', input.client.recurrent);
    }
    if (input.status !== undefined) {
        output = marshalInt(output, 'f.status.from', input.status.from);
        output = marshalInt(output, 'f.status.to', input.status.to);
    }
    return output;
}

export function marshalFindRequest(req: FindRequest): string {
    let output = '';
    output = marshalInt(output, 'page', req.page);
    output = marshalSortBy(output, req.s);
    output = marshalSearch(output, req.q);
    if (req.f !== undefined) {
        output = marshalFilter(output, req.f);
    }
    output = marshalInt(output, 'limit', req.limit);

    if (output.indexOf('&') === 0) {
        return output.substr(1);
    }

    return output;
}