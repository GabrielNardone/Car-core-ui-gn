import { IUser } from '@/services/api/user/user';

type StatusType = 'checking' | 'authenticated' | 'not-authenticated';
type ActionType =
	| { type: 'LOGIN'; payload: IUser }
	| { type: 'LOGOUT' }
	| { type: 'CHECKING_CREDENTIALS' };

export interface IAuthState {
	status: StatusType;
	currentUser: IUser | undefined;
}

export const authReducer = (
	state: IAuthState,
	action: ActionType,
): IAuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				status: 'authenticated',
				currentUser: {
					id: action.payload.id,
					createdAt: action.payload.createdAt,
					updatedAt: action.payload.updatedAt,
					externalId: action.payload.externalId,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					email: action.payload.email,
					dob: action.payload.dob,
					address: action.payload.address,
					country: action.payload.country,
					role: action.payload.role,
				},
			};
		case 'LOGOUT':
			return {
				status: 'not-authenticated',
				currentUser: {
					id: 0,
					createdAt: {} as Date,
					updatedAt: {} as Date,
					externalId: '',
					firstName: '',
					lastName: '',
					email: '',
					dob: {} as Date,
					address: '',
					country: '',
					role: '',
				},
			};
		case 'CHECKING_CREDENTIALS':
			return {
				...state,
				status: 'checking',
			};
		default:
			return state;
	}
};
