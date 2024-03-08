import { HomeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface IAuthLayout {
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	img?: string;
}

export const AuthLayout = ({
	children,
	title,
	subtitle,
	img = '/auth/login-image.svg',
}: IAuthLayout) => {
	return (
		<div className="flex h-full  flex-col items-center justify-center bg-gray-900">
			<div className="w-[60%] py-8 mx-4 flex flex-col ">
				<Link to={'/'} className="flex items-center justify-end">
					<span className="text-white">Back to Home</span>
					<HomeIcon className="w-6 ml-[2px] text-xl text-white" />
				</Link>

				<div className="flex rounded-lg border-none bg-slate-300 px-4 py-8 md:flex">
					<div className="w-full md:w-1/2">
						<h3 className="mb-4 text-2xl">{title}</h3>
						<h5 className="text-sm text-blue-700">{subtitle}</h5>
						{children}
					</div>
					<div className="hidden items-center justify-end md:flex md:w-1/2">
						<img
							src={img}
							alt="auth-image"
							className="h-auto w-full rounded-r-lg object-cover pl-8"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
