import { Link } from 'react-router-dom';

export const Navbar = () => (
	<nav className="bg-white dark:bg-gray-900 dark:border-b  dark:border-violet-500">
		<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="#" className="flex items-center text-white">
				<img src="/car-1.png" alt="car-logo" className="w-10 mr-2" />
				<span className="self-center text-2xl whitespace-nowrap dark:text-violet-400 font-serif underline">
					Highway-12
				</span>
			</a>

			<div className="hidden w-full md:block md:w-auto" id="navbar-default">
				<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:items-center md:space-x-8 md:mt-0 ">
					<li>
						<Link to="/" className="block text-black  dark:text-white ">
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							className="block text-black rounded dark:text-white "
						>
							About
						</Link>
					</li>
					<li className="px-4 py-1 bg-violet-700 rounded-md">
						<Link
							to="/login"
							className="block text-black rounded dark:text-white "
						>
							Login
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);
