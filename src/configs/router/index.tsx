import { createBrowserRouter } from 'react-router-dom';

import { AdminPage } from '@/pages/admin/layout/AdminPage';

import Root from '@pages/Root';
import About from '@pages/about/About';
import Home from '@pages/home/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/admin',
				element: <AdminPage />,
			},
		],
	},
]);

export default router;
