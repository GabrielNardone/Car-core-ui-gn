import { createBrowserRouter } from 'react-router-dom';

import { CarGalleryPage } from '@/pages/admin/car/CarGalleryPage';
import { CarTablePage } from '@/pages/admin/car/CarTablePage';
import { CreateCarFormPage } from '@/pages/admin/car/CreateCarFormPage';
import { EditCarFormPage } from '@/pages/admin/car/EditCarFormPage';
import { AdminPage } from '@/pages/admin/layout/AdminPage';
import { CreateUserFormPage } from '@/pages/admin/user/CreateUserFormPage';
import { EditUserFormPage } from '@/pages/admin/user/EditUserFormPage';
import { UserTablePage } from '@/pages/admin/user/UserTablePage';

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
						element: <CarTablePage />,
					},
					{
						path: '/admin/car-form',
						element: <CreateCarFormPage />,
					},
					{
						path: '/admin/car-edit/:id',
						element: <EditCarFormPage />,
					},
					{
						path: '/admin/car-gallery/:id',
						element: <CarGalleryPage />,
					},
					{
						path: '/admin/user',
						element: <UserTablePage />,
					},
					{
						path: '/admin/user-form',
						element: <CreateUserFormPage />,
					},
					{
						path: '/admin/user-edit/:id',
						element: <EditUserFormPage />,
					},
				],
			},
		],
	},
]);

export default router;
