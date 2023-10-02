import axios from "axios";
import { useState } from "react";

import RegisterPokemon from "./RegisterPokemon";
import { useCookies } from 'react-cookie';


const Login = () => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [formError, setFormError] = useState(false);

	const [cookies, setCookie, removeCookie] = useCookies(['logged']);

	const handleLogin = async (e) => {
		e.preventDefault();
		setFormError(false);
		
		const reqParams = {password, username};

		await axios.post('http://localhost:3000/login', reqParams, {headers: {
				accept: 'application/json',
			}}).
		then(() => {
			setCookie('logged', true);
		}).
		catch(response => setFormError(true));
	}

	const handleLogout = async () => {
		removeCookie('logged');
	}


return(
	<>
		{cookies.logged ? 
			<>
				<RegisterPokemon/> 
				<p onClick={() => handleLogout()} className="logout-button">Deslogar</p>
			</>
			:
		<div className='login-form-wrap'>
			<h2>Login</h2>
			
			<form className='login-form' >
				<input type ='email' 
						name='email' 
						placeholder='Email' required
						onChange={(e) => setUsername(e.target.value)}></input>
				<input type ='password' 
						name='password' 
						placeholder='Password' required
						onChange={(e) => setPassword(e.target.value)}></input>
				<button type='submit' 
						className='btn-login' 
						onClick={(e) => handleLogin(e)}>Login</button>
			</form>
			{formError && <p class="form-error">Login falhou, verifique seus dados.</p>}
		</div>
		}
	</>
  );
}

export default Login;