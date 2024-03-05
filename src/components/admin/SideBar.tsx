import { KeyIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { BiSolidCar } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const navigation = [
	{
		name: 'Car',
		href: '/admin/car',
		icon: BiSolidCar,
	},
	{
		name: 'User',
		href: '/admin/user',
		icon: UserIcon,
	},
	{
		name: 'Rent',
		href: '/admin/pendding-rent',
		icon: KeyIcon,
	},
];

export const SideBar = () => {
	return (
		<div className="w-60 flex flex-col gap-y-5 px-6 pt-8 border-r-[1px] border-r-gray-600">
			<nav className="flex flex-col mx-2 space-y-1">
				{navigation.map((item) => (
					<NavLink
						data-cy={`admin-sidebar-${item.name}-item`}
						key={item.name}
						to={item.href}
						style={{
							display: 'flex',
							color: 'rgb(156 163 175)',
							columnGap: '12px',
							marginBottom: '15px',
							fontWeight: 600,
							fontSize: '0.9rem',
							borderRadius: '6px',
							padding: '4px',
						}}
						className={({ isActive }) =>
							isActive ? 'bg-gray-800 text-white' : ''
						}
					>
						<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
						{item.name}
					</NavLink>
				))}
			</nav>
		</div>
	);
};
