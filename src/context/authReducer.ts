import { TOKEN_GROUP_KEY } from './constants';

import { ITokenGroup } from '@/interfaces/auth.interfaces';
import { IUser } from '@/interfaces/user.interfaces';

export enum AuthReducerAction {
	SET_SESSION = 'SET_SESSION',
	LOGOUT = 'LOGOUT',
	SET_USER_DATA = 'SET_USER_DATA',
}
export enum AuthStatus {
	AUTHENTICATED = 'authenticated',
	NOT_AUTHENTICATED = 'not-authenticated',
}
export interface IAuthState {
	status: AuthStatus;
	currentUser: IUser | undefined;
	tokenGroup: ITokenGroup | null;
}
type AuthReducerActionType =
	| { type: AuthReducerAction.SET_SESSION; payload: ITokenGroup }
	| { type: AuthReducerAction.LOGOUT }
	| { type: AuthReducerAction.SET_USER_DATA; payload: IUser };

export const authInit = (initialState: IAuthState): IAuthState => {
	const tokenGroup = localStorage.getItem(TOKEN_GROUP_KEY);

	return {
		...initialState,
		tokenGroup: tokenGroup ? JSON.parse(tokenGroup) : initialState.tokenGroup,
	};
};

export const authReducer = (
	state: IAuthState,
	action: AuthReducerActionType,
): IAuthState => {
	switch (action.type) {
		case AuthReducerAction.SET_SESSION:
			return {
				...state,
				tokenGroup: action.payload,
			};
		case AuthReducerAction.LOGOUT:
			return {
				tokenGroup: null,
				status: AuthStatus.NOT_AUTHENTICATED,
				currentUser: undefined,
			};
		case AuthReducerAction.SET_USER_DATA:
			return {
				...state,
				status: AuthStatus.AUTHENTICATED,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};
