const pendingRequests = new Map<string, Promise<unknown>>();

export function deduplicateRequest<T>(key: string, request: () => Promise<T>): Promise<T> {
    const pendingRequest = pendingRequests.get(key) as Promise<T> | undefined;

    if (pendingRequest) {
        return pendingRequest;
    }

    const nextRequest = request().finally(() => {
        if (pendingRequests.get(key) === nextRequest) {
            pendingRequests.delete(key);
        }
    });

    pendingRequests.set(key, nextRequest);
    return nextRequest;
}

export function createRequestKey(resource: string, payload?: unknown): string {
    return payload === undefined ? resource : `${resource}:${JSON.stringify(payload)}`;
}
