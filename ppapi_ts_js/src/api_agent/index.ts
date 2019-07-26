import { APIBase } from '../api_shared/api_base';
import { APICoaches } from './coaches';
export class API extends APIBase {
  public coaches: APICoaches;

  constructor(baseurl: string = '', jwt: string = '') {
    super(baseurl, jwt);
    this.coaches = new APICoaches(this);
  }
}
