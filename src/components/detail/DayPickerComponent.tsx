import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { useAuthContext } from '@/hooks/useAuthContext';
import { INewRentDto } from '@/interfaces/rent.interfaces';
import { createRent } from '@/services/api/rent/rent';

export const DayPickerComponent = ({
	carId,
	carPrice,
}: {
	carId: number;
	carPrice: number;
}) => {
	const { state } = useAuthContext();
	const [range, setRange] = useState<DateRange | undefined>();

	let footer = <p>Please pick the first day.</p>;
	if (range?.from) {
		if (!range.to) {
			footer = <p>{format(range.from, 'PPP')}</p>;
		} else if (range.to) {
			footer = (
				<p>
					{format(range.from, 'PPP')}–{format(range.to, 'PPP')}
				</p>
			);
		}
	}

	const rentBook = async () => {
		const newRent: INewRentDto = {
			user: 2,
			admin: 1,
			car: carId,
			pricePerDay: carPrice,
			startingDate: range?.from,
			endDate: range?.to,
			dueDate: range?.to,
			rejected: false,
		};

		await createRent(newRent);
	};

	const handleBook = async () => {
		if (state.status !== 'authenticated') {
			notifyStatus(
				NOTIFICATION_TYPE.WARNING,
				'detail-warning-book-alert',
				'You must be logged in to book',
			);
		} else {
			try {
				await rentBook();
				notifyStatus(
					NOTIFICATION_TYPE.SUCCESS,
					'detail-success-book-alert',
					'You have successfully booked the car!',
				);
			} catch (error) {
				if (error instanceof Error) {
					notifyStatus(
						NOTIFICATION_TYPE.ERROR,
						'detail-error-book-alert',
						error.message,
					);
				}
			}
		}
	};

	return (
		<div className="border-t-[1px] border-gray-300 mt-2 flex flex-col items-center">
			<h3 className="text-md font-medium mt-2">Choose date and time</h3>

			<DayPicker
				data-cy="day-picker"
				mode="range"
				min={3}
				max={21}
				defaultMonth={new Date()}
				fixedWeeks
				fromYear={new Date().getFullYear()}
				toYear={new Date().getFullYear() + 1}
				selected={range}
				onSelect={setRange}
				footer={footer}
				modifiersStyles={{
					selected: { background: '#800080' },
				}}
			/>
			<button
				data-cy="detail-book-car-button"
				disabled={!!range?.to}
				type="button"
				className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
					range?.to ? 'cursor-pointer' : 'cursor-not-allowed'
				}`}
				onClick={handleBook}
			>
				Book
			</button>
		</div>
	);
};
