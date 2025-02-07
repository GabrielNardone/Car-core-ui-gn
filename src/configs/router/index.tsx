import { createBrowserRouter } from 'react-router-dom';

import { AdminGuard } from '@/guard/AdminGuard';
import { CarTablePage } from '@/pages/admin/car/CarTablePage';
import { CreateCarFormPage } from '@/pages/admin/car/CreateCarFormPage';
import { EditCarFormPage } from '@/pages/admin/car/EditCarFormPage';
import { AdminLayout } from '@/pages/admin/layout/AdminLayout';
import { EditUserFormPage } from '@/pages/admin/user/EditUserFormPage';
import { UserTablePage } from '@/pages/admin/user/UserTablePage';
import { ChangePasswordPage } from '@/pages/auth/ChangePasswordPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { CarGalleryPage } from '@/pages/home/CarGalleryPage';
import { DetailPage } from '@/pages/home/DetailPage';
import HomePage from '@/pages/home/HomePage';

import Root from '@pages/Root';
import About from '@pages/about/About';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/detail/:id',
				element: <DetailPage />,
			},
			{
				path: '/car-gallery/:id',
				element: <CarGalleryPage />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPasswordPage />,
			},
			{
				path: '/change-password',
				element: <ChangePasswordPage />,
			},
			{
				element: <AdminGuard />,
				children: [
					{
						path: '/admin',
						element: <AdminLayout />,
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
								path: '/admin/user',
								element: <UserTablePage />,
							},
							{
								path: '/admin/user-edit/:id',
								element: <EditUserFormPage />,
							},
						],
					},
				],
			},
		],
	},
]);

export default router;
