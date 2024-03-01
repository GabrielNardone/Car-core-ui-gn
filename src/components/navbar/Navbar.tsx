import { TruckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { AuthStatus } from '@/context/authReducer';
import { useAuthContext } from '@/hooks/useAuthContext';
import { UserRole } from '@/interfaces/user.interfaces';

export const Navbar = () => {
	const { state, logoutUser } = useAuthContext();

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-b dark:border-gray-700">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a href="#" className="flex items-center text-white">
					<TruckIcon className="h-8 mr-3" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						Car Rental
					</span>
				</a>

				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-8 md:mt-0 ">
						<li>
							<Link to="/" className=" text-black  dark:text-white ">
								Home
							</Link>
						</li>
						<li>
							<Link to="/about" className=" text-black dark:text-white ">
								About
							</Link>
						</li>
						<li>
							{state?.status === AuthStatus.AUTHENTICATED &&
								state?.currentUser?.role === UserRole.ADMIN && (
									<Link
										data-cy="admin-page-link"
										to="/admin"
										className=" text-black dark:text-green-500 "
									>
										Admin
									</Link>
								)}
						</li>
						<li>
							{state?.status === 'authenticated' ? (
								<button
									data-cy="logout-button"
									className="px-4 py-1 bg-red-600 opacity-70 text-black rounded dark:text-white hover:opacity-100"
									onClick={() => logoutUser()}
								>
									Logout
								</button>
							) : (
								<Link
									data-cy="login-page-link"
									to="/login"
									className="px-4 py-1 bg-blue-700 rounded-md block text-black dark:text-white "
								>
									Login
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
