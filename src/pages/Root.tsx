import { Outlet } from 'react-router-dom';

import { Navbar } from '@components/navbar/Navbar';

export default function Root() {
	// const { loginUser } = useAuthContext();

	// const getCurrentUser = async (): Promise<IUser> => {
	// 	const currentUser = await getMe();
	// 	if (currentUser) {
	// 		loginUser(currentUser);
	// 	}
	// 	return currentUser;
	// };

	// useQuery({
	// 	queryKey: ['user'],
	// 	queryFn: getCurrentUser,
	// 	staleTime: 1000 * 60 * 5,
	// });

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main id="pages" className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
