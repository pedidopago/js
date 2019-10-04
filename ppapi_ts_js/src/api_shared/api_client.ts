import { APIBase } from './api_base';
import { APIBaseChild } from './api_base_child';

export class APIClient extends APIBaseChild {
    constructor(parent: APIBase) {
        super(parent);
    }
}
