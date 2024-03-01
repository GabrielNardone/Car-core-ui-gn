import { createContext } from 'react';

import { IAuthState } from './authReducer';

import { ITokenGroup } from '@/interfaces/auth.interfaces';

export interface IAuthContext {
	state: IAuthState;
	setSession: (payload: ITokenGroup) => void;
	logoutUser: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
