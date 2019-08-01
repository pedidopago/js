import { APIBase } from '../api_shared/api_base';
import util from '../util';
import { APICoaches } from './coaches';
import { AgentAPIOrder } from './order';
export class API extends APIBase {
    public static newFromCookie(baseurl: string = '', cookiename: string = '') {
        const jwt = util.getCookie(cookiename);
        return new API(baseurl, jwt);
    }

    public coaches: APICoaches;
    public order: AgentAPIOrder;

    constructor(baseurl: string = '', jwt: string = '') {
        super(baseurl, jwt, '/v1/agt', true);
        this.coaches = new APICoaches(this);
        this.order = new AgentAPIOrder(this);
    }
}
