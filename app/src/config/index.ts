import ENVIRONMENTS from './constants';

let cachedConfig: any;
let BASE_URL = '';

async function loadConfig(): Promise<any> {
	if (cachedConfig) {
		// If the configuration has already been loaded, return it from the cache
		return cachedConfig;
	}

	let config: any;

	if (import.meta.env.MODE === ENVIRONMENTS.development) {
		const module = await import('./config.dev.json');
		config = module.default;
	} else if (import.meta.env.MODE === ENVIRONMENTS.production) {
		const module = await import('./config.json');
		config = module.default;
	} else if (import.meta.env.MODE === ENVIRONMENTS.staging) {
		const module = await import('./config.stage.json');
		config = module.default;
	} else {
		throw new Error(`Invalid environment: ${import.meta.env.MODE}`);
	}

	cachedConfig = config;
	BASE_URL = config.enhancers.api.endpointBase.host;

	return config;
}

function getBaseUrl(): Promise<string> {
	return new Promise((resolve, reject) => {
		if (BASE_URL) {
			resolve(BASE_URL);
		} else {
			loadConfig()
				.then(() => resolve(BASE_URL))
				.catch(reject);
		}
	});
}

async function init() {
	const config = await loadConfig();
	BASE_URL = config.enhancers.api.endpointBase.host;
}

init();

export { loadConfig, getBaseUrl };
