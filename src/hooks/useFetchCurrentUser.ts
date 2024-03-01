import { useQuery } from '@tanstack/react-query';

import { ITokenGroup } from '@/interfaces/auth.interfaces';
import { getMe } from '@/services/api/user/user';

export const useFetchCurrentUser = (tokenGroup: ITokenGroup | null) => {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getMe,
		enabled: !!tokenGroup,
		retry: false,
	});

	return user;
};
