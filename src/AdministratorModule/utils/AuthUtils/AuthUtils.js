import { getAccessToken } from '../StorageUtils';
export const isLoggedIn = () => getAccessToken() !== undefined;
