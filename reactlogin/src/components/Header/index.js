import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { isLogged, doLogout } from '../../helpers/authHeader';

const Page = () => {
	/* const [logged, setLogged] = useState(false);

	useEffect(() => {
		const verifyLogeed = async () => {
			let res = await isLogged();
			console.log(res);
			setLogged(res);
		}
		verifyLogeed();
	}) */
	let logged = isLogged();

	const handleLogout = () => {
		doLogout();
		window.location.href = '/';
	}
	return (
		<div className='headerArea'>
			<div className="containerr">
				<div className="logo">
					<Link to="/">Logo</Link>
				</div>
				<nav>
					<ul>
						{logged &&
							<>
								<li> <Link to="/userarea">Área de usuário</Link></li>
								<li> <Link to="/adminarea">Área de Administração</Link></li>
								<li> <button onClick={handleLogout}>Sair</button></li>
							</>

						}{!logged &&
							<>
								<li> <Link to="/signin">Login</Link></li>
								<li> <Link to="/signup">Cadastrar</Link></li>
							</>
						}
					</ul>
				</nav>
			</div>
		</div>

	);
}

export default Page;