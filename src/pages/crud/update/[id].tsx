import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ssApi } from "../../../../api";
import { dbUsers } from "../../../../database";
import { IData_User } from "../../../../interfaces";
import { validations } from "../../../../utils";

interface Props {
	data: IData_User;
}

interface FormData {
	name: string;
	last_name: string;
	second_last_name: string;
	mail: string;
	password: string;
}

const UpdatePage: NextPage<Props> = ({ data }) => {
	const [isSaving, setIsSaving] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: data,
	});

	const router = useRouter();

	const onDeleteUser = async () => {
		await ssApi({
			method: "DELETE",
			url: `/crud/delete_get/${data.id}`,
		});

		router.push("/");
	};

	const onBack = () => {
		router.push("/");
	};

	const onUpdateUser = async ({
		name,
		last_name,
		second_last_name,
		mail,
	}: FormData) => {
		console.log(name, last_name, second_last_name, mail);
		setIsSaving(true);

		if ((name || last_name || second_last_name).length < 2) {
			return alert("Mínimo 2 caracteres");
		}

		try {
			const res = await ssApi({
				method: "PUT",
				url: `/crud/delete_get/${data.id}`,
				data: {
					name,
					last_name,
					second_last_name,
					mail,
				},
			});

			console.log(res.data);

			if (!data.id) {
				router.reload();
			} else {
				setIsSaving(false);
			}

			router.push("/");
		} catch (error) {
			console.log(error);

			setIsSaving(false);
		}
	};

	return (
		<div>
			<div>
				<form noValidate onSubmit={handleSubmit(onUpdateUser)}>
					<section className='hero is-primary is-fullheight'>
						<div className='hero-body'>
							<div className='container'>
								<div className='columns is-centered'>
									<div className='column is-5-tablet is-4-desktop is-3-widescreen'>
										<div className="box">
											<div className='has-text-centered'>
												<label className='label'>Usuario</label>
											</div>

											{/* Nomber */}
											<div className='field'>
												<label className='label'>Nombre:</label>
												<input
													className='input'
													{...register("name", {
														required: "Este campo es requerido",
														minLength: {
															value: 2,
															message: "Míniomo 2 caracteres",
														},
													})}
												/>
											</div>

											{/* Primer Apellido */}
											<div className='field'>
												<label className='label'>Primer apellido:</label>
												<input
													className='input'
													{...register("last_name", {
														required: "Este campo es requerido",
														minLength: {
															value: 2,
															message: "Míniomo 2 caracteres",
														},
													})}
												/>
											</div>

											{/* Segundo apellido */}
											<div className='field'>
												<label className='label'>Segundo apellido:</label>
												<input
													className='input'
													{...register("second_last_name", {
														required: "Este campo es requerido",
														minLength: {
															value: 2,
															message: "Míniomo 2 caracteres",
														},
													})}
												/>
											</div>

											{/* Correo */}
											<div className='field'>
												<label className='label'>Correo:</label>
												<input
													className='input'
													{...register("mail", {
														required: "Este campo es requerido",
														validate: validations.isEmail,
													})}
												/>
											</div>
											<div className='field'>
												<button
													className='button is-success m-2'
													disabled={isSaving}
													onClick={onBack}
												>
													Atras
												</button>
												<button
													className='button is-info m-2'
													type="submit"
													disabled={isSaving}
												>
													Actualizar
												</button>
												<button
													className='button is-danger m-2'
													onClick={onDeleteUser}
													disabled={isSaving}
												>
													Eliminar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</form>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { id = "" } = query as { id: string };

	const data = await dbUsers.getUser(Number(id));

	return {
		props: {
			data,
		},
	};
};

export default UpdatePage;
