export default {
    getCookie,
};

export function getCookie(name: string = ''): string {
    const cookies = decodeURIComponent(document.cookie);
    const cookielist = cookies.split(';');
    const needle = name + '=';
    for (let c of cookielist) {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(needle) === 0) {
            return c.substring(needle.length, c.length);
        }
    }
    return '';
}
