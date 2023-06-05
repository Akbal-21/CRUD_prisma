import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { dbUsers } from "../../../database";
import { IData_User } from "../../../interfaces";

interface Props {
	data: IData_User;
}

const ReadPage: NextPage<Props> = ({ data }) => {
	const router = useRouter();

	const onBack = () => {
		router.replace("/");
	};

	return (
		<div>
			<div>
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
											<label className='label'>Nombre: {data.name}</label>
										</div>

										{/* Primer Apellido */}
										<div className='field'>
											<label className='label'>
												Primer apellido: {data.last_name}
											</label>
										</div>

										{/* Segundo apellido */}
										<div className='field'>
											<label className='label'>
												Segundo apellido: {data.second_last_name}
											</label>
										</div>

										{/* Correo */}
										<div className='field'>
											<label className='label'>Correo: {data.mail}</label>
										</div>
										<div className='field'>
											<button className='button is-success' onClick={onBack}>
												Atras
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { id = "" } = query as { id: string };

	const data = await dbUsers.getUser(Number(id));

	console.log(data);

	return {
		props: {
			data,
		},
	};
};

export default ReadPage;
