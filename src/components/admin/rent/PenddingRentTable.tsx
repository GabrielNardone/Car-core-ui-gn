import { notifyConfirmation } from '@/helpers/notifications';
import { IEditRentDto, IRent } from '@/services/api/rent/rent';

interface IRentTable {
	rents: IRent[];
	handleDeleteRent: (rentId: number) => Promise<void>;
	handleAcceptRent: (rentId: number, editedRent: IEditRentDto) => Promise<void>;
}

export const PenddingRentTable = ({
	rents,
	handleDeleteRent,
	handleAcceptRent,
}: IRentTable) => {
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
						User
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Car
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Price Per Day
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Start Date
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						End Date
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
				{rents?.map((rent) => (
					<tr key={rent.id} data-cy="car-table">
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{rent.id}
						</td>
						<td
							data-cy={`car-brand-${rent.id}`}
							className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
						>
							{rent.user?.firstName} {rent.user?.lastName}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{rent.car.brand} {rent.car.model}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{rent.pricePerDay}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{rent.startingDate.toString()}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{rent.endDate.toString()}
						</td>
						<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
							<button
								data-cy={`accept-rent-${rent.id}`}
								className="text-indigo-400 hover:text-indigo-300"
								onClick={() => handleAcceptRent(rent.id, { rejected: false })}
							>
								Accept
							</button>
						</td>
						<td className="relative whitespace-nowrap py-4 pl-4 pr-4 text-right text-sm font-medium sm:pr-0">
							<button
								data-cy={`deny-rent-${rent.id}`}
								className="text-red-400"
								onClick={() => {
									notifyConfirmation(
										'confirm-car-delete-alert',
										handleDeleteRent,
										rent.id,
									);
								}}
							>
								Deny
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
