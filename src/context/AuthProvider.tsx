import { PropsWithChildren, useEffect, useReducer } from 'react';

import { AuthContext } from './AuthContext';
import {
	AuthReducerAction,
	AuthStatus,
	IAuthState,
	authInit,
	authReducer,
} from './authReducer';
import { TOKEN_GROUP_KEY } from './constants';

import { useFetchCurrentUser } from '@/hooks/useFetchCurrentUser';
import { ITokenGroup } from '@/interfaces/auth.interfaces';
import { IUser } from '@/interfaces/user.interfaces';

const INITIAL_STATE: IAuthState = {
	status: AuthStatus.NOT_AUTHENTICATED,
	tokenGroup: null,
	currentUser: undefined,
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(authReducer, INITIAL_STATE, authInit);

	const setSession = (payload: ITokenGroup) => {
		localStorage.setItem(TOKEN_GROUP_KEY, JSON.stringify(payload));
		dispatch({ type: AuthReducerAction.SET_SESSION, payload });
	};
	const setUserData = (payload: IUser) => {
		dispatch({ type: AuthReducerAction.SET_USER_DATA, payload });
	};
	const logoutUser = () => {
		localStorage.removeItem(TOKEN_GROUP_KEY);
		dispatch({ type: AuthReducerAction.LOGOUT });
	};

	const user = useFetchCurrentUser(state.tokenGroup);

	useEffect(() => {
		if (user) {
			setUserData(user);
		}
	}, [user]);

	return (
		<AuthContext.Provider
			value={{ state, setSession, logoutUser, setUserData }}
		>
			{children}
		</AuthContext.Provider>
	);
};
