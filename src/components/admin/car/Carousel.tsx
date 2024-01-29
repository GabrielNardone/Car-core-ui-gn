import {
	ChevronLeftIcon,
	ChevronRightIcon,
	StopCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

import { IimagesProps } from '@/service/api/car/get-all-cars';

export const Carousel = ({ images }: { images: IimagesProps[] }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const updateIndex = (newIndex: number) => {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= images.length) {
			newIndex = images.length - 1;
		}

		setActiveIndex(newIndex);
	};

	if (!images || images.length === 0) {
		return <img src="/no_image_available.jpg" alt="no image" />;
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
			<div
				className="relative h-full w-full whitespace-nowrap transition-transform duration-300"
				style={{ transform: `translate(-${activeIndex * 100}%)` }}
			>
				{images.map((img) => (
					<img
						key={img.id}
						src={img.src}
						loading="lazy"
						alt="car"
						className="inline-flex h-full w-full items-center justify-center whitespace-normal rounded-md border-0 duration-1000"
					/>
				))}
			</div>

			<div className="absolute bottom-6 flex w-4/6 justify-between bg-white bg-opacity-40 py-[2px] px-4 rounded-full">
				<button
					className="border-none text-black"
					onClick={() => updateIndex(activeIndex - 1)}
				>
					<ChevronLeftIcon className="text-3xl text-black" />
				</button>

				<div className="flex gap-4 border-none text-black">
					{images.map((img, index) => (
						<button
							key={img.id}
							onClick={() => {
								updateIndex(index);
							}}
						>
							<StopCircleIcon
								className={`${index === activeIndex && 'text-white'}`}
							/>
						</button>
					))}
				</div>

				<button
					className="border-none text-black"
					onClick={() => updateIndex(activeIndex + 1)}
				>
					<ChevronRightIcon className="text-3xl text-black" />
				</button>
			</div>
		</div>
	);
};
