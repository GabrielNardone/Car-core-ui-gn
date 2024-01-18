import { TruckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const Navbar = () => (
	<nav className="bg-white border-gray-200 dark:bg-black">
		<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="#" className="flex items-center text-white">
				<TruckIcon className="h-8 mr-3" />
				<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
					Car Rental
				</span>
			</a>

			<div className="hidden w-full md:block md:w-auto" id="navbar-default">
				<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 ">
					<li>
						<Link
							to="/"
							className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						>
							About
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);
