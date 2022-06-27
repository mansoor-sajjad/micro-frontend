export interface DefaultPayload {
  getToken?: () => Promise<string>;
  providerId?: string;
  env?: string;
  locale?: string;
}
