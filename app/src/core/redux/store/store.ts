import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import questionnaireReducer from '../reducers/questionnaireSlice';
import authReducer from '../reducers/authSlice';
import patientReducer from '../reducers/patientSlice';
import workspaceReducer from '../reducers/workspaceSlice';
import userProfileReducer from '../reducers/userProfileSlice';
import dButtonReducer from '../reducers/DSlice';
import imageSliderReducer from '../reducers/imageCarouselSlice';
import HealthFormReducer from '../reducers/HealthFormSlice';
import AppointmentsReducer from '../reducers/appointmentSlice';
import uiSlice from '../reducers/uiSlice';

// possible attributes
// reducers
// middleware
// devTools
// preloadedState
// enhancers

const authStatePersistFilter = createFilter('auth', [
	'userToken',
	'loggedInUserEmail',
]);

const workspaceStatePersistFilter = createFilter('workspace', [
	'workspaceInfo',
]);

const patientStateFilter = createFilter('patient', ['selectedPatient']);

const profileStateFilter = createFilter('userProfile', [
	'userProfile.email_verified',
	'userProfile.first_name',
	'userProfile.last_name',
]);

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'auth',
		'workspace',
		'sevenDs',
		'patient',
		'healthForm',
		'userProfile',
	],
	transforms: [
		authStatePersistFilter,
		workspaceStatePersistFilter,
		patientStateFilter,
		profileStateFilter,
	],
};

const rootReducers = combineReducers({
	auth: authReducer,
	patient: patientReducer,
	workspace: workspaceReducer,
	userProfile: userProfileReducer,
	dButtons: dButtonReducer,
	imageSlider: imageSliderReducer,
	questionnaire: questionnaireReducer,
	healthForm: HealthFormReducer,
	appointments: AppointmentsReducer,
	ui: uiSlice,
});

const rootReducerWithLogout = (state: any, action: any) => {
	if (action.type === 'auth/logout') {
		state = undefined;
	}

	return rootReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithLogout);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

const persistor = persistStore(store);

export { persistor, store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
