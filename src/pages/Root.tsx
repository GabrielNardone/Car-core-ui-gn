import { Outlet } from 'react-router-dom';

import { Navbar } from '@components/navbar/Navbar';

export default function Root() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main id="pages" className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
