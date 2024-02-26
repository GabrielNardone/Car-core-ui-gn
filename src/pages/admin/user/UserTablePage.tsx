import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserTable } from '@/components/admin/user/UserTable';
import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { IUser, deleteUser, getAllUsers } from '@/services/api/user/user';

export const UserTablePage = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleDeleteUser = async (userId: number): Promise<void> => {
		try {
			await deleteUser(userId);
			notifyStatus(NOTIFICATION_TYPE.DELETED, 'close-user-table-delete-alert');
			setUsers((prevUsers) => prevUsers?.filter((user) => user.id !== userId));
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'user-table-delete-error-alert',
					error.message,
				);
			}
		}
	};

	const fetchUsers = async () => {
		try {
			const users = await getAllUsers();
			setUsers(users);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'get-all-users-error-alert',
					error.message,
				);
			}
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if (isLoading) {
		return (
			<div className="w-full grid place-content-center text-white text-xl">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex-1">
			<div className="mx-auto max-w-7xl">
				<div className="bg-gray-900 py-10">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-base font-semibold leading-6 text-white">
									Users
								</h1>
								<p className="mt-2 text-sm text-gray-300">
									A list of all the users in your account.
								</p>
							</div>
							<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
								<Link
									data-cy="add-user-link"
									to={'/admin/user-form'}
									className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>
									Add user
								</Link>
							</div>
						</div>
						<div className="mt-8 flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
									<UserTable
										users={users}
										handleDeleteUser={handleDeleteUser}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
