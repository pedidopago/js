import { Event, EventCallback } from '../model/event';
import { APIBase } from './api_base';
import { APIBaseChild } from './api_base_child';

export interface ListenWSInput {
  callback: EventCallback;
  filter_kind: string;
  filter_type: string;
}

export class APIEvents extends APIBaseChild {
  constructor(parent: APIBase) {
    super(parent);
  }
  public listenWS(input: ListenWSInput) {
    const ws = this.ws(
      `/events/listen/ws?filter_kind=${encodeURIComponent(input.filter_kind)}&filter_type=${encodeURIComponent(
        input.filter_type,
      )}`,
    );
    ws.onopen = wsevt => {
      console.log('APIEvents WS OPEN');
      console.log(wsevt);
    };
    ws.onmessage = wsevt => {
      const jd = JSON.parse(wsevt.data) as Event;
      if (jd.type === 'pong') {
        setTimeout(() => {
          if (ws != null) {
            ws.send('ping');
          }
        }, 15000);
      }
      console.log('APIEvents WS message received', wsevt);
      input.callback(jd);
    };
    ws.onclose = wsevt => {
      console.log('APIEvents WS CLOSE!!');
      console.log(wsevt);
      if (wsevt.code === 1006) {
        this.listenWS(input);
      }
    };
    ws.onerror = wsevt => {
      console.log('APIEvents WS ERROR!!');
      console.log(wsevt);
    };
    setTimeout(() => {
      if (ws != null) {
        ws.send('ping');
      }
    }, 15000);
  }
  public catchOrderPaymentConfirmedOrRefused(orderID: number) {
    return new Promise<Event>(resolve => {
      this.listenWS({
        callback: evt => {
          if (evt.metadata && evt.metadata.order_id === orderID) {
            resolve(evt);
          }
        },
        filter_kind: 'order',
        filter_type: 'payment_refused,payment_confirmed',
      });
    });
  }
}
