import { getCookie } from '../util';
console.log('UTIL running');
test('getCookie', () => {
  expect(getCookie('zzxz')).toBe('');
});
