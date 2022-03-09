export interface DefaultPayload {
    getToken: () => Promise<string>;
}