import { getCookie } from '../util';
import { marshalToQuery } from '../util/objects';
console.log('UTIL running');
test('getCookie', () => {
    expect(getCookie('zzxz')).toBe('');
});

test('marshalToQuery', () => {
    const obj = {
        name: 'John',
        surname: 'Cena',
        amount: {
            max: 10,
            min: 5,
            ok: true,
        },
    };
    expect(marshalToQuery(obj)).toBe('name=John&surname=Cena&amount.max=10&amount.min=5&amount.ok=true');
});
