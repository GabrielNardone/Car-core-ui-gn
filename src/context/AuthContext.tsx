import { createContext } from 'react';

import { IAuthState } from './authReducer';

import { ITokenGroup } from '@/interfaces/auth.interfaces';
import { IUser } from '@/interfaces/user.interfaces';

export interface IAuthContext {
	state: IAuthState;
	setSession: (payload: ITokenGroup) => void;
	setUserData: (payload: IUser) => void;
	logoutUser: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
