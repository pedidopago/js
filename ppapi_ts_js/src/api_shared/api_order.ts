import { AxiosResponse } from 'axios';
import { Transaction } from '../model/transaction';
import { APIResponse } from '../types';
import { APIBase } from './api_base';
import { APIBaseChild } from './api_base_child';

export interface GetStatusResp {
  status: number;
  payment_status: number;
}

export interface GetVerifyPaymentDataResp {
  payment_option_name: string;
  pmethod_offlinecard_brand?: string;
  pmethod_offlinecard_installments?: number;
}

export interface SetCoachSelfResp {
  agent_id: number;
  agent_name: string;
}

export interface SuccessResp {
  success?: boolean;
  error?: string;
}

export interface OrderAgentCall {
  id: number;
  t: string;
}

export class APIOrder extends APIBaseChild {
  constructor(parent: APIBase) {
    super(parent);
  }
  public getLastTransaction(orderID: number = 0) {
    return new Promise<APIResponse<Transaction>>(resolve => {
      this.getJSON(`/order/${orderID}/transaction`)
        .catch(error => {
          resolve(APIBaseChild.parseError<Transaction>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<Transaction>));
        });
    });
  }
  public getTransactions(orderID: number = 0) {
    return new Promise<APIResponse<Transaction[]>>(resolve => {
      this.getJSON(`/order/${orderID}/transactions`)
        .catch(error => {
          resolve(APIBaseChild.parseError<Transaction[]>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<Transaction[]>));
        });
    });
  }
  public getStatus(orderID: number = 0) {
    return new Promise<APIResponse<GetStatusResp>>(resolve => {
      this.getJSON(`/order/${orderID}/status`)
        .catch(error => {
          resolve(APIBaseChild.parseError<GetStatusResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetStatusResp>));
        });
    });
  }
  public getVerifyPaymentData(orderID: number) {
    return new Promise<APIResponse<GetVerifyPaymentDataResp>>(resolve => {
      this.getJSON(`/order/${orderID}/verify-payment-data`)
        .catch(error => {
          resolve(APIBaseChild.parseError<GetVerifyPaymentDataResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<GetVerifyPaymentDataResp>));
        });
    });
  }
  public setCoachSelf(orderID: number) {
    return new Promise<APIResponse<SetCoachSelfResp>>(resolve => {
      this.getJSON(`/order/${orderID}/set-coach-self`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SetCoachSelfResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SetCoachSelfResp>));
        });
    });
  }
  public unsetCoachSelf(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/unset-coach-self`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public setFavorite(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/set-favorite`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public unsetFavorite(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/unset-favorite`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public scheduleCall(orderID: number, yymmdd: string, hhmm: string) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.postJSON(
        `/order/${orderID}/schedule-call`,
        {},
        {
          date: yymmdd,
          time: hhmm,
        },
      )
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public getScheduledCalls(orderID: number) {
    return new Promise<APIResponse<OrderAgentCall[]>>(resolve => {
      this.getJSON(`/order/${orderID}/scheduled-calls`)
        .catch(error => {
          resolve(APIBaseChild.parseError<OrderAgentCall[]>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<OrderAgentCall[]>));
        });
    });
  }
  public getCompletedCalls(orderID: number) {
    return new Promise<APIResponse<OrderAgentCall[]>>(resolve => {
      this.getJSON(`/order/${orderID}/scheduled-calls?completed=1`)
        .catch(error => {
          resolve(APIBaseChild.parseError<OrderAgentCall[]>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<OrderAgentCall[]>));
        });
    });
  }
  public setCallCompleted(orderID: number, callID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/mark-call/${callID}`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public setDateClientAccess(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/client-access`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }

  public setDateRepurchase(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/date-repurchase`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }

  public setIsRepurchase(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/is-repurchase`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }

  public setRepurchaseStepsDone(orderID: number) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/repurchase-setps-done`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }

  public saveFormulaObs(orderID: number, formulaID: number, obs: string) {
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.postJSON(
        `/order/${orderID}/formula/obs`,
        {},
        {
          formula_id: formulaID,
          obs,
        },
      )
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
  public setAgent(orderID: number, agentId: number){
    return new Promise<APIResponse<SuccessResp>>(resolve => {
      this.getJSON(`/order/${orderID}/set-agent/${agentId}`)
        .catch(error => {
          resolve(APIBaseChild.parseError<SuccessResp>(error));
        })
        .then(v => {
          resolve(APIBaseChild.parseResponse(v as AxiosResponse<SuccessResp>));
        });
    });
  }
}
