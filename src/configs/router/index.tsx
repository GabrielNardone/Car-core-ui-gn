import { createBrowserRouter } from 'react-router-dom';

import { CarForm } from '@/pages/admin/car/CarForm';
import { CarPage } from '@/pages/admin/car/CarPage';
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
				children: [
					{
						path: '/admin/car',
						element: <CarPage />,
					},
					{
						path: '/admin/car-form',
						element: <CarForm />,
					},
				],
			},
		],
	},
]);

export default router;
