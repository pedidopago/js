import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIResponse } from '../types';
import { APIBase } from './api_base';

export class APIBaseChild {
    protected static parseError<T>(error: AxiosError): APIResponse<T> {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const r = error.response as AxiosResponse<T>;
            return {
                data: r.data,
                error: error.message,
                headers: r.headers,
                status: r.status,
                statusText: r.statusText,
                success: () => false,
            };
        }
        if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            const r = error.request;

            return {
                error: `${r.path} failed: ${error.message}`,
                status: 0,
                statusText: '?',
                success: () => false,
            };
        }
        return {
            error: `request failed: ${error.message}`,
            status: 0,
            statusText: '?',
            success: () => false,
        };
    }

    protected static parseResponse<T>(resp: AxiosResponse<T>): APIResponse<T> {
        return {
            data: resp.data,
            headers: resp.headers,
            status: resp.status,
            statusText: resp.statusText,
            success: () => true,
        };
    }

    protected parent: APIBase;

    constructor(parent: APIBase) {
        this.parent = parent;
    }

    protected getJSON<T>(path: string, params: any = {}): AxiosPromise<T> {
        const cfg: AxiosRequestConfig = {};
        cfg.params = params;
        cfg.method = 'get';
        cfg.url = `${this.parent.baseurl()}${path}`;
        cfg.responseType = 'json';
        cfg.headers = {
            Authorization: `Bearer ${this.parent.jwt}`,
        };
        return axios.request<T>(cfg);
    }

    protected postJSON<T>(path: string, params: any = {}, data: any = {}): AxiosPromise<T> {
        const cfg: AxiosRequestConfig = {};
        cfg.params = params;
        cfg.method = 'post';
        cfg.url = `${this.parent.baseurl()}${path}`;
        cfg.responseType = 'json';
        cfg.data = data;
        cfg.headers = {
            Authorization: `Bearer ${this.parent.jwt}`,
        };
        return axios.request<T>(cfg);
    }

    protected ws(path: string): WebSocket {
        let furl = `${this.parent.baseurl()}${path}`;
        furl = furl.replace('https://', 'wss://');
        furl = furl.replace('http://', 'ws://');
        if (this.parent.jwt !== '') {
            if (furl.indexOf('?') > -1) {
                furl = `${furl}&jwt=${this.parent.jwt}`;
            } else {
                furl = `${furl}?jwt=${this.parent.jwt}`;
            }
        }
        const ws = new WebSocket(furl);
        return ws;
    }
}
