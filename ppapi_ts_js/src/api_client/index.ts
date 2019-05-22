import { APIBase } from '../api_shared/api_base';
export class API extends APIBase {
  constructor(baseurl: string = '', jwt: string = '') {
    super(baseurl, jwt, '/v1/cli', false);
  }
}
