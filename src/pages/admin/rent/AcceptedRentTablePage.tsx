import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AcceptedRentTable } from '@/components/admin/rent/AcceptedRentTable';
import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import {
	IEditRentDto,
	IRent,
	editRent,
	getAllRents,
} from '@/services/api/rent/rent';

export const AcceptedRentTablePage = () => {
	const [rent, setRent] = useState<IRent[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const acceptedRents = rent.filter((rent) => rent.rejected === false);

	const handleRejectRent = async (
		rentId: number,
		editedRent: IEditRentDto,
	): Promise<void> => {
		try {
			await editRent(rentId, editedRent);

			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'rent-table-reject-alert',
				'Rent rejected successfully',
			);

			setRent((prevCars) => prevCars?.filter((rent) => rent.id !== rentId));
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'rent-table-reject-error-alert',
					error.message,
				);
			}
		}
	};

	const fetchRents = async () => {
		try {
			const rents = await getAllRents();
			setRent(rents);
			setIsLoading(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'get-all-rents-error-alert',
					error.message,
				);
			}
		}
	};

	useEffect(() => {
		fetchRents();
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
								<h1 className="text-base font-semibold leading-6 text-green-400">
									Accepted Rents
								</h1>
								<p className="mt-2 text-sm text-gray-300">
									A list of all the accepted rents.
								</p>
							</div>
							<div className="flex items-center gap-x-2 mt-4 sm:ml-16 sm:mt-0 sm:flex-none rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
								<ArrowLeftIcon className="h-5 w-5" />
								<Link data-cy="pendding-rent-link" to={'/admin/pendding-rent'}>
									Pendding Rents
								</Link>
							</div>
						</div>
						<div className="mt-8 flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
									<AcceptedRentTable
										rents={acceptedRents}
										handleRejectRent={handleRejectRent}
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
