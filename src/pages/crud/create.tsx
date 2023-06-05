import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ssApi } from "../../../api";
import { validations } from "../../../utils";

const CreateUserPage = () => {
	type FormData = {
		name: string;
		last_name: string;
		second_last_name: string;
		mail: string;
		password: string;
	};

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onCreateUser = async ({
		name,
		last_name,
		second_last_name,
		mail,
		password,
	}: FormData) => {
		console.log({ name, last_name, second_last_name, mail, password });

		await ssApi({
			method: "POST",
			url: "/crud",
			data: FormData,
		});

		router.push("/");
	};

	return (
		<div>
			<section className='hero is-primary is-fullheight'>
				<div className='hero-body'>
					<div className='container'>
						<div className='columns is-centered'>
							<div className='column is-5-tablet is-4-desktop is-3-widescreen'>
								<form
									noValidate
									className='box'
									onSubmit={handleSubmit(onCreateUser)}
								>
									<div className='has-text-centered'>
										<label className='label'>Crear nuevo usuario</label>
									</div>

									{/* Nombnre */}
									<div className='field'>
										<label className='label'>Nombre</label>
										<div className='control has-icons-left'>
											<input
												type='text'
												placeholder='Paco'
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
									</div>

									{/* Apellido */}
									<div className='field'>
										<label className='label'>Primer Apellido</label>
										<div className='control has-icons-left'>
											<input
												type='text'
												placeholder='Sanchez'
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
									</div>

									<div className='field'>
										<label className='label'>Segundo Apellido</label>
										<div className='control has-icons-left'>
											<input
												type='text'
												placeholder='Hernandez'
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
									</div>

									<div className='field'>
										<label className='label'>Correo</label>
										<div className='control has-icons-left'>
											<input
												type='email'
												placeholder='mail@gmail.com'
												className='input'
												{...register("mail", {
													required: "Este campo es requerido",
													validate: validations.isEmail,
												})}
											/>
										</div>
									</div>
									<div className='field'>
										<label className='label'>Contraseña</label>
										<div className='control has-icons-left'>
											<input
												type='password'
												placeholder='*******'
												className='input'
												{...register("password", {
													required: "Este campo es requerido",
													minLength: {
														value: 6,
														message: "Míniomo 6 caracteres",
													},
												})}
											/>
										</div>
									</div>
									<div className='field mb-auto mt-auto '>
										<button
											className='button is-success ml-1 mr-1'
											type="submit"
										>
											Crear
										</button>
										<button className='button is-success ml-1 mr-1'>
											<Link href={"/"}>Atras</Link>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CreateUserPage;
