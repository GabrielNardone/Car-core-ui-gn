import { Navigate } from 'react-router-dom';

import { useAuthContext } from '@/context/useAuthContext';

interface IAdminGuard {
	children: JSX.Element | JSX.Element[];
}
export const AdminGuard = ({ children }: IAdminGuard) => {
	const { state } = useAuthContext();

	return state.status === 'authenticated' &&
		state.currentUser?.role === 'admin' ? (
		<>{children}</>
	) : (
		Navigate({ to: '/' })
	);
};
