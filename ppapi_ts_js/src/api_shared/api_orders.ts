import { AxiosResponse } from 'axios';
import { CoachAgentStat } from '../model/coachagentstat';
import { FindRequest, FindResult, marshalFindRequest } from '../model/find_orders';
import { OrderAdmrow } from '../model/order_admrow';
import { APIResponse } from '../types';
import { marshalToQuery } from '../util/objects';
import { APIBase } from './api_base';
import { APIBaseChild } from './api_base_child';

export interface GetLatestResp {
    orders: OrderAdmrow[];
    last_30_days: number;
    total: number;
    page: number;
    max_results_per_page: number;
    sort_by: SortBy;
    search: Search;
}
export interface Agents {
    id: number;
    name: string;
}
export interface SortBy {
    key: string;
    asc: string | boolean;
}

function normalizeSortBy(s?: SortBy): SortBy {
    if (s === undefined) {
        return {
            asc: '',
            key: '',
        };
    }
    const ret = {
        asc: '0',
        key: s.key,
    };
    if (s.asc === true || s.asc === '1' || s.asc === 'true') {
        ret.asc = '1';
    }
    return ret;
}

export interface Search {
    col: string;
    val: string;
}

export interface Filters {
    value: {
        min: string;
        max: string;
    };
    created_date: string;
    calls: string;
    recurrent_client?: boolean;
    scheduled_calls?: boolean;
    client_login?: boolean;
    expired_slip_bank?: boolean;
    no_agent?: boolean;
    payment_method: string;
    payment_delay: string;
    expired_medication: string;
    medication_out_of_stock: string;
    get_prescription: string;
    store_withdrawal: string;
    repurchase_date: string;
    tab: string;
}

export interface OrderFavRow {
    order_id: number;
    display_id: string;
    customer: string;
    status: any;
    created_at: string;
}

export interface DueOrderCall {
    id: number;
    t: string;
    order_id: number;
    display_id: string;
}

export class APIOrders extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
    public find(req: FindRequest): Promise<APIResponse<FindResult>> {
        return new Promise<APIResponse<FindResult>>(resolve => {
            this.getJSON(`/orders/find?${marshalFindRequest(req)}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<FindResult>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<FindResult>));
                });
        });
    }
    public getCalculatedLatest(req: FindRequest): Promise<APIResponse<FindResult>> {
        return new Promise<APIResponse<FindResult>>(resolve => {
            this.getJSON(`/orders/calculated/latest?${marshalFindRequest(req)}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<FindResult>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<FindResult>));
                });
        });
    }
    public getCalculated(req: FindRequest): Promise<APIResponse<FindResult>> {
        return new Promise<APIResponse<FindResult>>(resolve => {
            this.getJSON(`/orders/calculated?${marshalFindRequest(req)}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<FindResult>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<FindResult>));
                });
        });
    }
    public getPaymentPending(req: FindRequest): Promise<APIResponse<FindResult>> {
        return new Promise<APIResponse<FindResult>>(resolve => {
            this.getJSON(`/orders/payment-pending?${marshalFindRequest(req)}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<FindResult>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<FindResult>));
                });
        });
    }
    public getContinuousTreatment(req: FindRequest): Promise<APIResponse<FindResult>> {
        return new Promise<APIResponse<FindResult>>(resolve => {
            this.getJSON(`/orders/continuous-treatment?${marshalFindRequest(req)}`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<FindResult>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<FindResult>));
                });
        });
    }
    public getLatest(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
        sortBy = normalizeSortBy(sortBy);
        let uri = `/orders/latest`;
        let qparams = { version: 2 };
        if (filters) {
            filters.tab = 'latest';
            qparams = { ...qparams, ...filters };
        }
        if (search) {
            qparams = { ...qparams, ...{ q: search } };
        }
        if (sortBy) {
            qparams = { ...qparams, ...{ s: sortBy } };
        }
        if (page && page > 0) {
            qparams = { ...qparams, ...{ p: page } };
        }

        uri = uri + '?' + marshalToQuery(qparams);

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }
    public getLatestCoach(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
        let uri = `/orders/latest?selfcoach=1`;
        if (page && page > 0) {
            uri = `/orders/latest?selfcoach=1&p=${page}`;
        }

        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
        }

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }
    public getLatestCoachFavorites(sortBy?: SortBy, search?: Search, filters?: Filters) {
        let uri = `/orders/latest?selfcoach=1&favorites=1`;

        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
        }

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }
    public getFavoritesCount() {
        return new Promise<APIResponse<number>>(resolve => {
            this.getJSON(`/orders/self/favorites/count`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<number>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<number>));
                });
        });
    }
    public getFavoritesList() {
        return new Promise<APIResponse<OrderFavRow[]>>(resolve => {
            this.getJSON(`/orders/self/favorites/list`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<OrderFavRow[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<OrderFavRow[]>));
                });
        });
    }
    public getDueCalls() {
        return new Promise<APIResponse<DueOrderCall[]>>(resolve => {
            this.getJSON(`/orders/calls`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<DueOrderCall[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<DueOrderCall[]>));
                });
        });
    }
    public getNextCalls() {
        return new Promise<APIResponse<DueOrderCall[]>>(resolve => {
            this.getJSON(`/orders/calls?next=1`)
                .catch(error => {
                    resolve(APIBaseChild.parseError<DueOrderCall[]>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<DueOrderCall[]>));
                });
        });
    }
    public getNoPaymentsOrders(
        agentId?: number,
        page?: number | string,
        sortBy?: SortBy,
        search?: Search,
        filters?: Filters,
    ) {
        let uri = `/orders/no-payment`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
            if (filters.expired_slip_bank) {
                uri = uri + `&expired_bank_slip=${filters.expired_slip_bank}`;
            }
            if (filters.payment_method !== '') {
                uri = uri + `&payment_method=${filters.payment_method}`;
            }
            if (filters.payment_delay !== '') {
                uri = uri + `&payment_delay=${filters.payment_delay}`;
            }
            if (filters.expired_medication !== '') {
                uri = uri + `&expired_medication=${filters.expired_medication}`;
            }
            if (filters.medication_out_of_stock !== '') {
                uri = uri + `&medication_out_of_stock=${filters.medication_out_of_stock}`;
            }
        }

        if (agentId) {
            uri = uri + `&agent_id=${agentId}`;
        }

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }

    public getNoPaymentsOrdersAgents(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
        let uri = `/orders/no-payment/agents`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
            if (filters.expired_slip_bank) {
                uri = uri + `&expired_bank_slip=${filters.expired_slip_bank}`;
            }
            if (filters.payment_method !== '') {
                uri = uri + `&payment_method=${filters.payment_method}`;
            }
            if (filters.payment_delay !== '') {
                uri = uri + `&payment_delay=${filters.payment_delay}`;
            }
        }

        return new Promise<APIResponse<CoachAgentStat>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<CoachAgentStat>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<CoachAgentStat>));
                });
        });
    }

    public getContinuousUseOrders(
        agentId?: number,
        page?: number | string,
        sortBy?: SortBy,
        search?: Search,
        filters?: Filters,
    ) {
        let uri = `/orders/continuous-use`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
            if (filters.expired_slip_bank) {
                uri = uri + `&expired_bank_slip=${filters.expired_slip_bank}`;
            }
            if (filters.payment_method !== '') {
                uri = uri + `&payment_method=${filters.payment_method}`;
            }
            if (filters.payment_delay !== '') {
                uri = uri + `&payment_delay=${filters.payment_delay}`;
            }
            if (filters.expired_medication !== '') {
                uri = uri + `&expired_medication=${filters.expired_medication}`;
            }
            if (filters.medication_out_of_stock !== '') {
                uri = uri + `&medication_out_of_stock=${filters.medication_out_of_stock}`;
            }
        }
        if (agentId) {
            uri = uri + `&agent_id=${agentId}`;
        }

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }

    public getContinuousUseOrdersAgents(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
        let uri = `/orders/continuous-use/agents`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.recurrent_client) {
                uri = uri + `&recurrent_client=${filters.recurrent_client}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.calls !== '') {
                uri = uri + `&calls=${filters.calls}`;
            }
            if (filters.created_date !== '') {
                uri = uri + `&created_date=${filters.created_date}`;
            }
            if (filters.expired_medication !== '') {
                uri = uri + `&expired_medication=${filters.expired_medication}`;
            }
            if (filters.medication_out_of_stock !== '') {
                uri = uri + `&medication_out_of_stock=${filters.medication_out_of_stock}`;
            }
        }

        return new Promise<APIResponse<CoachAgentStat>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<CoachAgentStat>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<CoachAgentStat>));
                });
        });
    }

    public getRepurchase(
        agentId?: number,
        page?: number | string,
        sortBy?: SortBy,
        search?: Search,
        filters?: Filters,
    ) {
        let uri = `/orders/repurchase`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.get_prescription !== '') {
                uri = uri + `&get_prescription=${filters.get_prescription}`;
            }
            if (filters.store_withdrawal !== '') {
                uri = uri + `&store_withdrawal=${filters.store_withdrawal}`;
            }
            if (filters.repurchase_date !== '') {
                uri = uri + `&repurchase_date=${filters.repurchase_date}`;
            }
        }

        if (agentId) {
            uri = uri + `&agent_id=${agentId}`;
        }

        return new Promise<APIResponse<GetLatestResp>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<GetLatestResp>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetLatestResp>));
                });
        });
    }

    public getRepurchaseAgents(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
        let uri = `/orders/repurchase/agents`;
        if (page && page > 0) {
            uri = uri + `?p=${page}`;
        }
        if (sortBy) {
            uri = uri + `&s=${sortBy.key}&a=${sortBy.asc}`;
        }

        if (search) {
            uri = uri + `&ctx=${search.col}&q=${search.val}`;
        }

        if (filters) {
            if (filters.value.min !== '') {
                uri = uri + `&min=${filters.value.min}`;
            }
            if (filters.value.max !== '') {
                uri = uri + `&max=${filters.value.max}`;
            }
            if (filters.client_login) {
                uri = uri + `&client_login=${filters.client_login}`;
            }
            if (filters.scheduled_calls) {
                uri = uri + `&scheduled_calls=${filters.scheduled_calls}`;
            }
            if (filters.get_prescription !== '') {
                uri = uri + `&get_prescription=${filters.get_prescription}`;
            }
            if (filters.store_withdrawal !== '') {
                uri = uri + `&store_withdrawal=${filters.store_withdrawal}`;
            }
            if (filters.repurchase_date !== '') {
                uri = uri + `&repurchase_date=${filters.repurchase_date}`;
            }
        }

        return new Promise<APIResponse<CoachAgentStat>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<CoachAgentStat>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<CoachAgentStat>));
                });
        });
    }
    public getAllAgents() {
        const uri = `/orders/coach/all-agents`;
        return new Promise<APIResponse<Agents>>(resolve => {
            this.getJSON(uri)
                .catch(error => {
                    resolve(APIBaseChild.parseError<Agents>(error));
                })
                .then(v => {
                    resolve(APIBaseChild.parseResponse(v as AxiosResponse<Agents>));
                });
        });
    }
}
