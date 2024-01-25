import { PhotoIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deleteCar } from '@/service/api/car/delete-car';
import { ICars, getAllCars } from '@/service/api/car/get-all-cars';

export const CarPage = () => {
	const [cars, setCars] = useState<ICars[]>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllCars().then((resp) => {
			setCars(resp);
			setIsLoading(false);
		});
	}, [cars]);

	return (
		<div className="flex-1">
			<div className="mx-auto max-w-7xl">
				<div className="bg-gray-900 py-10">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-base font-semibold leading-6 text-white">
									Cars
								</h1>
								<p className="mt-2 text-sm text-gray-300">
									A list of all the cars in your account.
								</p>
							</div>
							<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
								<Link
									to={'/admin/car-form'}
									className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>
									Add car
								</Link>
							</div>
						</div>
						<div className="mt-8 flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
									<table className="min-w-full divide-y divide-gray-700">
										<thead>
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
												>
													Brand
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-white"
												>
													Model
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-white"
												>
													Color
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
													Pictures
												</th>
												<th
													scope="col"
													className="relative py-3.5 pl-3 pr-4 sm:pr-0"
												>
													<span className="sr-only">Edit</span>
												</th>
												<th
													scope="col"
													className="relative py-3.5 pl-3 pr-4 sm:pr-0"
												>
													<span className="sr-only">Delete</span>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-800">
											{isLoading ? (
												<tr className="text-white">
													<td>Loading...</td>
												</tr>
											) : (
												cars?.map((car) => (
													<tr key={car.id} data-cy="car-table">
														<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
															{car.brand}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
															{car.model}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
															{car.color}
														</td>
														<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
															{car.pricePerDay}
														</td>
														<td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-300">
															See gallery <PhotoIcon className="w-6 ml-2" />
														</td>
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
															<a
																href="#"
																className="text-indigo-400 hover:text-indigo-300"
															>
																Edit
															</a>
														</td>
														<td className="relative whitespace-nowrap py-4 pl-6 pr-4 text-right text-sm font-medium sm:pr-0">
															<TrashIcon
																className="text-white w-6 hover:text-red-400 hover:cursor-pointer"
																onClick={() => {
																	Swal.fire({
																		title: 'Are you sure?',
																		text: "You won't be able to revert this!",
																		background: '#191919',
																		showCancelButton: true,
																		confirmButtonColor: '#17B169',
																		cancelButtonColor: '#d33',
																		confirmButtonText: 'Yes, delete it!',
																	}).then((result) => {
																		if (result.isConfirmed) {
																			deleteCar(car.id);
																			Swal.fire(
																				'Deleted!',
																				'Your file has been deleted.',
																				'success',
																			);
																		}
																	});
																}}
															/>
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
