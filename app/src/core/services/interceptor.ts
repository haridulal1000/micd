import Axios, {
	AxiosRequestConfig,
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { getBaseUrl } from '../../config';
import {
	clearToken,
	getAccessToken,
	getRefreshToken,
	saveTokens,
} from '../utilities/storage';
import { notifyError } from '../../components/shared/form/toast';
import axios from 'axios';
import { updatePerformLogout } from './logout-subject-service';

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

interface IErrorMsg {
	[key: string]: string;
}

const getAxiosInstance = async () => {
	const url = await getBaseUrl();

	const axiosInstance = Axios.create({
		baseURL: url,
	});

	axiosInstance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			if (config.url?.includes('email/verify')) {
				const token = getAccessToken();
				if (token) {
					config.headers!.Authentication = `Bearer ${token}`;
				}
			}

			if (
				!(
					config.url?.includes('auth/email') ||
					config.url?.includes('password/reset')
				)
			) {
				const token = getAccessToken();

				if (token) {
					config.headers!.Authentication = `Bearer ${token}`;
				}
			}
			return config;
		},
		(error: AxiosError) => {
			Promise.reject(error).then();
		},
	);

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const originalRequest: RetryableAxiosRequestConfig | undefined =
				error.config;

			if (error?.response?.status === 400) {
				let errorMessage: IErrorMsg;
				if (error.response.data) {
					errorMessage = error.response.data as IErrorMsg;
					if (errorMessage) notifyError(errorMessage.description);
				} else {
					notifyError(error.message);
				}
				return Promise.reject(error);
			}

			if (error?.response?.status === 403) {
				let errorMessage: IErrorMsg;
				if (error.response.data) {
					errorMessage = error.response.data as IErrorMsg;
					if (errorMessage) notifyError(errorMessage.description);
				} else {
					notifyError(error.message);
				}
				return Promise.reject(error);
			}

			if (
				error?.response?.status === 401 &&
				originalRequest?.url === 'auth/token'
			) {
				let errorMessage: IErrorMsg;
				if (error.response.data) {
					errorMessage = error.response.data as IErrorMsg;
					if (errorMessage) notifyError(errorMessage.description);
				} else {
					notifyError(error.message);
				}
				return Promise.reject(error);
			}

			if (error?.response?.status === 403) {
				clearToken();
			}

			if (
				error?.response?.status === 401 &&
				originalRequest &&
				!originalRequest._retry
			) {
				originalRequest._retry = true;
				const refreshToken = getRefreshToken();

				try {
					const refreshResponse = await axios.get(
						`${url}auth/refresh`,
						{
							headers: {
								Authentication: `Bearer ${refreshToken}`,
							},
						},
					);

					if (refreshResponse.status === 200) {
						// Save new tokens if needed
						saveTokens({
							access: refreshResponse.data.access,
							refresh: refreshToken,
						});
						// Retry the original request with the new token

						return axiosInstance({
							...originalRequest,
							headers: {
								Authentication: `Bearer ${refreshResponse.data.access}`,
							},
						});
					} else {
						updatePerformLogout(true);
					}
				} catch (refreshError: any) {
					updatePerformLogout(true);
				}
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance;
};

export default getAxiosInstance;
