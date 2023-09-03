import { Request } from 'express';

export type ExtendedRequest<T = { [key: string]: unknown }> = Request & T;
