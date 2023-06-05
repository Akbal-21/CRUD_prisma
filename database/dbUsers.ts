import { PrismaClient } from "@prisma/client";
import { IData_User } from "../interfaces";

export const getUsers = async (): Promise<IData_User[]> => {
	const prisma = new PrismaClient();

	await prisma.$connect();
	const users = await prisma.user.findMany();
	await prisma.$disconnect();

	return JSON.parse(JSON.stringify(users));
};

export const getUser = async (id: number): Promise<IData_User[]> => {
	const prisma = new PrismaClient();

	await prisma.$connect();
	const users = await prisma.user.findFirst({
		where: {
			id,
		},
	});
	await prisma.$disconnect();

	return JSON.parse(JSON.stringify(users));
};
