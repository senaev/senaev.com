export function entriesToObject<Key extends string, Value>(entries: [Key, Value][]): Record<Key, Value> {
    const object = {} as Record<Key, Value>;

    entries.forEach(([key, value]) => {
        object[key] = value;
    });

    return object;
}
