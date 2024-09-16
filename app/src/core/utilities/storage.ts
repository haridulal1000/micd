import { IToken } from '../interfaces/tokens.interface';

export const saveToStorage = (key: any, value: any): void => {
	sessionStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromStorage = (key: string): any =>
	JSON.parse(sessionStorage.getItem(key) as string);

export const removeFromStorage = (key: string): void => {
	sessionStorage.removeItem(key);
};

export const clearStorage = (): void => {
	sessionStorage.clear();
};

export const getAccessToken = (): any => {
	const tokens = JSON.parse(localStorage.getItem('token') as string);
	return tokens.access || null;
};

export const getRefreshToken = (): any => {
	const tokens = JSON.parse(localStorage.getItem('token') as string);
	return tokens.refresh;
};

export const saveTokens = (tokens: IToken): void => {
	localStorage.setItem('token', JSON.stringify(tokens));
};

export const clearToken = (): void => {
	localStorage.removeItem('token');
};
