export function tryStringify(obj: unknown): string | undefined {
    let result;

    try {
        result = JSON.stringify(obj);
    } catch (e) {
        // not stringifiable
    }

    return result;
}
