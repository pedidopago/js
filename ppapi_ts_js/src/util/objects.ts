export function mergeObjects(a: object, b: object) {
    return { ...a, ...b };
}

export function marshalToQuery(v: object, prefix?: string): string {
    const kvs: string[] = [];
    if (!prefix) {
        prefix = '';
    }
    Object.keys(v).forEach(key => {
        const child = Reflect.get(v, key);
        if (typeof child === 'object') {
            kvs.push(marshalToQuery(child, prefix + key + '.'));
        } else {
            kvs.push(encodeURIComponent(prefix + key) + '=' + encodeURIComponent(child));
        }
    });
    return kvs.join('&');
}
