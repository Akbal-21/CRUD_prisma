/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IData_User } from "../../../../interfaces";

type Data =
	| { message: string }
	| { users: IData_User[] }
	| { user: IData_User };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "GET":
			return allUsers(req, res);

		case "POST":
			return createUser(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

async function allUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
	const prisma = new PrismaClient();

	await prisma.$connect();
	const users = await prisma.user.findMany();
	await prisma.$disconnect();

	return res.status(200).json({ users });
}

async function createUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	// console.log(req.body);

	const prisma = new PrismaClient();

	await prisma.$connect();
	const user = await prisma.user.create({ data: req.body });
	await prisma.$disconnect();

	return res.status(200).json({ user });
}
