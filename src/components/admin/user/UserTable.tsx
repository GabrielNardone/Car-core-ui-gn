import { TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { notifyConfirmation } from '@/helpers/notifications';
import { IUser } from '@/services/api/user/user';

interface IUserTable {
	users: IUser[];
	handleDeleteUser: (userId: number) => Promise<void>;
}

export const UserTable = ({ users, handleDeleteUser }: IUserTable) => {
	return (
		<table className="min-w-full divide-y divide-gray-700">
			<thead>
				<tr>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						ID
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
					>
						Name
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						email
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Address
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Country
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Rol
					</th>
					<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
						<span className="sr-only">Edit</span>
					</th>
					<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
						<span className="sr-only">Delete</span>
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-800">
				{users?.map((user) => (
					<tr key={user.id} data-cy="user-table">
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{user.id}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
							{`${user.firstName} ${user.lastName}`}
						</td>
						<td
							data-cy={`user-email-${user.id}`}
							className="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
						>
							{user.email}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{user.address}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{user.country}
						</td>
						<td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{user.role}
						</td>
						<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
							<Link
								data-cy={`edit-user-${user.id}`}
								to={`/admin/user-edit/${user.id}`}
								className="text-indigo-400 hover:text-indigo-300"
							>
								Edit
							</Link>
						</td>
						<td className="relative whitespace-nowrap py-4 pl-6 pr-4 text-right text-sm font-medium sm:pr-0">
							<TrashIcon
								data-cy="user-table-delete"
								className="text-white w-6 hover:text-red-400 hover:cursor-pointer"
								onClick={() => {
									notifyConfirmation(
										'confirm-user-table-delete-alert',
										handleDeleteUser,
										user.id,
									);
								}}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
