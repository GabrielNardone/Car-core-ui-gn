import { useQuery } from '@tanstack/react-query';
import { createContext, useReducer } from 'react';

import { IAuthState, authReducer } from './authReducer';

import { IUser, getMe } from '@/services/api/user/user';

interface IAuthContext {
	state: IAuthState;
	loginUser: (payload: IUser) => void;
	logoutUser: () => void;
	checkingCredentials: () => void;
}

const INITIAL_STATE: IAuthState = {
	status: 'not-authenticated',
	currentUser: undefined,
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
interface IContextProps {
	children: JSX.Element | JSX.Element[];
}
export const AuthContextProvider = ({ children }: IContextProps) => {
	const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

	const loginUser = (payload: IUser) => {
		dispatch({ type: 'LOGIN', payload });
	};

	const logoutUser = () => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('tokenGroup');
	};

	const checkingCredentials = () => {
		dispatch({ type: 'CHECKING_CREDENTIALS' });
	};

	const getCurrentUser = async (): Promise<IUser> => {
		const currentUser = await getMe();
		if (currentUser) {
			loginUser(currentUser);
		}
		return currentUser;
	};

	useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
		enabled: state.status === 'not-authenticated',
	});
	console.log(state);

	return (
		<AuthContext.Provider
			value={{ state, loginUser, logoutUser, checkingCredentials }}
		>
			{children}
		</AuthContext.Provider>
	);
};
