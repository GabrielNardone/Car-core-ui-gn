import { CarCardsSection } from '@/components/home/CarCardsSection';
import { Marquee } from '@/components/home/Marquee';

export default function HomePage() {
	return (
		<div className="items-center min-h-screen bg-gray-900 text-white">
			<Marquee />

			<div className="relative">
				<div className=" w-full overflow-hidden">
					<img
						data-cy="home-background"
						src="/home-background.jpg"
						alt="home-background"
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<div className="absolute bottom-5 left-5">
					<h1
						data-cy="home-title"
						className="text-5xl mb-2 text-violet-400 font-serif"
					>
						Highway-12
					</h1>
					<span data-cy="home-subtitle" className="text-3xl text-violet-200">
						Car Rental – Search, Compare & Save
					</span>
				</div>
			</div>

			<CarCardsSection />
		</div>
	);
}
