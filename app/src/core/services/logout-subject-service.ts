import { BehaviorSubject } from 'rxjs';

const performLogout = false;

// BehaviorSubject to manage the logout action dispatch
export const broadcastLogoutAction = new BehaviorSubject<boolean>(
	performLogout,
);

// Method to update the performLogout value
export const updatePerformLogout = (newValue: boolean) => {
	broadcastLogoutAction.next(newValue);
};
