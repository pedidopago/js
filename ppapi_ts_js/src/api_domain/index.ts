import { APIBase } from '../api_shared/api_base';
export class API extends APIBase {
  constructor(baseurl: string = '', dtoken: string = '') {
    if (dtoken === '') {
      if ((window as any).hasOwnProperty('__pp_api_public_domain_key')) {
        console.log('domain key from env', (window as any).__pp_api_public_domain_key);
        dtoken = (window as any).__pp_api_public_domain_key as string;
      }
    }
    super(baseurl, '', '/v1/dap/' + dtoken, false);
  }
}
