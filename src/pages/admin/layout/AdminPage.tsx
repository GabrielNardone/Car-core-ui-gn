import { Outlet } from 'react-router-dom';

import { SideBar } from '@/components/admin/SideBar';

export const AdminPage = () => {
	return (
		<div className="h-full flex bg-gray-900 border-t-[1px] border-t-gray-600">
			<SideBar />
			<Outlet />
		</div>
	);
};
