export interface FindRequest {
    page: number;
    s: FindSortBy;
    q: FindSearch;
    f?: FindFilter;
    limit?: number;
    scope?: string[];
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
    date_cancelled?: DateFilter;
    treatment_expires_at?: DateFilter;
    continuous_treatment?: boolean;
    repurchase?: RepurchaseFilter;
    calls?: CallFilter;
    payment?: PaymentFilter;
    client?: ClientFilter;
    status?: IntRangeFilter;
    venue_id?: number;
    coach_id?: number;
    vendor_subsid?: string;
    no_pickup_waybill_vendor_id?: boolean;
    nf?: boolean;
    has_messages?: boolean;
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
    total?: IntRangeFilter;
}

export interface PaymentFilter {
    methods?: number[];
    statuses?: number[];
    delay?: DateFilter;
    expired_bank_slip?: boolean;
}

export interface RepurchaseFilter {
    is_marked?: boolean;
    marked_date?: DateFilter;
    steps_completed?: boolean;
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
    scope?: OrderScopes;
}

export interface OrderScopes {
    repurchase?: OrderRepurchase;
}

export interface OrderRepurchase {
    order_id: number;
    order_display_id: string;
    order_vendor_id: string;
    order_vendor_subsid: string;
    status: number;
    status_name: string;
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
    client_date: string;
    agent_body?: string;
    agent_date?: string;
    agent_id?: number;
    date?: string;
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
    output = marshalString(output, 'q.v', input.v);
    return output;
}

function marshalArray(stream: string, keyprefix: string, v?: any[]): string {
    if (v === undefined) {
        return stream;
    }
    let output = stream;
    for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === 'string') {
            output = marshalString(output, keyprefix + '.' + i.toString(), v[i] as string);
        } else if (typeof v[i] === 'number') {
            output = marshalString(output, keyprefix + '.' + i.toString(), (v[i] as number).toString());
        } else if (typeof v[i] === 'boolean') {
            output = marshalBool(output, keyprefix + '.' + i.toString(), v[i] as boolean);
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
    if (input.date_cancelled !== undefined) {
        output = marshalString(output, 'f.date_cancelled.from', input.date_cancelled.from);
        output = marshalString(output, 'f.date_cancelled.to', input.date_cancelled.to);
    }
    if (input.treatment_expires_at !== undefined) {
        output = marshalString(output, 'f.treatment_expires_at.from', input.treatment_expires_at.from);
        output = marshalString(output, 'f.treatment_expires_at.to', input.treatment_expires_at.to);
    }
    if (input.continuous_treatment !== undefined) {
        output = marshalBool(output, 'f.continuous_treatment', input.continuous_treatment);
    }
    if (input.no_pickup_waybill_vendor_id !== undefined) {
        output = marshalBool(output, 'f.no_pickup_waybill_vendor_id', input.no_pickup_waybill_vendor_id);
    }
    if (input.nf !== undefined) {
        output = marshalBool(output, 'f.nf', input.nf);
    }
    if (input.has_messages !== undefined) {
        output = marshalBool(output, 'f.has_messages', input.has_messages);
    }
    if (input.repurchase !== undefined) {
        if (input.repurchase.is_marked !== undefined) {
            output = marshalBool(output, 'f.repurchase.is_marked', input.repurchase.is_marked);
        }
        if (input.repurchase.marked_date !== undefined) {
            output = marshalString(output, 'f.repurchase.marked_date.from', input.repurchase.marked_date.from);
            output = marshalString(output, 'f.repurchase.marked_date.to', input.repurchase.marked_date.to);
        }
        if (input.repurchase.steps_completed !== undefined) {
            output = marshalBool(output, 'f.repurchase.steps_completed', input.repurchase.steps_completed);
        }
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
        if (input.calls.total !== undefined) {
            output = marshalInt(output, 'f.calls.total.from', input.calls.total.from);
            output = marshalInt(output, 'f.calls.total.to', input.calls.total.to);
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
    if (input.venue_id !== undefined) {
        output = marshalInt(output, 'f.venue_id', input.venue_id);
    }
    if (input.coach_id !== undefined) {
        output = marshalInt(output, 'f.coach_id', input.coach_id);
    }
    if (input.vendor_subsid !== undefined) {
        output = marshalString(output, 'f.vendor_subsid', input.vendor_subsid);
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

    if (req.scope !== undefined) {
        for (let i = 0; i < req.scope.length; i++) {
            output = marshalString(output, `scope.${i}`, req.scope[i]);
        }
    }

    if (output.indexOf('&') === 0) {
        return output.substr(1);
    }

    return output;
}
