import { API as AgentAPI } from './api_agent/index';
import { API as ClientAPI } from './api_client/index';
import { API as DomainAPI } from './api_domain/index';

export default {
    agent: (baseurl: string = '', jwt: string = '') => {
        if (jwt === '') {
            return AgentAPI.newFromCookie(baseurl, AgentAPI.getCookieNameFromEnv());
        }

        return new AgentAPI(baseurl, jwt);
    },
    client: (baseurl: string = '', jwt: string = '') => {
        if (jwt === '') {
            return ClientAPI.newFromCookie(baseurl, ClientAPI.getCookieNameFromEnv('cl_'), '/v1/cli', false);
        }

        return new ClientAPI(baseurl, jwt);
    },
    domain: (baseurl: string = '', dtoken: string = '') => {
        return new DomainAPI(baseurl, dtoken);
    },
};
