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
  asc: boolean;
}

export interface Search {
  col: string;
  val: string;
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
  public getLatest(page?: number | string, sortBy?: SortBy) {
    let uri = `/orders/latest`;
    if (page && page > 0) {
      uri = uri + `?p=${page}`;
    }
    if (sortBy && uri.indexOf('p') > -1) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc ? 1 : 0}`;
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
  public getLatestCoach(page?: number | string, sortBy?: SortBy, search?: Search) {
    let uri = `/orders/latest?selfcoach=1`;
    if (page && page > 0) {
      uri = `/orders/latest?selfcoach=1&p=${page}`;
    }

    if (sortBy) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc ? 1 : 0}`;
    }

    if (search) {
      uri = uri + `&ctx=${search.col}&q=${search.val ? 1 : 0}`;
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
  public getLatestCoachFavorites(sortBy?: SortBy, search?: Search) {
    let uri = `/orders/latest?selfcoach=1&favorites=1`;

    if (sortBy) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc ? 1 : 0}`;
    }

    if (search) {
      uri = uri + `&ctx=${search.col}&q=${search.val ? 1 : 0}`;
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
  public getLatestCoachAgentOrders(agentID: number, page?: number | string, sortBy?: SortBy) {
    let uri = `/orders/coach/last/${agentID}?`;
    if (page && page > 0) {
      uri = uri + `p=${page}`;
    }
    if (sortBy && uri.indexOf('p') > -1) {
      uri = uri + `&s=${sortBy.key}&a=${sortBy.asc ? 1 : 0}`;
    }
    if (sortBy && uri.indexOf('p') < -1) {
      uri = uri + `s=${sortBy.key}&a=${sortBy.asc ? 1 : 0}`;
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
