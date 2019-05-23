import util from '../util';
import { APIEvents } from './api_events';
import { APIOrder } from './api_order';
import { APIOrders } from './api_orders';
import { APITransaction } from './api_transactions';

export class APIBase {
  // static fields
  public static localStorageJWTKeyForAgent: string = 'jwt';
  public static localStorageJWTKeyForClient: string = 'jwt_cl';
  public static defaultBaseURL = 'https://api.pedidopago.com.br';

  public static getBaseURLFromEnv(): string {
    if (window && (window as any).hasOwnProperty('__pedidopago_api_base_url')) {
      return (window as any).__pedidopago_api_base_url as string;
    }
    return APIBase.defaultBaseURL;
  }

  public static getCookieNameFromEnv(prefix: string = ''): string {
    let domainID: number = 0;
    if ((window as any).___domain_id && (window as any).___domain_id > 0) {
      domainID = (window as any).___domain_id;
    } else if ((window as any).domain_id && (window as any).domain_id > 0) {
      domainID = (window as any).domain_id;
    }
    return prefix + 'api_jwt_' + domainID;
  }

  public static newFromCookie(baseurl: string = '', cookiename: string = '') {
    const jwt = util.getCookie(cookiename);
    return new APIBase(baseurl, jwt);
  }

  // fields
  public jwt: string = '';
  public order: APIOrder;
  public orders: APIOrders;
  public events: APIEvents;
  public transactions: APITransaction;

  private mBaseURL: string;
  private isAgent: boolean = true;

  constructor(baseurl: string = '', jwt: string = '', urlPrefix: string = '/v1/agt', isAgent: boolean = true) {
    this.isAgent = isAgent;
    if (jwt !== '') {
      this.jwt = jwt;
    } else {
      // grab JWT by the environment
      const k = localStorage.getItem(this.localStorageJWTKey());
      if (k != null) {
        this.jwt = k;
      }
    }
    if (baseurl === '') {
      baseurl = APIBase.getBaseURLFromEnv();
    }
    this.mBaseURL = baseurl + urlPrefix;
    this.order = new APIOrder(this);
    this.orders = new APIOrders(this);
    this.events = new APIEvents(this);
    this.transactions = new APITransaction(this);
  }
  public localStorageJWTKey(): string {
    if (this.isAgent) {
      return APIBase.localStorageJWTKeyForAgent;
    }
    return APIBase.localStorageJWTKeyForClient;
  }
  public baseurl(): string {
    return this.mBaseURL;
  }
}
