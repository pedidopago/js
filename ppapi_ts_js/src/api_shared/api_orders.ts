import { AxiosResponse } from 'axios';
import { CoachAgentStat } from '../model/coachagentstat';
import { OrderAdmrow } from '../model/order_admrow';
import { APIResponse } from '../types';
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

export interface SortBy {
  key: string;
  asc: string;
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
  recurrent_client: boolean;
  scheduled_calls: boolean;
  client_login: boolean;
  expired_slip_bank: boolean;
  payment_method: string;
  payment_delay: string;
  expired_medication: string;
  medication_out_of_stock: string;
}

/*
OrderID   int                `db:"order_id" json:"order_id"`
	DisplayID string             `db:"display_id" json:"display_id"`
	Customer  string             `db:"customer" json:"customer"`
	Status    orderstatus.Status `db:"status" json:"status"`
	CreatedAt time.Time          `db:"created_at" json:"created_at"`*/
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
  public getLatest(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
    let uri = `/orders/latest`;
    if (page && page > 0) {
      uri = uri + `?p=${page}`;
    }
    if (sortBy && uri.indexOf('p') > -1) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc === '1' ? 1 : 0}`;
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
  public getLatestCoach(page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
    let uri = `/orders/latest?selfcoach=1`;
    if (page && page > 0) {
      uri = `/orders/latest?selfcoach=1&p=${page}`;
    }

    if (sortBy) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc === '1' ? 1 : 0}`;
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
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc === '1' ? 1 : 0}`;
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
  public getLatestActiveCoachAgents() {
    const uri = `/orders/coach/last-agents`;
    return new Promise<APIResponse<CoachAgentStat[]>>(resolve => {
      this.getJSON(uri)
        .catch(error => {
          resolve(APIBaseChild.parseError<CoachAgentStat[]>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<CoachAgentStat[]>));
        });
    });
  }
  public getLatestCoachAgentOrders(
    agentID: number,
    page?: number | string,
    sortBy?: SortBy,
    search?: Search,
    filters?: Filters,
  ) {
    let uri = `/orders/coach/last/${agentID}`;
    if (page && page > 0) {
      uri = uri + `?p=${page}`;
    }
    if (sortBy) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc === '1' ? 1 : 0}`;
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

  public getSelfOrders(agentID: number, page?: number | string, sortBy?: SortBy, search?: Search, filters?: Filters) {
    let uri = `/orders/self?agent_id=${agentID}`;
    if (page && page > 0) {
      uri = uri + `?p=${page}`;
    }
    if (sortBy) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc === '1' ? 1 : 0}`;
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
        uri = uri + `&expired_banl_slip=${filters.expired_slip_bank}`;
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
}
