import { service } from './utils';

const prefix = '/user';

export const login = (params) => service.post(prefix + '/login', params);
