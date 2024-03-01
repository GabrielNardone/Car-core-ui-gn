import { Navigate, Outlet } from 'react-router-dom';

import { AuthStatus } from '@/context/authReducer';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UserRole } from '@/interfaces/user.interfaces';

export const AdminGuard = () => {
	const { state } = useAuthContext();

	return state.status === AuthStatus.AUTHENTICATED &&
		state.currentUser?.role === UserRole.ADMIN ? (
		<Outlet />
	) : (
		<Navigate to={'/'} />
	);
};
