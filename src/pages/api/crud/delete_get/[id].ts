/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { IData_User } from "../../../../../interfaces";

type Data = { message: string } | { user: IData_User };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(req.query);

	switch (req.method) {
		case "DELETE":
			return deletUser(req, res);

		case "PUT":
			return updateUser(req, res);

		default:
			return res.status(404).json({ message: "Bad Request" });
	}
}

async function deletUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	if (!id) {
		return res.status(404).json({ message: "Invalit ID" });
	}
	const prisma = new PrismaClient();

	await prisma.$connect();
	const deleteUser = await prisma.user.delete({
		where: { id: +id },
	});
	await prisma.$disconnect();

	if (!deleteUser) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ message: "User delete" });
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	if (!id) {
		return res.status(404).json({ message: "Invalit ID" });
	}

	const prisma = new PrismaClient();

	await prisma.$connect();
	const updateUser = await prisma.user.update({
		where: {
			id: +id,
		},
		data: req.body,
	});
	await prisma.$disconnect();

	if (!updateUser) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ message: "User updated" });
}
