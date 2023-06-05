import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	users: IData_User[];
}

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", headerAlign: "center", width: 70 },
	{ field: "name", headerName: "Nombre", headerAlign: "center", width: 140 },
	{
		field: "last_name",
		headerName: "Primer Apellido",
		headerAlign: "center",
		width: 130,
	},
	{
		field: "second_last_name",
		headerName: "Segundo Apellido",
		headerAlign: "center",
		width: 130,
	},
	{ field: "mail", headerName: "Correo", headerAlign: "center", width: 140 },
	{
		field: "actions",
		headerName: "Acciones",
		headerAlign: "center",
		renderCell: ({ row }: GridRenderCellParams) => {
			return (
				<div>
					<Button
						variant="contained"
						size="small"
						color="success"
						startIcon={<EditIcon />}
						sx={{ marginRight: "5px", marginLeft: "5px" }}
						href={`/crud/update/${row.id}`}
					>
						Editar
					</Button>

					<Button
						variant="contained"
						size="small"
						startIcon={<EditIcon />}
						sx={{ marginRight: "5px", marginLeft: "5px" }}
						href={`/crud/${row.id}`}
					>
						Ver
					</Button>
				</div>
			);
		},
		width: 250,
	},
];

const Home: NextPage<Props> = ({ users }) => {
	const rows = users.map((user) => ({
		id: user.id,
		name: user.name,
		last_name: user.last_name,
		second_last_name: user.second_last_name,
		mail: user.mail,
	}));

	return (
		<>
			<div>
				<section className="hero is-light is-fullheight">
					<div className="hero-body">
						<div className="container ">
							<div className="box ">
								<div className="has-text-centered">
									<label className="label is-large">CRUD</label>
								</div>
								<div className="is-align-items-flex-end">
									<button className="button is-success">
										<Link href={"/crud/create"}>Agregar usuaruio</Link>
									</button>
								</div>
								<div className="column is-is-centered">
									<div className="table-container is-fullwidth">
										<div className="table is-bordered ">
											<DataGrid
												sx={{ alignItems: "normal", textAlign: "center" }}
												rows={rows}
												columns={columns}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from "next";
import { dbUsers } from "../../database";
import { IData_User } from "../../interfaces";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const users = await dbUsers.getUsers(); // your fetch function here

	return {
		props: {
			users,
		},
	};
};

export default Home;
