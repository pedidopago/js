import api from '../index';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOjEwLCJkaWQiOjIsInN1cCI6dHJ1ZSwibWFzIjpmYWxzZSwiZXhwIjoxNTg1MzQzNTk4LCJpc3MiOiJhcGkucGVkaWRvcGFnby5jb20uYnIiLCJzdWIiOiJnYWJzIn0.CoFkUiBgVJsnD5xYLq90TlJpWeO3XtxqtsCvtnxHhH4';
const base = 'http://127.0.0.1:8888';

console.log('AGENT TEST running');
test('agent_order_getVerifyPaymentData', () => {
    const x = api.agent(base, token);
    console.log('might run');
    let z = x.order.getVerifyPaymentData(151163);
    console.log(z);
    z.then(resp => {
        console.log('resp:', resp);
        console.log('type:');
        console.log(typeof resp);
        if (!resp.success()) {
            fail(resp.error);
            return;
        }
        expect(1).toBe(1);
        //expect(resp.data.payment_option_name).toBe('offline_card');
    });
}, 10000);
