import useSWR, { SWRConfiguration } from "swr";
import { IData_User } from "../interfaces";

export const useDataUSer = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IData_User[]>(`/api${url}`, config);

	return {
		dataUser: data || [],
		isLoadig: !(data || error),
		isError: error,
	};
};

export const useDataUserByID = (url: string, config: SWRConfiguration = {}) => {
	const { data, error } = useSWR<IData_User>(`/api${url}`);
	if (!data) {
		return {
			dataUser: null,
			isLoadig: !(data || error),
			isError: error,
		};
	}
	return {
		dataUser: data,
		isLoadig: !(data || error),
		isError: error,
	};
};
