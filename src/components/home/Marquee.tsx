import { ArrowDownIcon } from '@heroicons/react/24/solid';

export const Marquee = () => {
	return (
		<div
			data-cy="marquee"
			className="relative flex overflow-x-hidden bg-slate-800"
		>
			<div className="flex animate-marquee items-center whitespace-nowrap py-2">
				<span className="ml-2 text-lg italic text-rose-400">
					¡¡GREAT DEALS ON HIGHWAY-12!!
				</span>
				<span className="ml-2 text-lg text-slate-200">
					Throughout the month of March, book with a ¡
					<span className="text-green-500 font-bold">20% </span>discount!
				</span>
				<ArrowDownIcon className="w-6 text-green-500" />
				<span className="ml-2 text-lg italic text-yellow-400">
					¡Safety and Comfort, just what you are looking for!
				</span>
				<span className="ml-2 text-lg text-slate-200">
					Throughout the month of March, book with a ¡
					<span className="text-green-500 font-bold">20% </span> discount!
				</span>
				<ArrowDownIcon className="w-6 text-green-500" />
			</div>

			<div className="absolute top-0 flex animate-marquee2 items-center whitespace-nowrap py-2">
				<span className="ml-2 text-lg italic text-rose-400">
					¡¡GREAT DEALS ON HIGHWAY-12!!
				</span>
				<span className="ml-2 text-lg text-slate-200">
					Throughout the month of March, book with a ¡
					<span className="text-green-500 font-bold">20% </span>discount!
				</span>
				<ArrowDownIcon className="w-6 text-green-500" />
				<span className="ml-2 text-lg italic text-yellow-400">
					¡Safety and Comfort, just what you are looking for!
				</span>
				<span className="ml-2 text-lg text-slate-200">
					Throughout the month of March, book with a ¡
					<span className="text-green-500 font-bold">20% </span> discount!
				</span>
				<ArrowDownIcon className="w-6 text-green-500" />
			</div>
		</div>
	);
};
